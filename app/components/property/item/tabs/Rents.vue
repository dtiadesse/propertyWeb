<template>
  <PropertyItemRentsSurvey />
  <template v-if="propertyStore.property.rentSurveys.length > 0">
    <UiItemTabs :tabs="rentSurveyTabs" />
  </template>
  <div class="slds-box no-records" v-else>Nothing added yet. Click on the "Create Survey" button to add rent survey.
  </div>
</template>

<script lang="ts" setup>
const rentSurveyTabs: any = [
  { "label": "Main Details", "name": "Main Details", "component": shallowRef(resolveComponent("property/item/rents/Details")), "is_active": true, "is_visible": true },
  { "label": "Utilities", "name": "Utilities", "component": shallowRef(resolveComponent("property/item/rents/Utilities")), "is_active": false, "is_visible": true },
  { "label": "Fees", "name": "Fees", "component": shallowRef(resolveComponent("property/item/rents/Fees")), "is_active": false, "is_visible": true },
  { "label": "Unit Mix", "name": "Unit Mix", "component": shallowRef(resolveComponent("property/item/rents/Unitmix")), "is_active": false, "is_visible": true },
]

const propertyStore = useMyPropertyStore()
</script>

<style scoped>
.no-records {
  background: #f3f3f3;
  width: 100%;
}
</style>