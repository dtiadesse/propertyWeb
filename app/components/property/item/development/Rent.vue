<template>
  <div class="slds-grid slds-wrap slds-gutters_direct-x-small">
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemInputBox type="number" label="Rent PSF" :required="false"
        @input-changed="handleInputChange($event, 'rentPSF')"
        :value="propertyStore.property.developmentPhases[propertyStore.phaseSelected]?.rentPSF" />
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemInputBox label="Concessions" :required="false" @input-changed="handleInputChange($event, 'concessions')"
        :value="propertyStore.property.developmentPhases[propertyStore.phaseSelected]?.concessions" />
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