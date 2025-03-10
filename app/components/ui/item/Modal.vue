<template>
  <Transition>
    <section v-if="isVisible" role="dialog" tabindex="-1" aria-modal="true" aria-labelledby="modal-heading-01"
      class="slds-modal slds-fade-in-open">
      <div class="slds-modal__container" :class="size">

        <div class="slds-modal__header">
          <h1 id="modal-heading-01" class="slds-modal__title slds-hyphenate" tabindex="-1">
            <slot name="header" />

            <button class="slds-button slds-button_icon slds-modal__close" @click="$emit('close')">
              <svg class="slds-button__icon slds-button__icon_large" aria-hidden="true">
                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#close"></use>
              </svg>
              <span class="slds-assistive-text">Cancel and close</span>
            </button>
          </h1>
        </div>
        <div class="slds-modal__content slds-p-around_medium" id="modal-content-id-1">

          <slot />

        </div>
        <div class="slds-modal__footer">
          <slot name="footer" />
        </div>
      </div>
    </section>
  </Transition>
  <Transition>
    <div v-if="isVisible" class="slds-backdrop slds-backdrop_open" role="presentation"></div>
  </Transition>
</template>

<script lang="ts" setup>
const { isVisible, size } = defineProps(['isVisible', 'size'])

defineEmits(['close'])

const fadeIn = ref(false);

// watch(() => isVisible, () => {
//   if (isVisible) {
//     setTimeout(() => { fadeIn.value = !fadeIn.value }, 80);
//   }
//   else {
//     fadeIn.value = !fadeIn.value
//   }

// });

</script>

<style scoped>
.large {
  min-width: 60rem;
}

.medium {
  min-width: 45rem;
}

.small {
  width: 30rem;
}

.slds-backdrop.slds-backdrop_open {
  z-index: 15000;
}

.slds-fade-in-open {
  z-index: 16000;
}

.slds-modal__container {
  justify-content: flex-start;
  /* padding-top: 1rem; */
}

.is-iframe .slds-modal__container {
  padding-top: 0.25rem;
}

.is-iframe .slds-modal__content {
  max-height: 25rem;
}

.v-enter-from {
  opacity: 0;
  /* translate: -100px 0; */
}

.v-enter-to {
  opacity: 1;
  /* translate: 0 0; */
}

.v-leave-from {
  opacity: 1;
  /* translate: 0 0; */
}

.v-leave-to {
  opacity: 0;
  /* translate: 100px 0; */
}

.slds-modal__title.slds-hyphenate {
  position: relative;
}

.slds-modal__header .slds-modal__close {
  border-color: #c9c9c9;
  border-width: 1px;
  top: 0rem;
  right: 0rem;
}
</style>