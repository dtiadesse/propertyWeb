<template>
  <div class="slds-grid slds-wrap slds-gutters_direct-x-small">
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemInputBox label="Acres" name="sizeAcres" :required="false" :value="propertyStore.property.sizeAcres" />
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemInputBox label="Parcel number" name="parcelNumber" :required="false"
        :value="propertyStore.property.parcelNumber" />
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemInputBox label="Map number" name="mapNumber" :required="false" :value="propertyStore.property.mapNumber" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const propertyStore = useMyPropertyStore();
</script>

<style></style>