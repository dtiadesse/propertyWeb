import type { ContactSummary } from "~~/models/contactSummary.model";
import type { Relationship } from "~~/models/relationship.model";
import type { RelationshipResponse } from "~~/models/relationshipResponse.model";

export const useContactListStore = defineStore('contactListStore', () => {
    const config = useRuntimeConfig();
    const apiBaseUrl = config.public.apiBaseUrl;
    const relationships: Ref<ContactSummary[]> = ref([]);
    const selectedContacts = ref<ContactSummary[]>([])
    const selectedContact = ref<ContactSummary>(undefined)
    const relatedProperties = ref<Relationship[]>([])
    const gridSearchString = ref<string>('');
    const isLoading = ref(false)
 
    async function setSelectedContact(newContact: ContactSummary) {
        selectedContact.value = newContact;
        const relatedEntitiesUrl = `${apiBaseUrl}/contacts/related/${newContact.id}`;
        isLoading.value = true;
        const response: RelationshipResponse = await $fetch(relatedEntitiesUrl);
        relatedProperties.value = response.relatedProperties;
        isLoading.value = false;
    }

    function setSelectedContacts(contacts: ContactSummary[]) {
        selectedContacts.value = contacts;
    }

    function clearSelectedContacts() {
        selectedContacts.value = [];
    }

    function resetStore() {
        selectedContact.value = undefined;
        relatedProperties.value = [];
        gridSearchString.value = '';
        isLoading.value = false;
        clearSelectedContacts();
    }

    return {
        relationships,
        selectedContact,
        gridSearchString,
        relatedProperties,
        setSelectedContact,
        isLoading,
        resetStore,
        selectedContacts,
        clearSelectedContacts,
        setSelectedContacts,
    }
});