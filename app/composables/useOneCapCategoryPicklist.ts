import { useOneCapPicklistStore } from "~/stores/onecap-picklists";

export const useOneCapCategoryPicklist = async (pinia: any, opportunityType: string) => {
    const store = useOneCapPicklistStore(pinia);
    const { getCategories, setCategories } = store;
    let oneCapCategories = getCategories(opportunityType);
    let status = 'success'
    let error = '';
    if (!oneCapCategories || oneCapCategories.length === 0) {
        const categoriesUri = `/api/onecap/picklists/categories/${opportunityType}`
        const { status: loStatus, data: loData, error: loError } = await useFetch(categoriesUri)
        if (loStatus.value === 'success') {
            const categories: string[] = loData.value as string[];
            setCategories(opportunityType, categories);
            oneCapCategories = getCategories(opportunityType);
        } else {
            status = 'error';
            error = loError.value.message
        }
    }
    return { oneCapCategories, status, error };
}