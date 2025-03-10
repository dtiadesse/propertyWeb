<template>
  <div class="slds-grid slds-wrap slds-gutters_direct-x-small">
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemInputBox label="Year Built" name="yearBuilt" :required="propertyStore.propertySchema.yearBuilt.required"
        :has-error="propertyStore.propertySchema.yearBuilt.error" :value="propertyStore.property.yearBuilt" />
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemInputBox label="Year Renovated" name="dateRenovated" :required="false"
        :value="propertyStore.property.dateRenovated" />
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemInputBox label="Number of Units" name="numberOfUnits"
        :required="propertyStore.propertySchema.numberOfUnits.required"
        :has-error="propertyStore.propertySchema.numberOfUnits.error" :value="propertyStore.property.numberOfUnits" />
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemInputBox label="Number of Beds" name="beds" :required="false" :value="propertyStore.property.beds" />
    </div>

    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemInputBox label="Square Ft" name="buildingSizeSqFt" :required="false"
        :value="propertyStore.property.buildingSizeSqFt" />
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemInputBox label="Acres" name="sizeAcres" :required="false" :value="propertyStore.property.sizeAcres" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const propertyStore = useMyPropertyStore();
</script>

<style></style>