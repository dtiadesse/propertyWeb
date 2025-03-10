<template>
  <div class="slds-grid slds-wrap slds-gutters_direct-x-small">
    <div class="slds-col slds-size_12-of-12 slds-p-around_xx-small">
      <UiItemValueBox label="Created By" name="Created By" :required="false" :value="propertyStore.property.createdBy"
        :show-edit-icon="false" />
    </div>
    <div class="slds-col slds-size_12-of-12 slds-p-around_xx-small">
      <UiItemValueBox label="Modified By" name="Modified By" :required="false"
        :value="propertyStore.property.lastUpdatedBy" :show-edit-icon="false" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const propertyStore = useMyPropertyStore()

</script>

<style scoped></style>