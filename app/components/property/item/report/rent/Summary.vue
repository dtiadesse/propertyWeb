<template>
  <div class="slds-form" style="min-height: 15rem;">
    <UiItemComboBox :label="'Theme'" :values="reportStore.themes" :edit-mode="true"
      :selected="reportStore.config.rent.summary.theme" @selected="updateTheme" />
    <fieldset class="slds-form-element" role="radiogroup" style="margin-top: 0.5rem;">
      <legend class="slds-form-element__legend slds-form-element__label">Units Aggregate</legend>
      <div class="slds-form-element__control">
        <span class="slds-radio">
          <input type="radio" id="Average" value="Average" name="Average"
            v-model="reportStore.config.rent.summary.unitsAggregate" />
          <label class="slds-radio__label" for="Average">
            <span class="slds-radio_faux"></span>
            <span class="slds-form-element__label">Average</span>
          </label>
        </span>
        <span class="slds-radio">
          <input type="radio" id="Total" value="Total" name="Total"
            v-model="reportStore.config.rent.summary.unitsAggregate" />
          <label class="slds-radio__label" for="Total">
            <span class="slds-radio_faux"></span>
            <span class="slds-form-element__label">Total</span>
          </label>
        </span>
      </div>
    </fieldset>

    <UiItemTextArea label="Footnote" :edit-mode="true" :value="reportStore.config.rent.summary.footNote"
      @input-changed="updateFootNote" />
  </div>
</template>

<script lang="ts" setup>
const reportStore = useMyReportStore()

const updateTheme = (event: any) => {
  reportStore.config.rent.summary.theme = event;
}

const updateFootNote = (event: any) => {
  reportStore.config.rent.summary.footNote = event;
}


reportStore.popupHeader = 'Rent Comparables Summary'


</script>

<style></style>