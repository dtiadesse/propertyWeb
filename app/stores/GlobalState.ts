import { defineStore } from "pinia";

export const useMyGlobalStateStore = defineStore({
  id: "myGlobalStateStore",
  state: () => ({
    serverAction: false,
    modalName: null as null | string,
    signedRequest: null as any,
  }),
  actions: {
    openModal(name: string) {
      this.modalName = name;
    },
    closeModal() {
      this.modalName = null;
    },
  },
});
