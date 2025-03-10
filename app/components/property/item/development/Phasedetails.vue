<template>
  <div class="slds-grid slds-wrap slds-gutters_direct-x-small">
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemInputBox label="Phase Number" :required="false" @input-changed="handleInputChange($event, 'phaseNumber')"
        :value="propertyStore.property.developmentPhases[propertyStore.phaseSelected]?.phaseNumber" />
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemInputBox label="Phase Name" :required="false" @input-changed="handleInputChange($event, 'phaseName')"
        :value="propertyStore.property.developmentPhases[propertyStore.phaseSelected]?.phaseName" />
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemComboBox label="Status" :required="false" @selected="handleInputChange($event, 'status')"
        :selected="propertyStore.property.developmentPhases[propertyStore.phaseSelected]?.status"
        :values="propertyStore.options.developmentStatus" />
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemDatePicker label="Survey Date" :required="false" @date-selected="handleInputChange($event, 'surveyDate')"
        :value="propertyStore.property.developmentPhases[propertyStore.phaseSelected]?.surveyDate" />
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