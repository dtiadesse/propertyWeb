<template>
  <UiItemModal :is-visible="globalState.modalName === 'Report'" :size="'medium'" @close="reportStore.handleCloseModal">
    <template #header>
      {{ reportStore.popupHeader }}
    </template>
    <div class="container">
      <PropertyItemReportOptions v-if="reportStore.step === 1" />
      <div v-else>
        <PropertyItemReportRentPages v-if="reportStore.optionsSelected.includes('Rent Comparables Pages')" />
        <PropertyItemReportRentRanking v-else-if="reportStore.optionsSelected.includes('Rent Comparables Ranking')" />
        <PropertyItemReportRentSummary v-else-if="reportStore.optionsSelected.includes('Rent Comparables Summary')" />
        <PropertyItemReportSalePages v-else-if="reportStore.optionsSelected.includes('Sale Comparables Pages')" />
        <PropertyItemReportSaleSummary v-else-if="reportStore.optionsSelected.includes('Sale Comparables Summary')" />
      </div>

    </div>

    <template #footer>
      <div style="display: flex;justify-content: flex-end;">
        <!-- <UiItemInlineLoader /> -->
        <button v-if="reportStore.step === 1" class="slds-button slds-button_neutral"
          @click="reportStore.handleCloseModal" aria-label="Cancel and close">Cancel</button>
        <button v-if="reportStore.step > 1" class="slds-button slds-button_neutral"
          @click="reportStore.handleBackAction" aria-label="Cancel and close">Back</button>

        <PropertyItemReportStepProgress
          v-if="reportStore.step > 1 && (reportStore.optionsSelected.length + reportStore.optionsCompleted.length) > 1" />
        <button
          v-if="(reportStore.optionsSelected.length + reportStore.optionsCompleted.length) > 0 && (reportStore.step - 1) < reportStore.optionsSelected.length + reportStore.optionsCompleted.length"
          class="slds-button slds-button_brand" @click="reportStore.handleNextStep">Next</button>
        <button
          v-else-if="reportStore.step > 1 && (reportStore.step - 1) >= reportStore.optionsSelected.length + reportStore.optionsCompleted.length"
          class="slds-button slds-button_brand" @click="reportStore.generateReport(propertyStore.property.id)">
          <span v-if="!globalState.serverAction">Generate PDF</span>
          <span v-else>
            <UiLoadingSpinner />
          </span>
        </button>
      </div>
    </template>
  </UiItemModal>
</template>

<script lang="ts" setup>
import { UiItemInlineLoader, UiItemModal } from '#components';

const reportStore = useMyReportStore()
const globalState = useMyGlobalStateStore()
const propertyStore = useMyPropertyStore()
reportStore.popupHeader = 'Report Generator';
</script>


<style scoped>
.container {
  width: 35%;
  margin: 0 auto;
}
</style>