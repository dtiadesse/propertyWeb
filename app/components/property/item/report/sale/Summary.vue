<template>
  <div class="slds-form" style="min-height: 15rem;">
    <UiItemComboBox :label="'Theme'" :values="reportStore.themes" :edit-mode="true"
      :selected="reportStore.config.sale.summary.theme" @selected="updateTheme" />
    <fieldset class="slds-form-element" role="radiogroup" style="margin-top: 0.5rem;">
      <legend class="slds-form-element__legend slds-form-element__label">Units Aggregate</legend>
      <div class="slds-form-element__control">
        <span class="slds-radio">
          <input type="radio" id="Average" value="Average" name="Average"
            v-model="reportStore.config.sale.summary.unitsAggregate" />
          <label class="slds-radio__label" for="Average">
            <span class="slds-radio_faux"></span>
            <span class="slds-form-element__label">Average</span>
          </label>
        </span>
        <span class="slds-radio">
          <input type="radio" id="Total" value="Total" name="Total"
            v-model="reportStore.config.sale.summary.unitsAggregate" />
          <label class="slds-radio__label" for="Total">
            <span class="slds-radio_faux"></span>
            <span class="slds-form-element__label">Total</span>
          </label>
        </span>
      </div>
    </fieldset>

    <fieldset class="slds-form-element slds-form-element_stacked" style="margin-top: 0.5rem;padding-left: 0;">
      <legend class="slds-form-element__legend slds-form-element__label">Options</legend>
      <div class="slds-form-element__control">
        <div class="slds-checkbox">
          <input type="checkbox" name="showLocation" id="showLocation" :value="true"
            v-model="reportStore.config.sale.summary.showLocation" />
          <label class="slds-checkbox__label" for="showLocation">
            <span class="slds-checkbox_faux"></span>
            <span class="slds-form-element__label">Display Location of the Property</span>
          </label>
        </div>

      </div>
    </fieldset>

    <UiItemTextArea label="Footnote" :edit-mode="true" :value="reportStore.config.sale.summary.footNote"
      @input-changed="updateFootNote" />
  </div>
</template>

<script lang="ts" setup>
const reportStore = useMyReportStore()

const updateTheme = (event: any) => {
  reportStore.config.sale.summary.theme = event;
}

const updateFootNote = (event: any) => {
  reportStore.config.sale.summary.footNote = event;
}


reportStore.popupHeader = 'Sale Comparables Summary'


</script>

<style></style>