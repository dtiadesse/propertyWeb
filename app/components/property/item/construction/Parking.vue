<template>
  <div class="slds-grid slds-wrap slds-gutters_direct-x-small">
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemInputBox label="Spaces amount" name="parkingSpaces" :required="false"
        :value="propertyStore.property.parkingSpaces" />
    </div>

    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemInputBox label="Garages amount" name="garages" :required="false" :value="propertyStore.property.garages" />
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemInputBox label="Carports amount" name="carports" :required="false" :value="propertyStore.property.carports" />
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
    </div>

  </div>
</template>

<script lang="ts" setup>
const propertyStore = useMyPropertyStore();

</script>

<style></style>