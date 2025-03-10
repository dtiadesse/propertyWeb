<template>
  <div class="slds-progress slds-progress_shade">
    <ol class="slds-progress__list">
      <li v-for="i in Array.from({ length: totalSteps }, (value, index) => index + 2)" class="slds-progress__item"
        :class="{ 'slds-is-active': i === (reportStore.step), 'slds-is-completed': i < (reportStore.step) }">
        <div class="slds-progress__marker" tabindex="0"
          :class="{ 'slds-progress__marker_icon': i < (reportStore.step) }">
          <svg v-if="i < (reportStore.step)" class="slds-icon slds-icon_xx-small" aria-hidden="true">
            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#success"></use>
          </svg>
          <span class="slds-assistive-text">Step {{ i + 1 }} </span>
        </div>
      </li>
    </ol>
    <div class="slds-progress-bar slds-progress-bar_x-small" aria-valuemin="0" aria-valuemax="100" aria-valuenow="25"
      aria-label="" role="progressbar">
      <span class="slds-progress-bar__value" :style="'width:' + progress + '%'">
        <span class="slds-assistive-text">Progress: {{ progress }}%</span>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>

const reportStore = useMyReportStore()

const totalSteps = computed(() => reportStore.optionsSelected.length + reportStore.optionsCompleted.length)

const progress = computed(() => {
  const total = reportStore.optionsSelected.length + reportStore.optionsCompleted.length - 1;
  const progress = total > 0 ? ((reportStore.optionsCompleted.length / total) * 100) : 0;
  return progress;
})

</script>

<style scoped>
.slds-progress {
  max-width: 65%;
}
</style>