<script lang="ts" setup>
const personalListDlg = ref(null);
const personalListStore = usePersonalListStore();
const { modalVisible, selectedProperty, isDirectFromRowMenu } = storeToRefs(personalListStore);
const { closePersonalListDlg, clearSelectedProperty } = personalListStore;
const propertyAddress = ref("");

watch(modalVisible, (isVisible) => {
    if (isVisible) {
        if (isDirectFromRowMenu && selectedProperty.value) {
            propertyAddress.value = `${selectedProperty.value.stdAddress1}, ${selectedProperty.value.stdCity}
            ${selectedProperty.value.stdStateCode}, ${selectedProperty.value.stdPostalCode}`;
        } else {
            propertyAddress.value = "";
        }
        personalListDlg.value.showModal();
    } else {
        clearSelectedProperty();
        personalListDlg.value.close();
    }
})

</script>

<template>
    <dialog ref="personalListDlg">
        <section role="dialog" tabindex="-1" aria-modal="true" aria-labelledby="modal-heading-01"
            class="slds-modal slds-fade-in-open">
            <div class="slds-modal__container">
                <button class="slds-button slds-button_icon slds-modal__close" @click="closePersonalListDlg()">
                    <svg class="slds-button__icon slds-button__icon_large" aria-hidden="true">
                        <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#close"></use>
                    </svg>
                    <span class="slds-assistive-text">Cancel and close</span>
                </button>
                <div class="slds-modal__header">
                    <h1 id="modal-heading-01" class="slds-modal__title slds-hyphenate" tabindex="-1">
                        Add Property to My Personal List
                    </h1>
                    <p v-if="isDirectFromRowMenu" class="text-sm mt-2 text-blue-500">{{ propertyAddress }}</p>
                </div>
                <div class="slds-modal__content slds-p-around_medium" id="modal-content-id-1">
                    <p>Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat
                        veniam incididunt duis in sint irure nisi. Mollit officia cillum Lorem ullamco minim nostrud
                        elit officia tempor esse quis. Cillum sunt ad dolore quis
                        aute consequat ipsum magna exercitation reprehenderit magna. Tempor cupidatat consequat elit
                        dolor adipisicing.</p>
                    <p>Dolor eiusmod sunt ex incididunt cillum quis nostrud velit duis sit officia. Lorem aliqua enim
                        laboris do dolor eiusmod officia. Mollit incididunt nisi consectetur esse laborum eiusmod
                        pariatur proident. Eiusmod et adipisicing culpa deserunt nostrud
                        ad veniam nulla aute est. Labore esse esse cupidatat amet velit id elit consequat minim ullamco
                        mollit enim excepteur ea.</p>
                </div>
                <div class="slds-modal__footer">
                    <button class="slds-button slds-button_brand">Add</button>
                </div>
            </div>
        </section>
        <div class="slds-backdrop slds-backdrop_open" role="presentation"></div>
    </dialog>
</template>

<style lang="css" scoped></style>
