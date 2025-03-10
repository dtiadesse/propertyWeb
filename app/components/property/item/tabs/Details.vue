<template>
  <UiItemExpandableSection :component="section.details" label="Property Details" />
  <UiItemExpandableSection :component="section.location" label="Location" />
  <UiItemExpandableSection :component="section.stats" label="Stats" />
  <UiItemExpandableSection :component="section.info" label="System Information" />
</template>

<script lang="ts" setup>
const section = {
  "details": shallowRef(resolveComponent('property/item/details/Detailsform')),
  "location": shallowRef(resolveComponent('property/item/details/Locationform')),
  "stats": shallowRef(resolveComponent('property/item/details/Stats')),
  "info": shallowRef(resolveComponent('property/item/details/Systeminfo'))
}
</script>

<style></style>
