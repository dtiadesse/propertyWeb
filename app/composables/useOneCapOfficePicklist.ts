import { useOneCapPicklistStore } from "~/stores/onecap-picklists";

export const useOneCapOfficePicklist = async (pinia: any, opportunityType: string) => {
    const store = useOneCapPicklistStore(pinia);
    const { getOffices, setOffices } = store;
    let oneCapOffices = getOffices(opportunityType);
    let status = 'success'
    let error = '';
    if (!oneCapOffices || oneCapOffices.length === 0) {
        const leadOfficesUri = `/api/onecap/picklists/lead-offices/${opportunityType}`
        const { status: loStatus, data: loData, error: loError } = await useFetch(leadOfficesUri)
        if (loStatus.value === 'success') {
            const offices: string[] = loData.value as string[];
            setOffices(opportunityType, offices?.sort());
            oneCapOffices = getOffices(opportunityType);
        } else {
            status = 'error';
            error = loError.value.message
        }
    }
    return { oneCapOffices, status, error };
}