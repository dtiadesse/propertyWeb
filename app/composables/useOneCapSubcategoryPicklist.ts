import { useOneCapPicklistStore } from "~/stores/onecap-picklists";

export const useOneCapSubcategoryPicklist = async (pinia: any, oppsType: string, category: string) => {
    const store = useOneCapPicklistStore(pinia);
    const { getSubcategories, setSubcategories } = store;
    let oneCapSubcategories = category === '' ? [] : getSubcategories(category);
    let status = 'success'
    let error = '';
    if (category !== '' && (!oneCapSubcategories || oneCapSubcategories.length === 0)) {
        const subcategoriesUri = `/api/onecap/picklists/subcategories/${oppsType}/${category}`
        const { status: loStatus, data: loData, error: loError } = await useFetch(subcategoriesUri)
        if (loStatus.value === 'success') {
            const subcategories: string[] = loData.value as string[];
            setSubcategories(category, subcategories);
            oneCapSubcategories = getSubcategories(category);
        } else {
            status = 'error';
            error = loError.value.message
        }
    }
    return { oneCapSubcategories, status, error };
}