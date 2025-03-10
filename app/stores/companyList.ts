import type { CompanySummary } from "~~/models/companySummary.model";
import type { ContactSummary } from "~~/models/contactSummary.model";
import type { Relationship } from "~~/models/relationship.model";
import type { RelationshipResponse } from "~~/models/relationshipResponse.model";

export const useCompanyListStore = defineStore('companyListStore', () => {
    const config = useRuntimeConfig();
    const apiBaseUrl = config.public.apiBaseUrl;
    const relationships: Ref<CompanySummary[]> = ref([]);
    const selectedCompany = ref<CompanySummary>(undefined)
    const relatedProperties = ref<Relationship[]>([])
    const relatedContacts = ref<ContactSummary[]>([])
    const gridSearchString = ref<string>('');
    const isLoading = ref(false)

    async function setSelectedCompany(newCompany: CompanySummary) {
        selectedCompany.value = newCompany;
        const relatedEntitiesUrl = `${apiBaseUrl}/companies/related/${newCompany.id}`;
        isLoading.value = true;
        const response: RelationshipResponse = await $fetch(relatedEntitiesUrl);
        relatedProperties.value = response.relatedProperties;
        relatedContacts.value = response.relatedContacts;
        isLoading.value = false;
    }

    function resetStore() {
        selectedCompany.value = undefined;
        relatedProperties.value = [];
        relatedContacts.value = [];
        gridSearchString.value = '';
        isLoading.value = false;
    }

    return {
        relationships,
        selectedCompany,
        gridSearchString,
        relatedProperties,
        relatedContacts,
        setSelectedCompany,
        isLoading,
        resetStore,
    }
});