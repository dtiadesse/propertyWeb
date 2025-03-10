<template>
  <div class="slds-grid slds-wrap slds-gutters_direct-x-small">
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemComboBox label="Style" name="propertyStyle" :required="false" :selected="propertyStore.property.propertyStyle"
        :values="propertyStore.options.constructionStyle" />
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemInputBox label="# of Buildings" name="buildings" :required="false" :value="propertyStore.property.buildings" />
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemComboBox label="Siding" name="siding" :required="false" :selected="propertyStore.property.siding"
        :values="propertyStore.options.siding" />
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemInputBox label="# of Stories" name="stories" :required="false" :value="propertyStore.property.stories" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const propertyStore = useMyPropertyStore();
</script>

<style></style>