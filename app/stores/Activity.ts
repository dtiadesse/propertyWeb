import { defineStore } from "pinia";
import type {
  Activity,
  Property,
} from "./Models";
import type { Toast } from "./Toast";


export const useMyActivityStore = defineStore({
  id: "myActivityStore",
  state: () => ({
    editActivityId: null as any,
    activity: null as Activity,
    activities: [] as Activity[],
    isLoading: false,
    infoMessage: "",
  }),
  actions: {
    async getActivities(propertyId: string = "") {
      const runtimeConfig = useRuntimeConfig();
      const toastStore = useToastStore();
      let data = [{}] as Activity[];
      try {
        let url = `${runtimeConfig.public.apiUrl}activity?propertyId=${propertyId}`;
        data = await $fetch(url, { method: 'GET' });
        this.activities = data;
        if (this.activities.length === 0) {
          this.infoMessage = "No activities found";
        }
      } catch (e: any) {
        toastStore.addToast({
          type: "error",
          message: e.cause || e.name,
        } as Toast);
        this.activities = [] as Activity[];

        this.infoMessage = "Some error occured. Please try again."
      }
      this.isLoading = false;
      return data;

    },
    async createActivity(activity: Activity) {
      const runtimeConfig = useRuntimeConfig();
      const globalState = useMyGlobalStateStore();
      globalState.serverAction = true;
      const toastStore = useToastStore()

      const payload = activity

      try {
        const result = await $fetch(`${runtimeConfig.public.apiUrl}activity`, {
          method: "POST",
          body: payload,
        }).finally(() => {
          globalState.serverAction = false;
        });


        return result;
      }
      catch (e: any) {
        toastStore.addToast({
          type: "error",
          id: 1,
          message: "Some error occured.",
        });
      }
    },
    async deleteActivity(activityId: string) {
      const runtimeConfig = useRuntimeConfig();
      const toastStore = useToastStore();
      let data = [{}] as Activity[];
      try {
        let url = `${runtimeConfig.public.apiUrl}activity/delete?activityId=${activityId}`;
        data = await $fetch(url, { method: 'GET' });
        toastStore.addToast({
          type: "success",
          id: 1,
          message: "Activity deleted successfully.",
        });
        return data;
      } catch (e: any) {
        toastStore.addToast({
          type: "error",
          message: e.cause || e.name,
        } as Toast);
        this.activities = [] as Activity[];

        this.infoMessage = "Some error occured. Please try again."
      }
      this.isLoading = false;
      return data;

    },
  },
});
