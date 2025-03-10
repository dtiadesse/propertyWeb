<template>
  <div class="slds-grid slds-wrap slds-gutters_direct-x-small">
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemDatePicker label="Date of First Certificate" :required="false"
        @date-selected="handleInputChange($event, 'dtFirstCertificate')"
        :value="propertyStore.property.developmentPhases[propertyStore.phaseSelected]?.dtFirstCertificate" />
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemDatePicker label="Date of Last Certificate" :required="false"
        @date-selected="handleInputChange($event, 'dtLastCertificate')"
        :value="propertyStore.property.developmentPhases[propertyStore.phaseSelected]?.dtLastCertificate" />
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemRadio label="Is it Available for Leasing?" :options="[{ label: 'Yes', key: 'y' }, { label: 'No', key: 'n' }]"
        @value-changed="handleInputChange($event, 'isAvailableForLeasing')"
        :selected="propertyStore.property.developmentPhases[propertyStore.phaseSelected]?.isAvailableForLeasing" />
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