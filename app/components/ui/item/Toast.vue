<template>
  <div class="slds-notify slds-notify_toast" role="status"
    :class="{ 'slds-theme_success': item.type === 'success', 'slds-theme_error': item.type === 'error', 'slds-theme_warning': item.type === 'warning', 'slds-theme_info': item.type === 'info' }">
    <span class="slds-assistive-text">{{ item.type }}</span>
    <span
      :class="{ 'slds-icon-utility-success': item.type === 'success', 'slds-icon-utility-error': item.type === 'error', 'slds-icon-utility-info': item.type === 'info', 'slds-icon-utility-warning': item.type === 'warning' }"
      class="slds-icon_container slds-m-right_small slds-no-flex slds-align-top"
      title="Description of icon when needed">
      <svg class="slds-icon slds-icon_small" aria-hidden="true">
        <use v-if="item.type === 'success'" xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#success"></use>
        <use v-if="item.type === 'error'" xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#error"></use>
        <use v-if="item.type === 'warning'" xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#warning"></use>
        <use v-if="item.type === 'info'" xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#info"></use>
      </svg>
    </span>
    <div class="slds-notify__content">
      <h2 class="slds-text-heading_small" v-html="item.message" @click.prevent="navigate"></h2>
    </div>
    <div class="slds-notify__close" @click="removeItem">
      <button class="slds-button slds-button_icon slds-button_icon-inverse" title="Close">
        <svg class="slds-button__icon slds-button__icon_large" aria-hidden="true">
          <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#close"></use>
        </svg>
        <span class="slds-assistive-text">Close</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { item } = defineProps(['item']);
const toastStore = useToastStore();

const removeItem = () => {
  toastStore.removeToast(item);
}

const navigate = (event: any) => {
  const target = event.target;
  // Check if the clicked element is an anchor tag
  if (target.tagName === 'A') {
    event.preventDefault(); // Prevent default browser navigation
    const href = target.getAttribute('href');
    if (href) {
      removeItem()
      // Use Nuxt's router for navigation
      navigateTo(href);
    }
  }
}

onMounted(() => {
  setTimeout(() => {
    removeItem();
  }, 5500);
})

</script>

<style></style>