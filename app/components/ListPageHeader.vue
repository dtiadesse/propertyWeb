<script lang="ts" setup>
import { ListPages } from '~~/models/listPages';

const listSettingsStore = useListSettingsStore();
const { currentListPage } = storeToRefs(listSettingsStore)
</script>

<template>
    <div>
        <PropertyListPageHeader v-if="currentListPage === ListPages.AllPropertiesList" />
        <LazyContactsPageHeader v-if="currentListPage === ListPages.ContactRelationshipsList" />
        <LazyCompaniesPageHeader v-if="currentListPage === ListPages.CompanyRelationshipsList" />
    </div>
</template>

<style lang="css" scoped></style>
