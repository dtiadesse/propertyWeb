<script lang="ts" setup>
import { ListPages } from '~~/models/listPages';
import type { PropertySummary } from '~~/models/propertySummary.model';
const { isLoggedIn } = await useAuthStore();
const userLoggedIn = isLoggedIn();
const listSettingsStore = useListSettingsStore();
const { setCurrentListPage } = listSettingsStore
setCurrentListPage(ListPages.AllPropertiesList)

const config = useRuntimeConfig();
const apiBaseUrl = config.public.apiBaseUrl;
const allPropertiesUrl = `${apiBaseUrl}/properties/all`
const propertyListStore = usePropertyListStore();
const { allProperties, isLoading } = storeToRefs(propertyListStore);
const { resetStore } = propertyListStore;

const { data, status, error, execute } = await useLazyFetch(allPropertiesUrl, {
    server: false,
    immediate: false
});

onMounted(async () => {
    isLoading.value = true;
    await execute();
    if (status.value === 'success') {
        allProperties.value = data.value as PropertySummary[];
    }
    isLoading.value = false;
});

onBeforeUnmount(() => {
    resetStore();
})

</script>

<template>
    <div v-if="userLoggedIn">
        <ListPageHeader />
        <p v-if="status === 'error'" class="font-semibold text-red-700 ml-10">
            Error loading data: {{ error }}
        </p>
        <PropertyListAll />
    </div>
</template>
