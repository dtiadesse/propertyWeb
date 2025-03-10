<template>
  <div class="slds-section" :class="{ 'slds-is-open': isExpanded }">
    <h3 class="slds-section__title">
      <button @click="toggle" aria-controls="expando-unique-id" aria-expanded="true"
        class="slds-button slds-section__title-action">
        <svg class="slds-section__title-action-icon slds-button__icon slds-button__icon_left" aria-hidden="true">
          <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#switch"></use>
        </svg>
        <span class="slds-truncate" title="Section Title">{{ label }}</span>
      </button>
    </h3>
    <div class="slds-section__content" id="expando-unique-id">
      <keep-alive>
        <component :is="activeComponent" />
      </keep-alive>

      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
const isExpanded = ref(true);

const { component, label } = defineProps(['component', 'label'])
const activeComponent = ref(component)
const toggle = () => {
  isExpanded.value = !isExpanded.value;
}
</script>

<style>
.slds-section__title-action:hover,
.slds-section__title-action:focus,
.slds-section__title-action:active {
  box-shadow: none;
  border-color: transparent;
}
</style>