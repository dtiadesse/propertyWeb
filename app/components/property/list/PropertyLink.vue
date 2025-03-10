<script lang="ts" setup>
// for testing only
import type { PropertySummary } from '~~/models/propertySummary.model';

const props = defineProps({
    params: Object
})

let propertyAsset = {} as PropertySummary;

onBeforeMount(() => {
    propertyAsset = props.params.data;
})
</script>

<template>
    <NuxtLink :to="`/property/${propertyAsset.id}`" class="text-blue-600 hover:underline"
        :title="propertyAsset.name ?? propertyAsset.stdAddress1">
        {{ propertyAsset.name ?? propertyAsset.stdAddress1 }}
    </NuxtLink>
</template>
