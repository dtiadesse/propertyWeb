import { defineStore } from "pinia";
import { orderBy, slice } from 'lodash-es';

export const useMyCompanyStore = defineStore({
  id: "myCompanyStore",
  state: () => ({
    companies: [] as any[],
    allCompanies: [] as any[],
    company: {} as any,
    totalCount: 0,
    isLoading: false
  }),

  actions: {
    async getCompanies(options?: { search?: any, sortObj?: any, page?: number, limit?: number, count?: boolean, returnResult?: boolean, clientMode?: boolean }) {

      let search = null;
      let sortObj = null;
      let count = false;
      let page = 1;
      let limit = 20;
      let returnResult = false;
      let clientMode: any = true;

      if (options) {
        search = options.search;
        sortObj = options.sortObj;
        page = options.page || 1;
        limit = options.limit || 20;
        count = options.count || false;
        returnResult = options.returnResult || false;
        clientMode = options.clientMode === false ? clientMode = false : clientMode = true;
      }


      this.isLoading = true;
      const runtimeConfig = useRuntimeConfig();
      this.companies = [] as any[];
      // this.totalCount = 0;
      const offset = limit * (page - 1);

      if (clientMode) {
        return await this.getCompanyClientMode(options);
      }

      let url = `${runtimeConfig.public.apiUrl}companies?limit=${limit}&offset=${offset}`;

      if (search) {
        url += `&searchKeyword=${search}`;
      }

      if (count) {
        let countQuery = `${runtimeConfig.public.apiUrl}companies/count`;
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
        this.companies = data;
      } catch (e: any) {
        if (returnResult) {
          return [];
        }
        toastStore.addToast({
          type: "error",
          message: e.cause,
        } as Toast);

        this.companies = [] as Property[];
        this.totalCount = 0;
      }

      this.isLoading = false;

    },
    async getCompanyClientMode(options?: { search?: any, sortObj?: any, page?: number, limit?: number, count?: boolean, returnResult?: boolean, companyId?: any, clientMode?: boolean }) {

      let search = null;
      let sortObj = null;
      let count = false;
      let page = 1;
      let limit = 20;
      let returnResult = false;
      let companyId = null
      let clientMode = true;

      if (options) {
        search = options.search;
        sortObj = options.sortObj;
        page = options.page || 1;
        limit = options.limit || 20;
        count = options.count || false;
        returnResult = options.returnResult || false;
        companyId = options.companyId || null;
        clientMode = options.clientMode || true;
      }

      this.isLoading = true;
      //this.contacts = [] as any[];
      const runtimeConfig = useRuntimeConfig();

      const offset = limit * (page - 1);

      let url = `${runtimeConfig.public.apiUrl}companies/company-relationships`;

      if (this.allCompanies.length === 0) {

        const toastStore = useToastStore();
        try {
          const data: any = await $fetch(url);
          // this.contacts = data;
          this.allCompanies = data;
          this.totalCount = this.allCompanies.length;
        } catch (e: any) {
          toastStore.addToast({
            type: "error",
            message: e.cause,
          } as Toast);
          this.allCompanies = [] as any[];
          this.totalCount = 0;
        }
      }

      let companies: any = []

      if (sortObj) {
        this.allCompanies = orderBy(this.allCompanies, sortObj.sortKey, sortObj.sortOrder.toLowerCase());
      }


      if (search) {
        companies = this.allCompanies.filter((c: any) => c.company.toLowerCase().includes(search.toLowerCase()))
        this.totalCount = companies.length;
      }
      else {
        companies = this.allCompanies;
        this.totalCount = this.allCompanies.length;
      }

      companies = slice(companies, offset, offset + limit)

      if (returnResult) {
        return companies;
      }
      else {
        this.companies = companies;
      }

      this.isLoading = false;


    },
    async getCount(url: string) {
      this.totalCount = 0;
      const data: any = await $fetch(url);
      this.totalCount = data;
    },
    async createCompany(company: any) {
      const globalState = useMyGlobalStateStore();
      globalState.serverAction = true;

      // const payload = {
      //   opportunityName: this.fields.opportunityName,
      //   closedate: this.fields.closeDate,
      //   opportunityType: this.opportunityType,
      //   properties: this.selectedItems,
      // };

      return await $fetch("/api/company", {
        method: "POST",
        body: company,
      }).finally(() => {
        globalState.serverAction = false;
      });
    },
  },
});
