export const useOneCapPicklistStore = defineStore('oneCapPicklistStore', () => {
    const offices = ref(new Map<string, string[]>());
    const dealProfiles = ref(new Map<string, string[]>());
    const categories = ref(new Map<string, string[]>());
    const subcategories = ref(new Map<string, string[]>());

    function getOffices(opportunityType: string): string[] {
        return offices.value.get(opportunityType) || [];
    }

    function setOffices(opportunityType: string, newOffices: string[]): void {
        offices.value.set(opportunityType, newOffices);
    }

    function getCategories(opportunityType: string): string[] {
        return categories.value.get(opportunityType) || [];
    }

    function setCategories(opportunityType: string, newCategories: string[]): void {
        categories.value.set(opportunityType, newCategories);
    }

    function getSubcategories(category: string): string[] {
        return subcategories.value.get(category) || [];
    }

    function setSubcategories(category: string, newSubcategories: string[]): void {
        subcategories.value.set(category, newSubcategories);
    }

    return {
        offices,
        dealProfiles,
        getOffices,
        setOffices,
        categories,
        getCategories,
        setCategories,
        subcategories,
        getSubcategories,
        setSubcategories
    }
})