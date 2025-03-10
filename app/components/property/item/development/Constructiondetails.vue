<template>
  <div class="slds-grid slds-wrap slds-gutters_direct-x-small">
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemInputBox label="Units Number" :required="false" @input-changed="handleInputChange($event, 'unitsNumber')"
        :value="propertyStore.property.developmentPhases[propertyStore.phaseSelected]?.unitsNumber" />
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemComboBox label="Style" :required="false" @selected="handleInputChange($event, 'constructionStyle')"
        :values="propertyStore.options.developmentStyle"
        :selected="propertyStore.property.developmentPhases[propertyStore.phaseSelected]?.constructionStyle" />
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemInputBox label="Developer’s Name" :required="false"
        @input-changed="handleInputChange($event, 'developerName')"
        :value="propertyStore.property.developmentPhases[propertyStore.phaseSelected]?.developerName" />
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