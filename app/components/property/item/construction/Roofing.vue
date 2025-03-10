<template>
  <div class="slds-grid slds-wrap slds-gutters_direct-x-small">
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemComboBox label="Type" name="roofing" :required="false" :selected="propertyStore.property.roofing"
        :values="propertyStore.options.roofingType" />
    </div>

    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemInputBox label="Composition" name="composition" :required="false" :value="propertyStore.property.composition" />
    </div>

    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemInputBox label="Last Replaced" name="lastReplaced" :required="false"
        :value="propertyStore.property.lastReplaced" />
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
    </div>
  </div>
</template>

<script lang="ts" setup>
const propertyStore = useMyPropertyStore();
</script>

<style></style>