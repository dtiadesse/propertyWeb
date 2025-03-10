<template>
  <div class="slds-grid slds-wrap slds-gutters_direct-x-small">
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemInputBox label="Leased" :required="false" @input-changed="handleInputChange($event, 'leased')"
        type="number" :value="propertyStore.property.developmentPhases[propertyStore.phaseSelected]?.leased" />
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemInputBox label="Physical" :required="false" @input-changed="handleInputChange($event, 'physical')"
        type="number" :value="propertyStore.property.developmentPhases[propertyStore.phaseSelected]?.physical" />
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemInputBox label="Velocity" :required="false" @input-changed="handleInputChange($event, 'velocity')"
        :value="propertyStore.property.developmentPhases[propertyStore.phaseSelected]?.velocity" />
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
    </div>
  </div>
</template>

<script lang="ts" setup>
const propertyStore = useMyPropertyStore();

const handleInputChange = (event: any, key: any) => {
  propertyStore.updatePhaseDetail(event, key)
}
</script>

<style></style>