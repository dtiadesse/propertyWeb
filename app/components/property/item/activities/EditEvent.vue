<template>
  <UiItemExpandableSection label="Calendar Details">
    <div class="slds-grid slds-wrap slds-p-horizontal_small">
      <div class="slds-col slds-size_12-of-12">
        <UiItemInputBox label="Subject" :required="true" :edit-mode="true"
          @input-changed="updateModel($event, 'subject')" :value="model.subject" />
      </div>
      <div class="slds-col slds-size_8-of-12">
        <UiItemAutoComplete label="Assigned to" placeholder="Search Contacts" :edit-mode="true" :model="'contact'"
          @item-selected="updateModel($event, 'assignedTo')" :selected="model.assignedTo?.Name" />
      </div>

      <div class="slds-col slds-size_12-of-12">
        <UiItemInputBox label="Location" :edit-mode="true" :value="model.location"
          @input-changed="updateModel($event, 'location')" />
      </div>
      <div class="slds-col slds-size_6-of-12">
        <UiItemDatePicker label="Start Date" :edit-mode="true" @date-selected="updateModel($event, 'startDate')"
          :value="model.startDate" />
      </div>
      <div class="slds-col slds-size_6-of-12">
        <UiItemTimePicker label="Start Time" :edit-mode="true" @date-selected="updateModel($event, 'startTime')"
          :value="model.startTime" />
      </div>
      <div class="slds-col slds-size_6-of-12">
        <UiItemDatePicker label="End Date" :edit-mode="true" @date-selected="updateModel($event, 'endDate')"
          :value="model.endDate" />
      </div>
      <div class="slds-col slds-size_6-of-12">
        <UiItemTimePicker label="End Time" :edit-mode="true" @date-selected="updateModel($event, 'endTime')"
          :value="model.endTime" />
      </div>

      <div class="slds-col slds-size_12-of-12">
        <UiItemCheckbox label="All-Day Event" :edit-mode="true" @value-changed="updateModel($event, 'allDayEvent')"
          :selected="model.allDayEvent" :value="true" />
      </div>

      <div class="slds-col slds-size_12-of-12">
        <UiItemComboBox label="Type" :edit-mode="true" :values="eventTypes" @selected="updateModel($event, 'eventType')"
          :selected="model.eventType" />
      </div>

      <div class="slds-col slds-size_12-of-12">
        <UiItemTextArea label="Comments" :value="model.comments" :edit-mode="true"
          @input-changed="updateModel($event, 'comments')" />
      </div>

      <div class="slds-col slds-size_8-of-12">
        <UiItemComboBox label="Activity Currency" :values="currency" :selected="model.currency" :edit-mode="true"
          @selected="updateModel($event, 'currency')" />
      </div>
    </div>
  </UiItemExpandableSection>

  <UiItemExpandableSection label="Related to">
    <div class="slds-grid slds-wrap slds-p-horizontal_small">
      <div class="slds-col slds-size_12-of-12">
        <UiItemAutoComplete label="Name" placeholder="Search Contacts" :edit-mode="true" :model="'contact'"
          @item-selected="updateModel($event, 'user')" :selected="model.user?.Name" />
      </div>
      <div class="slds-col slds-size_12-of-12">
        <UiItemValueBox label="Related to" :edit-mode="false" :value="relatedTo" :show-edit-icon="false" />
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

const eventTypes = ref([{
  label: "Email",
  value: "Email"
}, {
  label: "Online",
  value: "Online"
}])

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