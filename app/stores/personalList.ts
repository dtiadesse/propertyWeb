import type { PropertySummary } from "~~/models/propertySummary.model";

export const usePersonalListStore = defineStore('propertyPersonalListStore', () => {
    const modalVisible = ref(false);
    const personalLists = ref<string[]>([])
    const isDirectFromRowMenu = ref(false);
    //used for direct add from menu
    const selectedProperty = ref<PropertySummary>(null);

    const openPersonalListDlg = (): void => { modalVisible.value = true }
    const closePersonalListDlg = (): void => { modalVisible.value = false }

    function setSelectedProperty(property: PropertySummary): void {
        selectedProperty.value = property;
        isDirectFromRowMenu.value = true;  //use for direct add from menu
    }

    function clearSelectedProperty(): void {
        selectedProperty.value = null;
        isDirectFromRowMenu.value = false;
    };

    return {
        modalVisible,
        openPersonalListDlg,
        closePersonalListDlg,
        personalLists,
        isDirectFromRowMenu,
        selectedProperty,
        setSelectedProperty,
        clearSelectedProperty,
    }
})