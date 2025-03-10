<template>
  <UiItemModal :is-visible="globalState.modalName === 'Create_Property'" :size="'small'" @close="closeModal">
    <template #header>
      Create Property
    </template>
    <label class="required-fields">required fields</label>
    <UiItemExpandableSection :label="'Main Property Information'">
      <div class="slds-grid slds-wrap">
        <div class="slds-col slds-size_12-of-12 slds-p-around_xx-small">
          <UiItemInputBox label="Property Name" :edit-mode="true" :required="propertyModel.propertyName.required"
            :value="propertyModel.propertyName.value" :has-error="propertyModel.propertyName.error"
            @input-changed="updateModel($event, 'propertyName')" />
        </div>
        <div class="slds-col slds-size_12-of-12 slds-p-around_xx-small">
          <UiItemComboBox label="Property Type" :values="propertyStore.options.propertyType" :edit-mode="true"
            :value="propertyModel.type.value" @selected="updateModel($event, 'type')"
            :required="propertyModel.type.required" :has-error="propertyModel.type.error" />
        </div>


        <div class="slds-col slds-size_12-of-8 slds-p-around_xx-small">
          <UiItemComboBox label="Secondary Property Type" :values="propertyStore.options.secondaryPropertyType"
            :edit-mode="true" :value="propertyModel.secondaryType.value"
            @selected="updateModel($event, 'secondaryType')" :required="propertyModel.secondaryType.required"
            :has-error="propertyModel.secondaryType.error" />
        </div>

        <div class="slds-col slds-size_12-of-4 slds-p-around_xx-small">
          <UiItemComboBox label="Class" :values="propertyStore.options.class_options" :edit-mode="true"
            :value="propertyModel.class.value" @selected="updateModel($event, 'class')"
            :required="propertyModel.class.required" :has-error="propertyModel.class.error" />
        </div>


        <div class="slds-col slds-size_12-of-12 slds-p-around_xx-small">
          <UiItemComboBox label="Property Sub Type" :values="subTypes" :value="propertyModel.subType.value"
            :edit-mode="true" @selected="updateModel($event, 'subType')" />
        </div>
      </div>
    </UiItemExpandableSection>

    <UiItemExpandableSection :label="'Address Information'">
      <div class="slds-grid slds-wrap">
        <div class="slds-col slds-size_12-of-12 slds-p-around_xx-small">
          <UiItemGoogleAddress :has-error="propertyModel.city.error" :edit-mode="true"
            :placeholder="'Find address to autofill information below...'" @item-selected="handleAddressSelected" />
        </div>
        <div class="slds-col slds-size_12-of-12 slds-p-around_xx-small">
          <UiItemValueBox label="Country" :required="propertyModel.country.required"
            :value="propertyModel.country.value" :has-error="propertyModel.country.error" :show-edit-icon="false" />
        </div>
        <div class="slds-col slds-size_12-of-12 slds-p-around_xx-small">
          <UiItemValueBox label="Street" :required="propertyModel.street.required" :value="propertyModel.street.value"
            :has-error="propertyModel.street.error" :show-edit-icon="false" />
        </div>
        <div class="slds-col slds-size_12-of-12 slds-p-around_xx-small">
          <UiItemValueBox label="City" :edit-mode="false" :required="propertyModel.city.required"
            :value="propertyModel.city.value" :has-error="propertyModel.city.error" :show-edit-icon="false" />
        </div>
        <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
          <UiItemValueBox label="State/Province" :edit-mode="false" :required="propertyModel.state.required"
            :value="propertyModel.state.value" :has-error="propertyModel.state.error" :show-edit-icon="false" />
        </div>
        <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
          <UiItemValueBox label="Zip/Postal Code" :edit-mode="false" :required="propertyModel.zip.required"
            :value="propertyModel.zip.value" :has-error="propertyModel.zip.error" :show-edit-icon="false" />
        </div>
      </div>
    </UiItemExpandableSection>

    <UiItemExpandableSection :label="'Property Stats'">
      <div class="slds-grid slds-wrap">
        <div class="slds-col slds-size_5-of-12 slds-p-around_xx-small">
          <UiItemInputBox label="Year Built" :edit-mode="true" :required="propertyModel.yearBuilt.required"
            :value="propertyModel.yearBuilt.value" :has-error="propertyModel.yearBuilt.error"
            @input-changed="updateModel($event, 'yearBuilt')" />
        </div>
        <div class="slds-col slds-size_7-of-12 slds-p-around_xx-small"></div>
        <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
          <UiItemInputBox label="Number of Units" :edit-mode="true" :required="propertyModel.noOfUnits.required"
            :value="propertyModel.noOfUnits.value" :has-error="propertyModel.noOfUnits.error"
            @input-changed="updateModel($event, 'noOfUnits')" />
        </div>
        <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
          <UiItemInputBox label="Number of Beds" :edit-mode="true" @input-changed="updateModel($event, 'noOfBeds')" />
        </div>
        <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
          <UiItemInputBox label="Square Ft" :edit-mode="true" @input-changed="updateModel($event, 'sqFt')" />
        </div>
        <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
          <UiItemInputBox label="Acres" :edit-mode="true" @input-changed="updateModel($event, 'acres')" />
        </div>

      </div>
    </UiItemExpandableSection>

    <template #footer>
      <div style="display: flex;justify-content: flex-end;align-items: center;">
        <UiItemInlineLoader />
        <!-- <DuplicateWarn v-if="hasDuplicate.status === 'duplicate'" /> -->
        <UiItemErrorForm v-if="hasErrors" :message="'Required fields are missing'" />
        <button class="slds-button slds-button_neutral" @click="closeModal">Cancel</button>
        <button class="slds-button slds-button_brand" @click="validateAndCreate">Create</button>
      </div>
    </template>
  </UiItemModal>

