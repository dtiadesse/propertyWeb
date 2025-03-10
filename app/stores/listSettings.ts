import { ListPages } from "~~/models/listPages";

export const useListSettingsStore = defineStore('listSettingsStore', () => {
    const currentListPage: Ref<ListPages> = ref(ListPages.AllPropertiesList);
    const pageTitle = ref("Property+ Properties");

    function setCurrentListPage(newPage: ListPages) {
        currentListPage.value = newPage;
        switch (currentListPage.value) {
            case ListPages.AllPropertiesList:
                pageTitle.value = "Property+ Properties";
                break;
            case ListPages.PropertyPersonalList:
                pageTitle.value = "My Property Personal Lists";
                break;
            case ListPages.CompanyRelationshipsList:
                pageTitle.value = "Company Relationships";
                break;
            case ListPages.ContactRelationshipsList:
                pageTitle.value = "Contact Relationships";
                break;
            default:
                pageTitle.value = "Property+ Properties";
                break;
        }
    }
    return {
        currentListPage,
        pageTitle,
        setCurrentListPage,
    }
});