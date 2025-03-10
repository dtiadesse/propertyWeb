<template>
  <UiItemTabs :tabs="comparablesTabs" />
</template>

<script lang="ts" setup>

const comparablesTabs: any = [
  { "label": "Rents", "name": "Rents", "component": shallowRef(resolveComponent("property/item/comparables/Rents")), "is_active": true, "is_visible": true },
  { "label": "Sales", "name": "Sales", "component": shallowRef(resolveComponent("property/item/comparables/Sales")), "is_active": false, "is_visible": true },
]
</script>

<style scoped></style>
