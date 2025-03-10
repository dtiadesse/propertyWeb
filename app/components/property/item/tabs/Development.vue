<template>
  <PropertyItemDevelopmentPhase />
  <template v-if="propertyStore.property.developmentPhases.length > 0">
    <UiItemExpandableSection :component="section.phase" label="Phase Details" />
    <UiItemExpandableSection :component="section.construction" label="Construction Details" />
    <UiItemExpandableSection :component="section.certificates" label="Certificates of Occupancy" />
    <UiItemExpandableSection :component="section.occupancy" label="Occupancy" />
    <UiItemExpandableSection :component="section.rent" label="Rent" />
  </template>
  <div class="slds-box no-records" v-else>Nothing added yet. Click on the "Create" button to add development phase.
  </div>
</template>

<script lang="ts" setup>
const section = {
  "phase": shallowRef(resolveComponent('property/item/development/Phasedetails')),
  "construction": shallowRef(resolveComponent('property/item/development/Constructiondetails')),
  "certificates": shallowRef(resolveComponent('property/item/development/Certificates')),
  "occupancy": shallowRef(resolveComponent('property/item/development/Occupancy')),
  "rent": shallowRef(resolveComponent('property/item/development/Rent')),
}

const propertyStore = useMyPropertyStore()
</script>

<style scoped>
.no-records {
  background: #f3f3f3;
  width: 100%;
}
</style>