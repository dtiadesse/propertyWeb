<template>
  <div class="slds-grid slds-wrap slds-p-around_small" style="height: 20rem;">
    <div class="slds-col slds-size_12-of-12">
      <UiItemInputBox label="Subject" :required="true" :edit-mode="true"
        @input-changed="updateModel($event, 'subject')" />
    </div>
    <div class="slds-col slds-size_12-of-12 slds-p-bottom_small">
      <UiItemTextArea label="Comments" :edit-mode="true" @input-changed="updateModel($event, 'comments')" />
    </div>
    <div class="slds-col slds-size_12-of-12">
      <UiItemAutoComplete label="Name" placeholder="Search Contacts" :edit-mode="true" :model="'contact'"
        @item-selected="updateModel($event, 'user')" />
    </div>
    <div class="slds-col slds-size_12-of-12">
      <UiItemValueBox label="Related to" :edit-mode="false" :value="relatedTo" :show-edit-icon="false" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const model: any = defineModel()

const { relatedTo } = defineProps(['relatedTo'])

const updateModel = (event: any, field: any) => {
  model.value[field] = event
}

</script>

<style></style>