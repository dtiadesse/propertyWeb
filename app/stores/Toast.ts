import { defineStore } from "pinia";

export interface Toast {
  type: "info" | "error" | "warning" | "success";
  message: string;
  id?: number;
}
export const useToastStore = defineStore({
  id: "myToastStore",
  state: () => ({
    toasts: [] as Toast[],
  }),
  actions: {
    addToast(toast: Toast) {
      toast.id = Math.floor(Math.random() * 985900);
      this.toasts.push(toast);
    },
    removeToast(toast: Toast) {
      const filteredItems = this.toasts.filter((t) => t.id !== toast.id);
      this.toasts = [...filteredItems]
    },
  },
});
