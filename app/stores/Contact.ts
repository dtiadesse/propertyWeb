import { defineStore } from "pinia";
import { orderBy, slice } from 'lodash-es';

export const useMyContactStore = defineStore({
  id: "myContactStore",
  state: () => ({
    contact: {} as any,
    contacts: [] as any,
    allContacts: [] as any,
    isLoading: false,
    totalCount: 0,
  }),

  actions: {
    async getContacts(options?: { search?: any, sortObj?: any, page?: number, limit?: number, count?: boolean, returnResult?: boolean, companyId?: any, clientMode?: boolean }) {

      let search = null;
      let sortObj = null;
      let count = false;
      let page = 1;
      let limit = 20;
      let returnResult = false;
      let companyId = null
      let clientMode: any = true;

      if (options) {
        search = options.search;
        sortObj = options.sortObj;
        page = options.page || 1;
        limit = options.limit || 20;
        count = options.count || false;
        returnResult = options.returnResult || false;
        companyId = options.companyId || null;
        clientMode = options.clientMode === false ? clientMode = false : clientMode = true;
      }

      this.isLoading = true;
      this.contacts = [] as any[];
      const runtimeConfig = useRuntimeConfig();

      const offset = limit * (page - 1);

      if (clientMode) {
        return await this.getContactsClientMode(options);
      }


      let url = `${runtimeConfig.public.apiUrl}contacts`;

      url += `?limit=${limit}&offset=${offset}`

      if (search) {
        url += `&searchKeyword=${search}`;
      }

      if (companyId) {
        url += `&companyId=${companyId}`;
      }

      if (count) {
        let countQuery = `${runtimeConfig.public.apiUrl}contacts/count`;
        if (search) {
          countQuery += `?searchKeyword=${search}`;
        }
        this.getCount(countQuery);
      }

      if (sortObj) {
        url += `&sortKey=${sortObj.sortKey}&sortOrder=${sortObj.sortOrder}`;
      }


      // const results = await $fetch(url);
      // this.contacts = results;
      const toastStore = useToastStore();
      try {
        const data: any = await $fetch(url);

        //return result in case of auto complete control
        if (returnResult) {
          return data;
        }

        this.contacts = data;
      } catch (e: any) {
        if (returnResult) {
          return [];
        }
        toastStore.addToast({
          type: "error",
          message: e.cause,
        } as Toast);
        this.contacts = [] as any[];
        this.totalCount = 0;
      }

      this.isLoading = false;
    },
    async getContactsClientMode(options?: { search?: any, sortObj?: any, page?: number, limit?: number, count?: boolean, returnResult?: boolean, companyId?: any, clientMode?: boolean }) {

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

      let url = `${runtimeConfig.public.apiUrl}contacts/contact-relationships`;




      if (this.allContacts.length === 0) {

        const toastStore = useToastStore();
        try {
          const data: any = await $fetch(url);
          // this.contacts = data;
          this.allContacts = data;
          this.totalCount = this.allContacts.length;
        } catch (e: any) {
          toastStore.addToast({
            type: "error",
            message: e.cause,
          } as Toast);
          this.contacts = [] as any[];
          this.totalCount = 0;
        }
      }

      let contacts: any = []

      if (sortObj) {
        this.allContacts = orderBy(this.allContacts, sortObj.sortKey, sortObj.sortOrder.toLowerCase());
      }


      if (search) {
        contacts = this.allContacts.filter((c: any) => c.contact.toLowerCase().includes(search.toLowerCase()))
        this.totalCount = contacts.length;
      }
      else {
        contacts = this.allContacts;
        this.totalCount = this.allContacts.length;
      }

      contacts = slice(contacts, offset, offset + limit)

      this.contacts = contacts;



      this.isLoading = false;


    },
    async getCount(url: string) {
      this.totalCount = 0;
      const data: any = await $fetch(url);
      this.totalCount = data;
    },
    async createContact(contact: any) {
      const globalState = useMyGlobalStateStore();
      globalState.serverAction = true;

      // const payload = {
      //   opportunityName: this.fields.opportunityName,
      //   closedate: this.fields.closeDate,
      //   opportunityType: this.opportunityType,
      //   properties: this.selectedItems,
      // };



      return await $fetch("/api/contact", {
        method: "POST",
        body: contact,
      }).finally(() => {
        globalState.serverAction = false;
      });
    },

  },
});
