<template>
  <div class="slds-grid slds-wrap slds-gutters_direct-x-small">
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemComboBox label="Source" :values="propertyStore.options.rentSurveySource" :required="false"
        @selected="handleInputChange($event, 'source')"
        :selected="propertyStore.property.rentSurveys[propertyStore.surveySelected]?.source" />
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemDatePicker label="Date" :required="false" @date-selected="handleInputChange($event, 'date')"
        :value="propertyStore.property.rentSurveys[propertyStore.surveySelected]?.date" />
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemInputBox label="Survey Creator's Name" :required="false"
        @input-changed="handleInputChange($event, 'creator')"
        :value="propertyStore.property.rentSurveys[propertyStore.surveySelected]?.creator" />
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small"></div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemComboBox label="Type" :values="surveyTypes" :required="false" @selected="handleInputChange($event, 'type')"
        :selected="propertyStore.property.rentSurveys[propertyStore.surveySelected]?.type" />
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemCheckbox label="Enable for reports?" :required="false"
        @value-changed="handleInputChange($event, 'enableForReports')"
        :selected="propertyStore.property.rentSurveys[propertyStore.surveySelected]?.enableForReports" />
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemInputBox :type="'number'" label="Occupancy (%)" :required="false"
        @input-changed="handleInputChange($event, 'occupancy')"
        :value="propertyStore.property.rentSurveys[propertyStore.surveySelected]?.occupancy" />
    </div>

    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemInputBox label="Pre-leased" type="number" :required="false"
        @input-changed="handleInputChange($event, 'preLeased')"
        :value="propertyStore.property.rentSurveys[propertyStore.surveySelected]?.preLeased" />
    </div>


    <div class="slds-col slds-size_12-of-12 slds-p-around_xx-small">
      <UiItemInputBox label="Concessions" :required="false" @input-changed="handleInputChange($event, 'concessions')"
        :value="propertyStore.property.rentSurveys[propertyStore.surveySelected]?.concessions" />
    </div>

    <div class="slds-col slds-size_12-of-12 slds-p-around_xx-small">
      <UiItemTextArea label="Rent Report Comments" :required="false"
        @input-changed="handleInputChange($event, 'rentReportComments')"
        :value="propertyStore.property.rentSurveys[propertyStore.surveySelected]?.rentReportComments" />
    </div>

    <div class="slds-col slds-size_12-of-12 slds-p-around_xx-small">
      <UiItemTextArea label="Unit Mix Footnote" :required="false"
        :value="propertyStore.property.rentSurveys[propertyStore.surveySelected]?.unitMixFootnote"
        @input-changed="handleInputChange($event, 'unitMixFootnote')" />
    </div>

    <div class="slds-col slds-size_12-of-12 slds-p-around_xx-small">
      <UiItemTextArea label="Notes" :required="false" @input-changed="handleInputChange($event, 'notes')"
        :value="propertyStore.property.rentSurveys[propertyStore.surveySelected]?.notes" />
    </div>

  </div>
</template>

<script lang="ts" setup>
const propertyStore = useMyPropertyStore();

const surveyTypes = ref([{
  label: "Condo",
  value: "Condo"
},
{
  label: "Multifamily",
  value: "Multifamily"
}])

const handleInputChange = (event: any, key: any) => {
  if (key === 'enableForReports') {
    if (event === true) {
      event = 'Yes';
    }
    else {
      event = 'No';
    }
  }
  else if (key === 'date') {
    if (event) {
      event = new Date(event).toISOString();
    }
  }
  propertyStore.updateRentSurvey(event, key)
}

</script>

<style></style>