<template>
  <fieldset class="slds-form-element">
    <legend class="slds-form-element__legend slds-form-element__label">Choose the Report Type</legend>
    <div class="slds-form-element__control options-list">
      <div class="slds-checkbox" style="margin-bottom: 0.5rem;">
        <input type="checkbox" name="selectall" id="checkbox-unique-id" value="checkbox-unique-id"
          v-model="selectAll" />
        <label class="slds-checkbox__label" for="checkbox-unique-id">
          <span class="slds-checkbox_faux"></span>
          <span class="slds-form-element__label">Select All</span>
        </label>
      </div>

      <div class="slds-checkbox" v-for="(ro, i) in reportStore.reportOptions">
        <input type="checkbox" v-model="optionsSelected" name="options" :id="'checkbox-unique-id-' + i" :value="ro" />
        <label class="slds-checkbox__label" :for="'checkbox-unique-id-' + i">
          <span class="slds-checkbox_faux"></span>
          <span class="slds-form-element__label">{{ ro }}</span>
        </label>
      </div>
    </div>
  </fieldset>
</template>

<script lang="ts" setup>
const reportStore = useMyReportStore()

const optionsSelected: any = ref([])

const selectAll = ref(false)

watch(() => optionsSelected.value, (v: any) => {
  reportStore.optionsSelected = optionsSelected.value.sort((a, b) => reportStore.reportOptions.indexOf(a) - reportStore.reportOptions.indexOf(b));
})

watch(() => selectAll.value, (v: any) => {
  if (v === true) {
    optionsSelected.value = [...reportStore.reportOptions]
  }
  else {
    optionsSelected.value = []
  }
})


</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}

.options-list {
  line-height: 1.5rem;
}
</style>