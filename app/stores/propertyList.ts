import type { PropertySummary } from "~~/models/propertySummary.model";

export const usePropertyListStore = defineStore('propertyListStore', () => {
    const allProperties = ref<PropertySummary[]>([])
    const selectedProperties = ref<PropertySummary[]>([])
    const gridSearchString = ref<string>('');
    const isLoading = ref(false)

    function setSelectedProperties(properties: PropertySummary[]) {
        selectedProperties.value = properties;
    }

    function clearSelectedProperties() {
        selectedProperties.value = [];
    }

    function resetStore() {
        gridSearchString.value = '';
        isLoading.value = false;
    }

    return {
        selectedProperties,
        setSelectedProperties,
        clearSelectedProperties,
        gridSearchString,
        allProperties,
        isLoading,
        resetStore,
    }
})