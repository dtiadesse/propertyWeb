<template>
  <div class="slds-form" style="min-height: 11rem;">
    <UiItemComboBox :label="'Theme'" :values="reportStore.themes" :edit-mode="true"
      :selected="reportStore.config.rent.ranking.theme" @selected="updateTheme" />
    <fieldset class="slds-form-element slds-form-element_stacked" style="margin-top: 0.5rem;">
      <legend class="slds-form-element__legend slds-form-element__label">Options</legend>
      <div class="slds-form-element__control">
        <div class="slds-checkbox">
          <input type="checkbox" name="VADRent" id="VADRent" :value="true"
            v-model="reportStore.config.rent.ranking.VADRent" />
          <label class="slds-checkbox__label" for="VADRent">
            <span class="slds-checkbox_faux"></span>
            <span class="slds-form-element__label">Include Proposed Value-add Rents</span>
          </label>
        </div>

      </div>
    </fieldset>

  </div>
</template>

<script lang="ts" setup>
const reportStore = useMyReportStore()

const updateTheme = (event: any) => {
  reportStore.config.rent.ranking.theme = event;
}


reportStore.popupHeader = 'Rent Comparables Ranking'


</script>

<style></style>