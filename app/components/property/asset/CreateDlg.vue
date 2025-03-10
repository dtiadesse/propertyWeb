<script lang="ts" setup>
import GoogleAddress from './GoogleAddress.vue';

const hasError = ref(false);
const errorMsg = ref('');
const createPropertyDlg = ref(null);
const newPropertyStore = useNewPropertyStore();

const { createNewPropertyMode } = storeToRefs(newPropertyStore);

const { toggleCreateNewPropertyMode } = newPropertyStore

watch(createNewPropertyMode, (isVisible) => {
    if (isVisible) {
        hasError.value = false;
        errorMsg.value = "";
        createPropertyDlg.value.showModal();

    } else {
        hasError.value = false;
        errorMsg.value = "";
        createPropertyDlg.value.close();
    }
});
</script>

<template>
    <dialog ref="createPropertyDlg">
        <section role="dialog" tabindex="-1" aria-modal="true" aria-labelledby="modal-heading-01"
            class="slds-modal slds-fade-in-open" style="min-height: 500px;">
            <div class="slds-modal__container">
                <button class="slds-button slds-button_icon slds-modal__close" @click="toggleCreateNewPropertyMode()">
                    <svg class="slds-button__icon slds-button__icon_large" aria-hidden="true">
                        <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#close"></use>
                    </svg>
                    <span class="slds-assistive-text">Cancel and close</span>
                </button>
                <div class="slds-modal__header">
                    <h1 id="modal-heading-01" class="slds-modal__title slds-hyphenate" tabindex="-1">
                        Create Property In Property+
                    </h1>
                    <p v-if="hasError" class="text-red-600 mb-2">{{ errorMsg }}</p>
                </div>
                <div class="min-h-[50vh] slds-modal__content slds-p-around_medium" id="modal-content-id-1">
                    <GoogleAddress />
                </div>
            </div>
        </section>
    </dialog>
</template>
