<template>
  <span class="slds-icon_container slds-icon-utility-error error-popup" title="Invalid form field values"
    aria-label="Invalid form field values" @mouseover="toggleTooltip(true)" @mouseleave="">
    <div :class="{ 'show': showTooltip }" class="slds-popover slds-popover_tooltip slds-nubbin_bottom-left"
      role="tooltip" id="help">
      <div class="slds-popover__body">
        <h2 class="heading">

          <span class="slds-icon_container slds-icon-utility-error">
            <svg class="slds-icon slds-icon_x-small" aria-hidden="true">
              <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#error"></use>
            </svg>
          </span>
          Validation error
          <span class="slds-icon_container slds-icon__svg--default close-icon" @click.stop="toggleTooltip(false)">
            <svg class="slds-icon slds-icon-text-default test-class" aria-hidden="true">
              <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#close">
              </use>
            </svg>
          </span>
        </h2>
        <div class="message">{{ message }}</div>
      </div>
    </div>
    <svg class="slds-icon slds-icon_x-small error-icon" aria-hidden="true">
      <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#error"></use>
    </svg>
  </span>
</template>

<script lang="ts" setup>
const showTooltip = ref(false)

const { message = "" } = defineProps(['message'])

const toggleTooltip = (flag: boolean) => {
  showTooltip.value = flag
}

</script>

<style scoped>
.slds-icon-utility-error {
  margin: 0 0.65rem;
}

.error-popup {
  position: relative;
  margin: 0 0.65rem;
}

.error-icon {
  fill: #ba0517;
  width: 1.5rem;
  height: 1.5rem;
}

.slds-popover {
  position: absolute;
  bottom: 3rem;
  left: -6.5rem;
  min-width: 15rem;
  text-align: left;
  background-color: white;
  visibility: hidden;
}

.slds-popover.show {
  visibility: visible;
}

.slds-popover__body {
  padding: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.slds-popover::before,
.slds-popover::after {
  left: 50%;
}

.heading {
  padding: 0.75rem;
  background-color: #ba0517;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  border-radius: 0.25rem;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.close-icon {
  position: absolute;
  right: 0.75rem;
  top: 0.75rem;
  cursor: pointer;
}

.close-icon svg {
  width: 1rem;
  height: 1rem;
  fill: white;
}

.message {
  padding: 0.7rem;
  line-height: initial;
  color: black;
  font-size: 14px;
}

.view-duplicates-link {
  display: inline-block;
  padding: 0.75rem;
  border-top: 1px solid #999999;
  width: 100%;

}
</style>

<!-- {
    "url": "/api/property",
    "statusCode": 400,
    "statusMessage": "Bad Request",
    "message": "internal server error",
    "stack": "<pre></pre>",
    "data": [
        {
            "message": "Units: value outside of valid range on numeric field: 20005.0",
            "errorCode": "NUMBER_OUTSIDE_VALID_RANGE",
            "fields": [
                "svspackage__Units__c"
            ]
        }
    ]
} -->