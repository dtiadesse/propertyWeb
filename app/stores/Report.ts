import { defineStore } from "pinia";

const C_THEME = 'Red'

export const useMyReportStore = defineStore({
  id: "useMyReportStore",
  state: () => ({
    isLoading: false,
    popupHeader: 'Report Generator',
    step: 1,
    reportOptions: [
      'Rent Comparables Pages',
      'Rent Comparables Ranking',
      'Rent Comparables Summary',
      'Sale Comparables Pages',
      'Sale Comparables Summary'
    ],
    optionsSelected: [] as any[],
    optionsCompleted: [] as any[],
    themes: [
      {
        "label": "Red",
        "value": "Red"
      },
      {
        "label": "Dark Red",
        "value": "Dark Red"
      },
    ],
    config: {
      rent: {
        pages: {
          showPhotos: true,
          marketRentOnly: false,
          condensed: false,
          theme: C_THEME,
        },
        ranking: {
          theme: C_THEME,
          VADRent: false,
        },
        summary: {
          theme: C_THEME,
          unitsAggregate: "Average",
          footNote: "",
        }
      },
      sale: {
        pages: { theme: C_THEME, showPhotos: true },
        summary: {
          theme: C_THEME, unitsAggregate: "Average", footNote: "", showLocation: false,
        }
      },
      propertyId: "",
      userName: "",
      optionsCompleted: [] as any[]
    },
  }),
  actions: {
    selectReportType() {

    },
    handleCloseModal() {
      const globalState = useMyGlobalStateStore();
      this.$reset();
      globalState.closeModal();
    },
    handleBackAction() {
      this.step--;
      if (this.step >= 1) {
        const elm = this.optionsCompleted.pop();
        if (elm) {
          this.optionsSelected = [elm, ...this.optionsSelected]
        }
      }
    },
    handleNextStep() {
      this.step++;
      if (this.step > 2) {
        const elm = this.optionsSelected.shift();
        this.optionsCompleted.push(elm)
      }
    },
    generateReport(propertyId: string) {
      const globalStore = useMyGlobalStateStore();
      const toastStore = useToastStore()
      const totalReports = [...this.optionsCompleted, ...this.optionsSelected]
      globalStore.serverAction = true;
      const pushRequests: any = [];
      try {
        totalReports.forEach((r: any) => {
          let config = null
          if (r === 'Rent Comparables Pages') {
            config = this.config.rent.pages;
          }
          else if (r === 'Rent Comparables Ranking') {
            config = this.config.rent.ranking;
          }
          else if (r === 'Rent Comparables Summary') {
            config = this.config.rent.summary;
          }
          else if (r === 'Sale Comparables Pages') {
            config = this.config.sale.pages;
          }
          else if (r === 'Sale Comparables Summary') {
            config = this.config.sale.summary;
          }

          config = btoa(JSON.stringify(config))
          pushRequests.push(true);
          $fetch(`/api/report?config=${config}&report=${r}&propertyId=${propertyId}`).then((response: any) => {
            pushRequests.pop();
            const url = window.URL.createObjectURL(response);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${r}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

            if (pushRequests.length === 0) {
              globalStore.serverAction = false;
              this.handleCloseModal()
            }
          });
        })

      } catch (error) {
        globalStore.serverAction = false;
        toastStore.addToast({
          type: "error",
          id: 1,
          message: `Error downloading PDF: ${error}`,
        })
        console.error("Error downloading PDF:", error);
      }
    }
  },
});
