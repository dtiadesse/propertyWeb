<template>
  <div class="slds-grid slds-wrap slds-p-around_small" style="height:25rem">
    <div class="slds-col slds-size_12-of-12 slds-p-bottom_small">
      <UiItemInputBox label="Subject" :required="true" :edit-mode="true"
        @input-changed="updateModel($event, 'subject')" />
    </div>
    <div class="slds-col slds-size_12-of-12 slds-p-bottom_small">
      <UiItemTextArea label="Comments" :edit-mode="true" @input-changed="updateModel($event, 'comments')" />
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-right_xx-small slds-p-bottom_small">
      <UiItemDatePicker label="Start Date" :edit-mode="true" @date-selected="updateModel($event, 'startDate')" />
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-right_xx-small slds-p-bottom_small">
      <UiItemTimePicker label="Start Time" :edit-mode="true" @time-selected="updateModel($event, 'startTime')" />
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-right_xx-small slds-p-bottom_small">
      <UiItemDatePicker label="End Date" :edit-mode="true" @date-selected="updateModel($event, 'endDate')" />
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-right_xx-small slds-p-bottom_small">
      <UiItemTimePicker label="End Time" :edit-mode="true" @time-selected="updateModel($event, 'endTime')" />
    </div>
    <div class="slds-col slds-size_12-of-12 slds-p-bottom_small">
      <UiItemInputBox label="Location" placeholder="" :edit-mode="true"
        @input-changed="updateModel($event, 'location')" />
    </div>
    <div class="slds-col slds-size_12-of-12 slds-p-bottom_small">
      <UiItemAutoComplete label="Name" placeholder="Search Contacts" :edit-mode="true" :model="'contact'"
        @item-selected="updateModel($event, 'user')" />
    </div>
    <div class="slds-col slds-size_12-of-12 slds-p-bottom_small" style="padding-bottom: 1rem;">
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