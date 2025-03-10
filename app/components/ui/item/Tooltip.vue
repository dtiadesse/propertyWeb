<template>
  <div style="position:relative; display: inline-block;">
    <a href="#" aria-describedby="help">
      <span class="slds-icon_container slds-icon-utility-info">
        <svg class="slds-icon slds-icon slds-icon_xx-small slds-icon-text-default" aria-hidden="true">
          <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#info"></use>
        </svg>
        <span class="slds-assistive-text">Click here to learn more</span>
      </span>
    </a>
    <div v-if="false" class="slds-popover slds-popover_tooltip slds-nubbin_bottom-left" role="tooltip" id="help"
      style="position:absolute;top:-4px;left:15px">
      <div class="slds-popover__body">Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt
        aute id consequat veniam incididunt duis in sint irure nisi.
        <div class="slds-m-top_x-small" aria-hidden="true">Click
          <span class="slds-icon_container slds-icon-utility-info" title="Help">
            <svg class="slds-icon slds-icon slds-icon_xx-small" aria-hidden="true">
              <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#info"></use>
            </svg>
            <span class="slds-assistive-text">Help</span>
          </span> to learn more.
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style></style>