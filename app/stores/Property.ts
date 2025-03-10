import { defineStore } from "pinia";
import type {
  Activity,
  Amenity,
  Company,
  Contact,
  DevelopmentPhase,
  Feature,
  Note,
  Options,
  Property,
  PropertyRelationship,
  Role,
  Utility,
} from "./Models";
import type { Toast } from "./Toast";
import { groupBy, keys, mapValues, max, mean, meanBy, sortBy, sumBy, values } from "lodash-es";

function createNestedObject(keys: string, value: any): any {
  // Split the keys by dot to get each level
  const keysArray = keys.split(".");

  // Initialize the result as an empty object
  const result: any = {};

  // Reference to the current level in the result object
  let current = result;

  // Iterate through the keys and build the nested structure
  for (let i = 0; i < keysArray.length; i++) {
    const key: any = keysArray[i];

    // If we're at the last key, set the value
    if (i === keysArray.length - 1) {
      current[key] = value;
    } else {
      // Otherwise, create an empty object at this level if it doesn't exist
      if (!current[key]) {
        current[key] = {};
      }
      // Move the reference to the next level in the object
      current = current[key];
    }
  }

  return result;
}

function deepMerge(target: any, source: any): any {
  Object.keys(source).forEach((key) => {
    if (
      typeof source[key] === "object" &&
      source[key] !== null &&
      !Array.isArray(source[key])
    ) {
      target[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      target[key] = source[key];
    }
  });
  return target;
}

function sortActivities(activities: Activity[]): Activity[] {
  return activities.sort((a, b) => {
    // Determine the effective date for sorting
    const effectiveDateA = a.dueDate
      ? new Date(a.dueDate).getTime()
      : a.startDate
        ? new Date(a.startDate).getTime()
        : 0;
    const effectiveDateB = b.dueDate
      ? new Date(b.dueDate).getTime()
      : b.startDate
        ? new Date(b.startDate).getTime()
        : 0;

    // Sort by effective date
    return effectiveDateA - effectiveDateB;
  });
}

export const useMyPropertyStore = defineStore({
  id: "myPropertyStore",
  state: () => ({
    property: {} as Property,
    properties: [] as any[],
    totalCount: 0,
    propertySchema: {
      name: { value: "", error: "", required: true },
      propertyType: { value: "", error: "", required: true },
      secondaryPropertyType: { value: "", error: "", required: false },
      mixedUse: { value: "", error: "", required: false },
      buildingClass: { value: "", error: "", required: false },
      yearBuilt: {
        value: "", error: "", required: true,
        // validators: [{ function: isYearInRange, errorMsg: "Enter valid year." }] 
      },
      numberOfUnits: {
        value: "", error: "", required: true,
        // validators: [{ function: isValidUnits, errorMsg: "Enter valid No. of units." }] 
      }
    } as any,
    updatedProperty: {} as Property,
    cachedProperty: '',
    updatedDevelopmentPhases: [] as DevelopmentPhase[],
    updatedRentSurveys: [] as any[],
    isLoading: false,
    isLoadingProperty: false,
    options: {} as Options,
    phaseSelected: 0,
    surveySelected: 0,
    activities: [] as Activity[],
    infoMessage: "",
    hasErrors: false,
    red: ["#0093AD", "#80C9D6", "#E4002B", "#686B6B", "#1D1740"],
    darkred: ["#0093AD", "#80C9D6", "#8E1000", "#686B6B", "#1D1740"],
    amenityFeature: [] as any[],
    accountName: null as any,
    sasToken: null as any,

  }),
  getters: {
    propertyTypes: (model: any) => {
      const unique_types = [...new Set(model.options.propertyType.map((item: any) => item.Type))];
      return unique_types.map(ut => ({ label: ut, value: ut }))
    }
  },
  actions: {
    async getProperties(options?: { search?: any, sortObj?: any, page?: number, limit?: number, count?: boolean, returnResult?: boolean }) {

      let search = null;
      let sortObj = null;
      let count = false;
      let page = 1;
      let limit = 20;
      let returnResult = false;

      if (options) {
        search = options.search;
        sortObj = options.sortObj;
        page = options.page || 1;
        limit = options.limit || 20;
        count = options.count || false;
        returnResult = options.returnResult || false;
      }


      this.isLoading = true;
      this.infoMessage = "";
      const runtimeConfig = useRuntimeConfig();
      this.properties = [] as Property[];
      // this.totalCount = 0;
      const offset = limit * (page - 1);


      let url = `${runtimeConfig.public.apiUrl}properties?limit=${limit}&offset=${offset}`;

      if (search) {
        url += `&searchKeyword=${search}`;
      }

      if (count) {
        let countQuery = `${runtimeConfig.public.apiUrl}properties/count`;
        if (search) {
          countQuery += `?searchKeyword=${search}`;
        }

        this.getCount(countQuery);
      }

      if (sortObj) {
        url += `&sortKey=${sortObj.sortKey}&sortOrder=${sortObj.sortOrder}`;
      }

      const toastStore = useToastStore();
      try {
        const data: any = await $fetch(url);

        //return result in case of auto complete control
        if (returnResult) {
          return data;
        }

        this.properties = data;
        if (this.properties.length === 0) {
          this.infoMessage = "No records found";
        }
        // this.totalCount = data.length;
      } catch (e: any) {
        toastStore.addToast({
          type: "error",
          message: e.cause || e.name,
        } as Toast);
        this.properties = [] as Property[];
        if (returnResult) {
          return [];
        }
        this.totalCount = 0;
        this.infoMessage = "Some error occured. Please try again."
      }

      this.isLoading = false;
    },
    async getCount(url: string) {
      this.totalCount = 0;
      const data: any = await $fetch(url);
      this.totalCount = data;
    },
    async getProperty(id: any) {
      const runtimeConfig = useRuntimeConfig();
      const config = useConfig()
      config.config.value.editMode = false;
      this.isLoadingProperty = true;
      this.property = {} as Property;
      this.phaseSelected = 0;
      const toastStore = useToastStore();
      this.resetValidator();
      this.amenityFeature = [] as any[];
      try {
        const data: any = await $fetch(
          `${runtimeConfig.public.apiUrl}properties/${id}`
        );
        this.property = data;
        this.property.name = data.name;
        this.fieldValidators("propertyType", this.property.propertyType);

        this.property.propertyRelationship = [];

        this.getRelationships(runtimeConfig.public.apiUrl, this.property.id);

        if (!this.property.notes) {
          this.property.notes = [] as Note[];
        }
        if (!this.property.developmentPhases) {
          this.property.developmentPhases = [] as DevelopmentPhase[];
        }

        if (!this.property.amenities) {
          this.property.amenities = [] as Amenity[];
        }
        if (!this.property.features) {
          this.property.features = [] as Feature[];
        }

        this.property.createNewImage = false;
        if (!this.property.images) {
          this.property.createNewImage = true;
          this.property.images = [] as any[];
        }

        if (!this.property.rentSurveys) {
          this.property.rentSurveys = [] as any[];
        }

        if (!this.property.transactions) {
          this.property.transactions = [] as any[];
        }

        if (!this.property.rentComparables) {
          this.property.rentComparables = [] as any[];
        }

        if (!this.property.transactionComparables) {
          this.property.transactionComparables = [] as any[];
        }

        this.cachedProperty = JSON.stringify(this.property);

        this.isLoadingProperty = false;
      }
      catch (e) {
        toastStore.addToast({
          type: "error",
          message: "Some error occured. Please try again",
        } as Toast);
      }
    },
    buildImageUrl(imgUrl: string) {
      //const accountName = "cwpropplusdevsa";
      //const sasToken = "sp=racwdl&st=2025-01-21T17:01:56Z&se=2025-12-31T01:01:56Z&spr=https&sv=2022-11-02&sr=c&sig=l%2FLbEkte7AEd%2F8w3SH7w4Abu%2FBvIEeFA3B%2FmbZ2aCro%3D";
      let imageUrl = `https://${this.accountName}.blob.core.windows.net/property-images/`;

      return imageUrl + imgUrl + "?" + this.sasToken
    },
    async getStorageAccountDetails() {
      let { accountURL, sasToken, accountName } = await $fetch("/api/photo?permission=WRITE");
      this.accountName = accountName;
      this.sasToken = sasToken;
    },
    async getComparableProperties(propertyId: any = "", theme = "red", type = "rent") {
      const runtimeConfig = useRuntimeConfig();
      let subjectProperty: any = null;
      let comparableProperties: any = [] as any[];
      try {

        await this.getStorageAccountDetails();

        subjectProperty = await $fetch(`${runtimeConfig.public.apiUrl}properties/` + propertyId)


        const defaultImage = subjectProperty.images?.find((i: any) => i.defaultImage);
        if (defaultImage) {
          subjectProperty.defaultImage = this.buildImageUrl(defaultImage.url);
        }

        let propertyIds: any = [];
        let propertyIdRentTranId: any = [];
        if (type === 'rent') {
          subjectProperty.rentComparables = subjectProperty.rentComparables.filter((rc: any) => rc.rank !== null)
          propertyIds = subjectProperty.rentComparables && subjectProperty.rentComparables.map((rc: any) => rc.propertyId);
          propertyIdRentTranId = subjectProperty.rentComparables && subjectProperty.rentComparables.map((rc: any) => rc.propertyId + "|" + rc.surveyId);
        }
        else {
          subjectProperty.transactionComparables = subjectProperty.transactionComparables.filter((rc: any) => rc.rank !== null)
          propertyIds = subjectProperty.transactionComparables && subjectProperty.transactionComparables.map((rc: any) => rc.propertyId);
          propertyIdRentTranId = subjectProperty.transactionComparables && subjectProperty.transactionComparables.map((rc: any) => rc.propertyId + "|" + rc.transactionId);
        }

        const relationshipRequests: any = []

        relationshipRequests.push($fetch(`${runtimeConfig.public.apiUrl}properties/relations?propertyId=${propertyId}`))

        propertyIds.forEach((pid: any) => {
          relationshipRequests.push(
            $fetch(`${runtimeConfig.public.apiUrl}properties/relations?propertyId=${pid}`)
          )
        })

        let relationships = await Promise.all(relationshipRequests);

        relationships = [].concat(...relationships);

        const subjectPropertyRelationship = relationships.find((r: any) => r.propertyId === propertyId && r.role === 'Manager');

        if (subjectPropertyRelationship) {
          subjectProperty.manager = subjectPropertyRelationship.company
        }

        if (propertyIdRentTranId) {
          comparableProperties = await $fetch(`${runtimeConfig.public.apiUrl}properties/comparable-properties?type=${type}`, {
            method: 'POST',
            body: propertyIdRentTranId
          });

          let orderNumber = 1;

          if (comparableProperties && comparableProperties.length > 0) {
            comparableProperties = comparableProperties.map((cp: any) => {

              if (type === "rent") {
                cp.rentSurveys = cp.rs ? [cp.rs] : []
              }
              else {
                cp.transactions = cp.t ? [cp.t] : []
              }

              if (cp.stdCounty && cp.stdCounty.trim()) {
                if (cp.stdStateCode === 'LA') {
                  cp.stdCounty = cp.stdCounty.includes("Parish") ? cp.stdCounty : `${cp.stdCounty.trim()} Parish`;
                }
                else {
                  cp.stdCounty = cp.stdCounty.includes("County") ? cp.stdCounty : `${cp.stdCounty.trim()} County`;
                }
              }

              cp.isSubjectProperty = false
              cp.orderNumber = null;
              if (cp.id === subjectProperty.id) {
                cp.isSubjectProperty = true
              }
              else {
                cp.orderNumber = orderNumber++;
              }

              const defaultImage = cp.images?.find((i: any) => i.defaultImage);
              if (defaultImage) {
                cp.defaultImage = this.buildImageUrl(defaultImage.url);
              }

              let comparableSurvey = null;


              if (type === 'rent') {
                comparableSurvey = subjectProperty.rentComparables.find((rc: any) => rc.propertyId === cp.id);
              }
              else {
                comparableSurvey = subjectProperty.transactionComparables.find((rc: any) => rc.propertyId === cp.id);
              }

              if (type === 'rent') {
                cp.rentSurveys = cp.rentSurveys.filter((rs: any) => rs.id == comparableSurvey.surveyId)
              }
              else {
                cp.rentSurveys = cp.rentSurveys.length > 0 ? [sortBy(cp.rentSurveys, (rs) => new Date(rs.date)).pop()] : []
              }

              if (cp.rentSurveys && cp.rentSurveys.length > 0) {
                const totalUnits = sumBy(cp.rentSurveys[0]?.unitMix, (item: any) => 1);
                const bedGroups = groupBy(cp.rentSurveys[0]?.unitMix, item => item.Beds.value);

                const bedCounts = mapValues(bedGroups, items => sumBy(items, item => item.Units.value));
                const bedPercentages = mapValues(bedCounts, count => +((count / totalUnits) * 100).toFixed(0));
                const chartLabels = keys(bedPercentages).map(k => k + ' BR');
                const chartData = values(bedPercentages);

                cp.chartData = {
                  labels: chartLabels,
                  datasets: [
                    {
                      backgroundColor: theme === 'Red' ? this.red : this.darkred,
                      data: chartData
                    }
                  ]
                }
              }
              cp.rank = comparableSurvey.rank;
              const propertyRelation = relationships.find((r: any) => r.propertyId === cp.id && r.role === 'Manager');
              if (propertyRelation) {
                cp.manager = propertyRelation.company
              }

              return cp;
            });
          }

          comparableProperties = sortBy(comparableProperties, (a: any) => a.rank)

          return [subjectProperty, ...comparableProperties];
        }



      }
      catch (e) {
        console.log(e);
      }
    },
    async getComparablePropertiesSummary(propertyId: any = "", type = "rent") {
      const runtimeConfig = useRuntimeConfig();
      let subjectProperty: any = null;
      let comparableProperties: any = [] as any[];
      try {
        subjectProperty = await $fetch(`${runtimeConfig.public.apiUrl}properties/` + propertyId)

        let propertyIds: any = [];
        if (type === 'rent') {
          subjectProperty.rentComparables = subjectProperty.rentComparables.filter((rc: any) => rc.rank !== null)
          propertyIds = subjectProperty.rentComparables && subjectProperty.rentComparables.map((rc: any) => (rc.propertyId + "|" + rc.surveyId));
        }
        else {
          subjectProperty.transactionComparables = subjectProperty.transactionComparables.filter((rc: any) => rc.rank !== null)

          propertyIds = subjectProperty.transactionComparables && subjectProperty.transactionComparables.map((rc: any) => (rc.propertyId + "|" + rc.transactionId));
        }

        if (propertyIds) {
          comparableProperties = await $fetch(`${runtimeConfig.public.apiUrl}properties/comparable-properties?type=${type}`, {
            method: 'POST',
            body: propertyIds
          });

          let orderNumber = 1;

          const chartLabels: any = []
          const chartDataSF: any = []
          const chartDataRent: any = []
          if (comparableProperties && comparableProperties.length > 0) {
            comparableProperties = comparableProperties.map((cp: any) => {

              if (type === "rent") {
                cp.rentSurveys = cp.rs ? [cp.rs] : []
              }
              else {
                cp.transactions = cp.t ? [cp.t] : []
              }

              cp.isSubjectProperty = false
              cp.orderNumber = null;
              if (cp.id === subjectProperty.id) {
                cp.isSubjectProperty = true
              }
              else {
                cp.orderNumber = orderNumber++;
              }

              let comparableSurvey = null;


              if (type === 'rent') {
                comparableSurvey = subjectProperty.rentComparables.find((rc: any) => rc.propertyId === cp.id);
              }
              else {
                comparableSurvey = subjectProperty.transactionComparables.find((rc: any) => rc.propertyId === cp.id);
              }

              if (type === 'rent') {
                cp.rentSurveys = cp.rentSurveys.filter((rs: any) => rs.id == comparableSurvey.surveyId)
                if (cp.rentSurveys && cp.rentSurveys.length > 0) {
                  cp.avgSF = avgSF(cp) //meanBy(cp.rentSurveys[0]?.unitMix, (u: any) => u.SF.value);
                  cp.mktRent = avgRent(cp);// meanBy(cp.rentSurveys[0]?.unitMix, (u: any) => u.Rent.value);
                  cp.mktRentSF = avgRentPerSF(cp);// meanBy(cp.rentSurveys[0]?.unitMix, (u: any) => (u.Rent.value / u.SF.value));
                  cp.effRent = avgEffRent(cp);// meanBy(cp.rentSurveys[0]?.unitMix, (u: any) => u.EffectiveRent.value);
                  cp.effRentSF = avgEffRentPerSF(cp); // meanBy(cp.rentSurveys[0]?.unitMix, (u: any) => (u.EffectiveRent.value / u.SF.value));
                  cp.occupancy = +cp.rentSurveys[0]?.occupancy;
                }
              }
              else {
                //console.log(comparableSurvey);
                // cp.rentSurveys = [sortBy(cp.rentSurveys, (rs) => new Date(rs.date)).pop()]
                // cp.avgSF = meanBy(cp.rentSurveys[0]?.unitMix, (u: any) => u.SF.value);
                // cp.mktRent = meanBy(cp.rentSurveys[0]?.unitMix, (u: any) => u.Rent.value);
                // cp.mktRentSF = meanBy(cp.rentSurveys[0]?.unitMix, (u: any) => (u.Rent.value / u.SF.value));
                // cp.effRent = meanBy(cp.rentSurveys[0]?.unitMix, (u: any) => u.EffectiveRent.value);
                // cp.effRentSF = meanBy(cp.rentSurveys[0]?.unitMix, (u: any) => (u.EffectiveRent.value / u.SF.value));
                // cp.occupancy = +cp.rentSurveys[0]?.occupancy;

              }

              cp.rank = comparableSurvey.rank;
              return cp;
            });
          }

          comparableProperties = sortBy(comparableProperties, (a: any) => a.rank)

          if (type === 'rent') {
            comparableProperties.forEach((cp: any) => {
              chartLabels.push(cp.name);
              chartDataSF.push(cp.avgSF?.replace(/[^0-9.-]+/g, '') || 0);
              chartDataRent.push(cp.effRent?.replace(/[^0-9.-]+/g, '') || 0);
            });
          }

          if (type === 'rent') {
            return {
              comparableProperties: [subjectProperty, ...comparableProperties], chartsArr: [{
                labels: chartLabels,
                datasets: [{
                  label: 'Average Unit Size (SF)',
                  data: chartDataSF,
                  backgroundColor: [
                    this.red[0],
                    ...Array(chartLabels.length - 1).fill("#1D1740")
                  ],
                  barPercentage: 0.5
                }]
              }, {
                labels: chartLabels,
                datasets: [{
                  label: 'AVERAGE EFFECTIVE RENT',
                  data: chartDataRent,
                  backgroundColor: [
                    this.red[0],
                    ...Array(chartLabels.length - 1).fill("#1D1740")
                  ],
                  barPercentage: 0.5
                }]
              }]
            };
          }
          else {
            return {
              comparableProperties: [subjectProperty, ...comparableProperties], chartsArr: []
            };
          }
        }



      }
      catch (e) {
        console.log(e);
      }
    },
    async getOptions() {
      if (import.meta.client) {
        this.isLoading = true;
        const data: any = await $fetch("/data/options.json");
        this.isLoading = false;
        this.options = data;
      }
    },
    async getRelationships(url: string, propertyId: string) {
      const relationships: any = await $fetch(`${url}properties/relations?propertyId=${propertyId}`);
      this.property.propertyRelationship = relationships;
    },
    async getActivities(propertyId: string) {
      const activities: any = [];
      const sortedActivities = sortActivities(activities);
      this.activities = sortedActivities;
    },
    async getRentSurveys() {
      const runtimeConfig = useRuntimeConfig()
      const url = runtimeConfig.public.apiUrl;
      const rentSurveys: any = await $fetch(`${url}comparables/rent-surveys`);
      return rentSurveys;
    },
    async getTransactions() {
      const runtimeConfig = useRuntimeConfig()
      const url = runtimeConfig.public.apiUrl;
      const transactions: any = await $fetch(`${url}comparables/transactions`);
      return transactions;
    },
    captureChanges(key: any, value: any) {
      const new_obj = createNestedObject(key, value);
      this.updatedProperty = { ...this.updatedProperty, ...new_obj };
      this.property = { ...this.property, ...new_obj }
      if (this.hasErrors) {
        this.validateForm()
      }

      this.fieldValidators(key, value);

    },
    resetValidator() {
      this.propertySchema['secondaryPropertyType'].required = false;
    },
    fieldValidators(key: any, value: any) {
      if (key === 'propertyType') {
        if (value === 'Land') {
          this.propertySchema['secondaryPropertyType'].required = true;
        }
        else if (this.property.mixedUse != "Yes") {
          this.propertySchema['secondaryPropertyType'].required = false;
        }

        if (value === 'Office' || value === 'Industrial' || value === 'Alternatives') {
          this.propertySchema['buildingClass'].required = true;
        }
        else {
          this.propertySchema['buildingClass'].required = false;
        }
      }
      else if (key === 'mixedUse') {
        if (value === "Yes") {
          this.propertySchema['secondaryPropertyType'].required = true;
        }
        else if (this.property.propertyType != 'Land') {
          this.propertySchema['secondaryPropertyType'].required = false;
        }
      }

    },
    validateForm() {
      let isValid = true;

      for (const k in this.propertySchema) {
        let key: keyof Property = k as keyof Property;

        this.propertySchema[key].error = "";
        this.fieldValidators(key, this.property[key]);
        const element: any = this.propertySchema[key];
        if (element.required === true && !this.property[key]) {
          this.propertySchema[key].error = "Field cannot be empty." + '\n';
          isValid = false
        }

        if (this.propertySchema[key].validators?.length > 0) {
          this.propertySchema[key].validators?.forEach((obj: any) => {
            const validated_result = obj.function(this.property[key], this.propertySchema);
            if (!validated_result) {
              this.propertySchema[key].error += obj.errorMsg + '\n';
              isValid = false
            }
          });
        }
      }

      return isValid;
    },
    async saveChanges() {
      const runtimeConfig = useRuntimeConfig();
      const toastStore = useToastStore()
      const config = useConfig()

      this.property = deepMerge({ ...this.property }, this.updatedProperty);

      if (this.validateForm()) {

        config.setConfig({ editMode: false })

        this.hasErrors = false;

        if (this.updatedDevelopmentPhases.length > 0) {
          this.property.developmentPhases = [...this.updatedDevelopmentPhases];
        }
        // this.updatedDevelopmentPhases = [];

        if (this.updatedRentSurveys.length > 0) {
          this.property.rentSurveys = [...this.updatedRentSurveys];
        }
        // this.updatedRentSurveys = [];

        this.updatedProperty = {} as Property;

        try {

          this.property.buildingSizeSqFt = Math.round(this.property.buildingSizeSqFt);
          const auth = useAuthStore()

          this.property.lastUpdatedBy = auth.getUserName();
          this.property.lastUpdatedByEmail = auth.getUserEmail();
          this.property.lastUpdatedDate = new Date().toISOString();


          var result: any = await this.createProperty(this.property);

          if (this.amenityFeature.length > 0) {
            //update amenity feature
            await $fetch(`${runtimeConfig.public.apiUrl}amenity-feature`, {
              method: "POST",
              body: this.amenityFeature,
            });
            this.amenityFeature = [];
          }

          // var result = { status: "success", message: "" };
          if (result.status === "success") {
            this.cachedProperty = JSON.stringify(this.property);
            toastStore.addToast({
              type: "success",
              id: 1,
              message: result.message,
            });
          }
          else {
            toastStore.addToast({
              type: "error",
              id: 1,
              message: result.message,
            });
          }
        }
        catch (e: any) {

          toastStore.addToast({
            type: "error",
            id: 1,
            message: e.data ? e.data.title : e.message,
          });
        }
      }
      else {
        toastStore.addToast({
          type: "error",
          id: 1,
          message: 'Required fields are missing.',
        });
        this.hasErrors = true;
      }
    },
    cancelChanges() {
      this.updatedProperty = {} as Property;
      this.hasErrors = false;
      if (this.cachedProperty) {
        try {
          this.property = JSON.parse(this.cachedProperty);

        }
        catch (e) { }
      }
    },
    async updateRelationship(relationships: PropertyRelationship[]) {
      const toastStore = useToastStore();
      const globalState = useMyGlobalStateStore()
      const runtimeConfig = useRuntimeConfig();
      const relations: any = [];

      relationships.forEach((r: any) => {

        const rel: any = {
          "id": null,
          "contactId": "",
          "propertyId": this.property.id,
          "role": r.Role.Id,
          "source": r.Source,
          "name": "",
          "companyId": r.Company.Id,
          "company": r.Company.Name
        }


        if (r?.Contact) {
          rel.contactId = r.Contact.Id;
          rel.name = r.Contact.Name;
        }

        relations.push(rel);

      });

      try {
        const result: any = await $fetch(`${runtimeConfig.public.apiUrl}properties/relations`, { method: "POST", body: relations });
        if (result) {
          const updatedRelationships = [
            ...this.property.propertyRelationship,
            ...result,
          ];
          this.property.propertyRelationship = updatedRelationships;
          toastStore.addToast({
            type: "success",
            message: "Relationships updated successfully"
          } as Toast);
        }
      }
      catch (e: any) {
        toastStore.addToast({
          type: "error",
          message: "Some error occured. Please try again",
        } as Toast);
      }
      globalState.serverAction = false;
      globalState.closeModal();

    },
    async deleteRelationship(record: any, index: any) {
      const runtimeConfig = useRuntimeConfig();
      const toastStore = useToastStore();
      console.log(record);

      const result = await $fetch(`${runtimeConfig.public.apiUrl}properties/delete-relation?contactDocumentId=${record.contactRelId}&companyDocumentId=${record.companyRelId}`,);

      if (result === "success") {
        toastStore.addToast({
          type: "success",
          message: "Relationships deleted successfully"
        } as Toast);
        this.property.propertyRelationship = this.property.propertyRelationship.filter((pr: any) => pr.companyRelId != record.companyRelId)
        //this.property.propertyRelationship.splice(index, 1);
      }
      else {
        toastStore.addToast({
          type: "error",
          message: "Some error occured. Please try again",
        } as Toast);
      }
    },
    async addNote(note: any) {
      const auth = useAuthStore();
      const user = auth.loggedInUserData;
      if (note.edit) {
        const n: any = this.property.notes.find((n) => n.id === note.id);
        n.subject = note.subject;
        n.message = note.message;
      } else {
        note.createdBy = auth.getUserName();
        note.createdByEmail = auth.getUserEmail();
        note.createdOn = new Date().toISOString();
        note.id = this.property.notes.length + 1;
        this.property.notes = [note, ...this.property.notes];
      }
      await this.createProperty(this.property);
    },
    async deleteNote(id?: number) {
      this.property.notes = this.property.notes.filter((n) => n.id !== id);
      await this.createProperty(this.property);
    },
    selectDevelopmentPhase(index: number) {
      this.phaseSelected = index;
    },
    updatePhaseDetail(value: any, key: string) {
      if (key === 'surveyDate' || key === 'dtLastCertificate' || key === 'dtFirstCertificate') {
        value = value ? new Date(value).toISOString() : null;
      }

      let initialValue = {};

      if (this.property.developmentPhases && this.property.developmentPhases[this.phaseSelected]) {
        initialValue = { ...this.property.developmentPhases[this.phaseSelected] }
      }

      this.updatedDevelopmentPhases[this.phaseSelected] = {
        ...initialValue,
        ...this.updatedDevelopmentPhases[this.phaseSelected],
        ...{ [key]: value },
      };
    },
    async deleteDevelopmentPhase() {

      const toastStore = useToastStore()

      this.property.developmentPhases = this.property.developmentPhases.filter(
        (p) =>
          p.value !== this.property.developmentPhases[this.phaseSelected]?.value
      );
      this.phaseSelected = 0;

      const result: any = await this.createProperty(this.property);

      if (result.status === "success") {
        toastStore.addToast({
          type: "success",
          id: 1,
          message: 'Development phase deleted.',
        });
      }
      else {
        toastStore.addToast({
          type: "error",
          id: 1,
          message: result.message,
        });
      }

    },
    selectRentSurvey(index: number) {

      this.surveySelected = index;
      if (!this.property.rentSurveys[index].utilities) {
        this.property.rentSurveys[index].utilities = [];
      }

      if (!this.property.rentSurveys[index].fees) {
        this.property.rentSurveys[index].fees = [];
      }
    },
    updateRentSurvey(value: any, key: string) {

      let initialValue = {};

      if (this.property.rentSurveys && this.property.rentSurveys[this.surveySelected]) {
        initialValue = { ...this.property.rentSurveys[this.surveySelected] }
      }

      this.updatedRentSurveys[this.surveySelected] = {
        ...initialValue,
        ...this.updatedRentSurveys[this.surveySelected],
        ...{ [key]: value },
      };
    },
    async deleteRentSurvey() {
      const toastStore = useToastStore()

      this.property.rentSurveys = this.property.rentSurveys.filter(
        (p) =>
          p.value !== this.property.rentSurveys[this.surveySelected]?.value
      );

      this.surveySelected = 0;

      const result: any = await this.createProperty(this.property);

      if (result.status === "success") {
        toastStore.addToast({
          type: "success",
          id: 1,
          message: 'Rent survey deleted.',
        });
      }
      else {
        toastStore.addToast({
          type: "error",
          id: 1,
          message: result.message,
        });
      }
    },
    async createTransaction(transaction: any) {
      const toastStore = useToastStore()
      this.property.transactions.push(transaction);
      var result: any = await this.createProperty(this.property);

      if (result.status === "success") {
        this.cachedProperty = JSON.stringify(this.property);
        toastStore.addToast({
          type: "success",
          id: 1,
          message: result.message,
        });
      }
      else {
        toastStore.addToast({
          type: "error",
          id: 1,
          message: result.message,
        });
      }

    },
    async deleteTransaction(id: any) {
      const toastStore = useToastStore()

      this.property.transactions = this.property.transactions.filter(
        (t: any) =>
          t.id !== id
      );

      const result: any = await this.createProperty(this.property);

      if (result.status === "success") {
        toastStore.addToast({
          type: "success",
          id: 1,
          message: 'Transaction deleted.',
        });
      }
      else {
        toastStore.addToast({
          type: "error",
          id: 1,
          message: result.message,
        });
      }
    },
    async createProperty(property: any) {
      const runtimeConfig = useRuntimeConfig();
      const globalState = useMyGlobalStateStore();
      globalState.serverAction = true;

      const defualtValues: any = {
        "id": null,
        "source": "Property+",
        "name": "",
        "address1": "",
        "address2": "",
        "city": "",
        "state": "",
        "postalCode": "",
        "country": "",
        "county": "",
        "latitude": null,
        "longitude": null,
        "stdAddress1": "",
        "stdAddress2": "",
        "stdCity": "",
        "stdState": "",
        "stdStateCode": "",
        "stdCounty": "",
        "stdPostalCode": "",
        "stdCountry": "",
        "stdCountryCode": "",
        "stdLatitude": null,
        "stdLongitude": null,
        "googleLocationType": "",
        "googleAddressType": "",
        "profiseeMasterRecordId": "",
        "stdFullAddress": "",
        "propertyType": "",
        "propertySubType": "",
        "propertyStyle": "",
        "buildingClass": "",
        "buildingStatus": "",
        "buildingSizeSqFt": 0,
        "yearBuilt": 0,
        "completionDate": null,
        "rentType": "",
        "numberOfUnits": 0,
        "beds": 0,
        "sizeAcres": 0,
        "market": "",
        "lastSalePrice": 0,
        "createdBy": "",
        "lastUpdatedBy": "",
        "lastUpdatedDate": null,
        "createdDate": null,
      }

      let payload: any = { ...defualtValues };

      if (property.id) {
        payload = { ...payload, ...property } as Property;
      }
      else {
        for (let name in property) {
          const value = property[name]?.value;
          if (name === 'propertyName') {
            payload.name = value;
          }
          else if (name === 'type') {
            payload.propertyType = value;
          }
          else if (name === 'subType') {
            payload.propertySubType = value;
          }
          else if (name === 'secondaryType') {
            payload.secondaryPropertyType = value;
          }
          else if (name === 'class') {
            payload.buildingClass = value;
          }
          else if (name === 'country') {
            payload.country = value;
            payload.stdCountry = value;
          }
          else if (name === 'county') {
            payload.county = value;
            payload.stdCounty = value;
          }
          else if (name === 'street') {
            payload.address1 = value;
            payload.stdAddress1 = value;
          }
          else if (name === 'city') {
            payload.city = value;
            payload.stdCity = value;
          }
          else if (name === 'state') {
            payload.state = value;
            payload.stdState = value;
          }
          else if (name === 'zip') {
            payload.postalCode = value;
            payload.stdPostalCode = value;
          }
          else if (name === 'yearBuilt') {
            payload.yearBuilt = +value;
          }
          else if (name === 'noOfUnits') {
            payload.numberOfUnits = +value;
          }
          else if (name === 'noOfBeds') {
            payload.beds = value;
          }
          else if (name === 'sqFt') {
            payload.buildingSizeSqFt = +value;
          }
          else if (name === 'acres') {
            payload.sizeAcres = value;
          }
          else if (name === 'latitude') {
            payload.latitude = value;
            payload.stdLatitude = value;
          }
          else if (name === 'longitude') {
            payload.longitude = value;
            payload.stdLongitude = value;
          }
          else if (name === 'fullAddress') {
            payload.stdFullAddress = value;
          }
          else if (name === 'stateCode') {
            payload.stdStateCode = value;
          }
          else if (name === 'countryCode') {
            payload.stdCountryCode = value;
          }
        }
        const auth = useAuthStore()

        payload.createdBy = auth.getUserName();
        payload.createdByEmail = auth.getUserEmail();
        payload.createdDate = new Date().toISOString();
        payload.lastUpdatedBy = auth.getUserName();
        payload.lastUpdatedByEmail = auth.getUserEmail();
        payload.lastUpdatedDate = new Date().toISOString();
      }

      // delete payload.rentSurveys;
      delete payload.propertyRelationship;

      return await $fetch(`${runtimeConfig.public.apiUrl}properties`, {
        method: "POST",
        body: payload,
      }).finally(() => {
        globalState.serverAction = false;
      });

    },
    async deleteProperty(propertyId: string = "", propertyName: string = "", address: string = "", stateCode: string = "") {

      if (propertyId === "") {
        const { id, name, stdAddress1, stdStateCode } = this.property;
        propertyId = id;
        propertyName = name;
        address = stdAddress1;
        stateCode = stdStateCode
      }

      const runtimeConfig = useRuntimeConfig();
      const globalState = useMyGlobalStateStore();
      globalState.serverAction = true;

      let folderName = propertyName.trim();
      folderName = (!folderName || folderName.length < 2) ? address : folderName
      folderName = folderName.replace(/[^a-zA-Z0-9]/g, '-')

      console.log("Not implemented")

      // return await $fetch(`${runtimeConfig.public.apiUrl}properties/delete?propertyId=${propertyId}&imageFolder=${folderName}&stateCode=${stateCode}`, {
      //   method: "GET",
      // }).finally(() => {
      //   globalState.serverAction = false;
      // });
    }
  },
});
