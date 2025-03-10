<template>
  <UiItemTabs :tabs="detailsTabs" />
</template>

<script lang="ts" setup>

const detailsTabs: any = [
  { "label": "Property Details", "name": "Property Details", "component": shallowRef(resolveComponent("property/item/tabs/Details")), "is_active": true, "is_visible": true },
  { "label": "Property Relationships", "name": "Property Relationships", "component": shallowRef(resolveComponent("property/item/tabs/Relationship")), "is_active": false, "is_visible": true },
  { "label": "Notes", "name": "Notes", "component": shallowRef(resolveComponent("property/item/tabs/Notes")), "is_active": false, "is_visible": true },
  { "label": "Historical Roles", "name": "Historical Roles", "component": shallowRef(resolveComponent("property/item/tabs/HistoricalRoles")), "is_active": false, "is_visible": true },
]
</script>

<style></style>