</template>

<script lang="ts" setup>
const globalState = useMyGlobalStateStore()
const propertyStore = useMyPropertyStore()
const toastStore = useToastStore();
const propertyModel: any = ref({});
const subTypes = ref([])
// const secondaryTypes = ref([])

const hasDuplicate = ref({ status: "" })


const hasErrors = computed(() => {
  return Object.values(propertyModel.value).some((field: any) => field.error?.trim() !== "");
});

const errorMessages = computed(() => {
  // let messages = ``
  // for (const key in propertyModel.value) {
  //   const element = propertyModel.value[key];
  //   if (element.error.trim()) {
  //     messages += `'${key}' ${element.error}`;
  //   }
  // }
  // return messages;
});

const handleAddressSelected = (event: any) => {
  propertyModel.value.country.value = event.country;
  propertyModel.value.county.value = event.county;
  propertyModel.value.stdCounty.value = event.stdCounty;
  propertyModel.value.street.value = event.street;
  propertyModel.value.city.value = event.city;
  propertyModel.value.state.value = event.state;
  propertyModel.value.zip.value = event.postal_code;
  propertyModel.value.latitude.value = event.latitude;
  propertyModel.value.longitude.value = event.longitude;
  propertyModel.value.fullAddress.value = event.full_address;
  propertyModel.value.stateCode.value = event.stateCode;
  propertyModel.value.countryCode.value = event.countryCode;


  [{
    "field": "country",
    "value": event.country
  },
  {
    "field": "county",
    "value": event.county
  },
  {
    "field": "stdCounty",
    "value": event.stdCounty
  },
  {
    "field": "street",
    "value": event.street
  },
  {
    "field": "city",
    "value": event.city
  },
  {
    "field": "state",
    "value": event.state
  },
  {
    "field": "zip",
    "value": event.postal_code
  }]
    .forEach(elm => {
      updateModel(elm.value, elm.field);
    });
}



function setModel() {
  propertyModel.value =
  {
    propertyName: { value: "", error: "", required: true },
    type: { value: "", error: "", required: true },
    secondaryType: { value: "", error: "", required: false },
    class: { value: "", error: "", required: false },
    subType: { value: "", error: "" },
    country: { value: "", error: "", required: true },
    county: { value: "", error: "", required: false },
    stdCounty: { value: "", error: "", required: false },
    countryCode: { value: "", error: "", required: false },
    street: { value: "", error: "", required: true },
    city: { value: "", error: "", required: true },
    state: { value: "", error: "", required: true },
    stateCode: { value: "", error: "", required: false },
    fullAddress: { value: "", error: "", required: false },
    zip: { value: "", error: "", required: true },
    latitude: { value: "", error: "", required: false },
    longitude: { value: "", error: "", required: false },
    yearBuilt: { value: "", error: "", required: true, validators: [{ function: isYearInRange, errorMsg: "Enter valid year." }] },
    noOfUnits: { value: "", error: "", required: true, validators: [{ function: isValidUnits, errorMsg: "Enter valid No. of units." }] },
    noOfBeds: { value: "", error: "", required: false },
    sqFt: { value: "", error: "", required: false },
    acres: { value: "", error: "", required: false },
  };

  subTypes.value = []
}

setModel()

const closeModal = () => {
  setModel();
  globalState.closeModal();
  hasDuplicate.value = { status: "" }
}


const updateModel = ($event: any, field: string) => {
  propertyModel.value[field].value = $event;
  propertyModel.value[field].error = "";

  if (field === 'type') {
    if ($event === 'Land') {
      propertyModel.value['secondaryType'].required = true;
    }
    else {
      propertyModel.value['secondaryType'].required = false;
    }

    if ($event === 'Office' || $event === 'Industrial' || $event === 'Alternatives') {
      propertyModel.value['class'].required = true;
    }
    else {
      propertyModel.value['class'].required = false;
    }
    filterSubtype($event)
  }

  formValidator(propertyModel, field)
}

const filterSubtype = (value: any) => {
  const subTypeValues = propertyStore.options.propertySubType;
  let filtered_subTypes: any = subTypeValues.filter((pt: any) => pt.parent === value);
  subTypes.value = filtered_subTypes;
}

const validateAndCreate = async () => {
  const isValid = formValidator(propertyModel, null)

  if (isValid) {
    const result: any = await propertyStore.createProperty(propertyModel.value).catch(e => e);
    if (result.status === "duplicate") {
      hasDuplicate.value = result;
    }
    else {
      setModel();
      globalState.closeModal();
      if (result.status === "success") {
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

      window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
    }
  }
}

</script>

<style scoped></style>