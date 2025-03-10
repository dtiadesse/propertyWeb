<script lang="ts" setup>
import { ListPages } from '~~/models/listPages';
import type { RelationshipResponse } from '~~/models/relationshipResponse.model';
const listSettingsStore = useListSettingsStore();
const { setCurrentListPage } = listSettingsStore
setCurrentListPage(ListPages.CompanyRelationshipsList)
const config = useRuntimeConfig();
const apiBaseUrl = config.public.apiBaseUrl;
const companiesUrl = `${apiBaseUrl}/companies/relationships`;
const companyListStore = useCompanyListStore();
const { relationships, isLoading } = storeToRefs(companyListStore);
const { resetStore } = companyListStore;

const { data, status, error, execute } = await useLazyFetch(companiesUrl, {
    server: false,
    immediate: false
});

onMounted(async () => {
    isLoading.value = true;
    await execute();
    if (status.value === 'success') {
        const response: RelationshipResponse = data.value as RelationshipResponse;
        if (!response.hasError) {
            relationships.value = response.companyRelationships;
        } else {
            console.error('Error fetching company relationships:', response.errorMsg);
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
        <CompaniesRelations />
    </div>
</template>