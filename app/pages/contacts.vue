<script lang="ts" setup>
import { ContactsRelations } from '#components';
import { ListPages } from '~~/models/listPages';
import type { RelationshipResponse } from '~~/models/relationshipResponse.model';

const listSettingsStore = useListSettingsStore();
const { setCurrentListPage } = listSettingsStore
setCurrentListPage(ListPages.ContactRelationshipsList)

const config = useRuntimeConfig();
const apiBaseUrl = config.public.apiBaseUrl;
const contactsUrl = `${apiBaseUrl}/contacts/relationships`;
const contactListStore = useContactListStore();
const { relationships, isLoading } = storeToRefs(contactListStore);
const { resetStore } = contactListStore;

const { data, status, error, execute } = await useLazyFetch(contactsUrl, {
    server: false,
    immediate: false
});

onMounted(async () => {
    isLoading.value = true;
    await execute();
    if (status.value === 'success') {
        const response: RelationshipResponse = data.value as RelationshipResponse;
        if (!response.hasError) {
            relationships.value = response.contactRelationships;
        } else {
            console.error('Error fetching contact relationships:', response.errorMsg);
        }
    }
    isLoading.value = false;
});

onBeforeUnmount(() => {
    resetStore();
})

</script>

<template>
    <div class="flex flex-col">
        <ListPageHeader />
        <p v-if="status === 'error'" class="font-semibold text-red-700 ml-10">
            Error loading data: {{ error }}
        </p>
        <ContactsRelations />
    </div>
</template>
