<template>
  <div class="slds-form" style="min-height: 15rem;">
    <UiItemComboBox :label="'Theme'" :values="reportStore.themes" :edit-mode="true"
      :selected="reportStore.config.rent.pages.theme" @selected="updateTheme" />
    <fieldset class="slds-form-element slds-form-element_stacked" style="margin-top: 0.5rem;">
      <legend class="slds-form-element__legend slds-form-element__label">Options</legend>
      <div class="slds-form-element__control">
        <div class="slds-checkbox">
          <input type="checkbox" name="photos" id="showPhotos" :value="true"
            v-model="reportStore.config.rent.pages.showPhotos" />
          <label class="slds-checkbox__label" for="showPhotos">
            <span class="slds-checkbox_faux"></span>
            <span class="slds-form-element__label">Show Photos</span>
          </label>
        </div>
        <div class="slds-checkbox">
          <input type="checkbox" name="marketRentOnly" id="marketRentOnly" :value="true"
            v-model="reportStore.config.rent.pages.marketRentOnly" />
          <label class="slds-checkbox__label" for="marketRentOnly">
            <span class="slds-checkbox_faux"></span>
            <span class="slds-form-element__label">Show Market Rents Only</span>
          </label>
        </div>
      </div>
    </fieldset>
    <fieldset class="slds-form-element slds-form-element_stacked">
      <legend class="slds-form-element__legend slds-form-element__label">Options</legend>
      <div class="slds-form-element__control">
        <div class="slds-checkbox">
          <input type="checkbox" name="default" id="condensed" :value="true"
            v-model="reportStore.config.rent.pages.condensed" />
          <label class="slds-checkbox__label" for="condensed">
            <span class="slds-checkbox_faux"></span>
            <span class="slds-form-element__label">Condensed</span>
          </label>
        </div>
      </div>
    </fieldset>
  </div>
</template>

<script lang="ts" setup>
const reportStore = useMyReportStore()

const updateTheme = (event: any) => {
  reportStore.config.rent.pages.theme = event;
}


reportStore.popupHeader = 'Rent Comparables Pages'


</script>

<style></style>