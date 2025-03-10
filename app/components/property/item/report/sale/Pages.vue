<template>
  <div class="slds-form" style="min-height: 11rem;">
    <UiItemComboBox :label="'Theme'" :values="reportStore.themes" :edit-mode="true"
      :selected="reportStore.config.sale.pages.theme" @selected="updateTheme" />
    <fieldset class="slds-form-element slds-form-element_stacked" style="margin-top: 0.5rem;">
      <legend class="slds-form-element__legend slds-form-element__label">Options</legend>
      <div class="slds-form-element__control">
        <div class="slds-checkbox">
          <input type="checkbox" name="showPhotos" id="showPhotos" :value="true"
            v-model="reportStore.config.sale.pages.showPhotos" />
          <label class="slds-checkbox__label" for="showPhotos">
            <span class="slds-checkbox_faux"></span>
            <span class="slds-form-element__label">Show Photos</span>
          </label>
        </div>

      </div>
    </fieldset>

  </div>
</template>

<script lang="ts" setup>
const reportStore = useMyReportStore()

const updateTheme = (event: any) => {
  reportStore.config.sale.pages.theme = event;
}

reportStore.popupHeader = 'Sale Comparables Pages'


</script>

<style></style>