<template>
  <UiItemExpandableSection label="Call Information">
    <div class="slds-grid slds-wrap slds-p-horizontal_small">
      <div class="slds-col slds-size_12-of-12">
        <UiItemInputBox label="Subject" :required="true" :edit-mode="true"
          @input-changed="updateModel($event, 'subject')" :value="model.subject" />
      </div>
      <div class="slds-col slds-size_8-of-12">
        <UiItemAutoComplete label="Assigned to" placeholder="Search Contacts" :edit-mode="true" :model="'contact'"
          @item-selected="updateModel($event, 'assignedTo')" :selected="model.assignedTo?.Name" />
      </div>
      <div class="slds-col slds-size_8-of-12">
        <UiItemDatePicker label="Due Date" :edit-mode="true" @date-selected="updateModel($event, 'dueDate')"
          :value="model.dueDate" />
      </div>

      <div class="slds-col slds-size_12-of-12">
        <UiItemAutoComplete label="Name" placeholder="Search Contacts" :edit-mode="true" :model="'contact'"
          @item-selected="updateModel($event, 'user')" :selected="model.user?.Name" />
      </div>
      <div class="slds-col slds-size_12-of-12">
        <UiItemValueBox label="Related to" :edit-mode="false" :value="relatedTo" :show-edit-icon="false" />
      </div>

      <div class="slds-col slds-size_8-of-12">
        <UiItemComboBox label="Activity Currency" :values="currency" :selected="model.currency" :edit-mode="true"
          @selected="updateModel($event, 'currency')" />
      </div>

      <div class="slds-col slds-size_12-of-12">
        <UiItemTextArea label="Comments" :value="model.comments" :edit-mode="true"
          @input-changed="updateModel($event, 'comments')" />
      </div>
    </div>
  </UiItemExpandableSection>

  <UiItemExpandableSection label="Additional Information">
    <div class="slds-grid slds-wrap slds-p-horizontal_small">
      <div class="slds-col slds-size_7-of-12">
        <UiItemComboBox label="Priority" :values="priority" :selected="model.priority" :edit-mode="true"
          @selected="updateModel($event, 'priority')" />
      </div>
      <div class="slds-col slds-size_7-of-12">
        <UiItemComboBox label="Status" :values="status" :selected="model.status" :edit-mode="true"
          @selected="updateModel($event, 'status')" />
      </div>
    </div>
  </UiItemExpandableSection>

  <UiItemExpandableSection label="Other Information">
    <div class="slds-grid slds-wrap slds-p-horizontal_small">
      <div class="slds-col slds-size_12-of-12">
        <div class="slds-checkbox">
          <input type="checkbox" name="options" :id="'task-checkbox-id-101'" :value="true" :checked="model.reminder"
            @change="updateModel($event, 'reminder')" />
          <label class="slds-checkbox__label" :for="'task-checkbox-id-101'">Set
            Reminder
            <span class="slds-checkbox_faux"></span>
            <span class="slds-form-element__label slds-assistive-text">Set Reminder</span>
          </label>
        </div>
      </div>
      <div class="slds-col slds-size_6-of-12">
        <UiItemDatePicker :edit-mode="true" :label="'Date'" :value="model.reminderDate"
          @date-selected="updateModel($event, 'reminderDate')" />
      </div>
      <div class="slds-col slds-size_6-of-12">
        <UiItemTimePicker :label="'Time'" :value="model.reminderTime"
          @time-selected="updateModel($event, 'reminderTime')" />
      </div>
    </div>
  </UiItemExpandableSection>

</template>
<script lang="ts" setup>
const propertyStore = useMyPropertyStore();
const activityStore = useMyActivityStore();

// const activity: any = ref(null);
const model: any = defineModel()

const priority = [{
  label: "Normal",
  value: "Normal",
}, {
  label: "Low",
  value: "Low",
}, {
  label: "High",
  value: "High",
}]

const status = [{
  label: "Pending",
  value: "Pending",
}, {
  label: "Completed",
  value: "Completed",
}]

const currency = [{
  label: 'USD - U.S Dollar',
  value: 'USD - U.S Dollar'
}]
const { relatedTo } = defineProps(['relatedTo'])

const updateModel = (event: any, field: any) => {
  if (field === 'reminder') {
    event = event.target.checked;
  }
  model.value[field] = event
}


</script>

<style></style>