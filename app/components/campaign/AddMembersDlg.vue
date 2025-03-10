<script lang="ts" setup>
import type { CreateResponse } from '~~/models/createResponse.model';

const hasError = ref(false);
const errorMsg = ref('');
const addCampaignMembersDlg = ref(null);
const validContacts = ref(false);

const contactListStore = useContactListStore();
const campaignStore = useCampaignStore();
const { selectedContacts } = storeToRefs(contactListStore);
const { addCampaignMbrsMode, campaignSelectionMode, selectedCampaign, mbrsCreateResponse } = storeToRefs(campaignStore);
const { toggleCampaignMode, toggleCampaignSelectionMode, addCampaignMembers } = campaignStore;

function validateSelectedContacts() {
    if (selectedContacts.value.length === 0) {
        validContacts.value = false;
        hasError.value = true;
        errorMsg.value = "Please select at least one contact";
        return false;
    }
    validContacts.value = true;
    return true;
}

watch(addCampaignMbrsMode, (isVisible) => {
    if (isVisible) {
        hasError.value = false;
        errorMsg.value = "";
        addCampaignMembersDlg.value.showModal();
        validateSelectedContacts();
    } else {
        hasError.value = false;
        errorMsg.value = "";
        addCampaignMembersDlg.value.close();
    }
});

const saving = ref(false);

async function saveCampaignMembers() {
    saving.value = true;
    const contactIds = selectedContacts.value.map(contact => contact.id);
    await addCampaignMembers(contactIds);
    if (mbrsCreateResponse.value.hasError) {
        errorMsg.value = mbrsCreateResponse.value.message;
        hasError.value = true;
    }
    saving.value = false;
}

</script>

<template>
    <dialog ref="addCampaignMembersDlg">
        <section role="dialog" tabindex="-1" aria-modal="true" aria-labelledby="modal-heading-01"
            class="slds-modal slds-fade-in-open">
            <div class="slds-modal__container">
                <button class="slds-button slds-button_icon slds-modal__close" @click="toggleCampaignMode()">
                    <svg class="slds-button__icon slds-button__icon_large" aria-hidden="true">
                        <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#close"></use>
                    </svg>
                    <span class="slds-assistive-text">Cancel and close</span>
                </button>
                <div class="slds-modal__header">
                    <h1 id="modal-heading-01" class="slds-modal__title slds-hyphenate" tabindex="-1">
                        Add Contacts to OneCap Campaign
                    </h1>
                    <p v-if="hasError" class="text-red-600 mb-2">{{ errorMsg }}</p>
                </div>
                
                <div class="slds-modal__content slds-p-around_medium" id="modal-content-id-1"
                    v-if="!campaignSelectionMode">

                    <CampaignMembers />
                </div>
                <div class="slds-modal__content slds-p-around_medium" id="modal-content-id-2"
                    v-if="campaignSelectionMode">
                    <Suspense>
                        <article>
                            <LazyCampaignList />
                        </article>
                        <template #fallback>
                            <div class="slds-text-align_center">
                                <UiLoadingSpinner :page-height="500" />
                            </div>
                        </template>
                    </Suspense>
                </div>
                <div class="slds-modal__footer" v-if="!campaignSelectionMode">
                    <button class="slds-button slds-button_brand" :disabled="!validContacts"
                        @click="toggleCampaignSelectionMode()">
                        Next
                    </button>
                </div>
                <div class="slds-modal__footer" v-if="campaignSelectionMode">
                    <button class="slds-button slds-button_brand" @click.prevent="saveCampaignMembers()"
                        :disabled="!selectedCampaign || saving">
                        <span v-if="!saving">Add To Selected Campaign</span>
                        <UiLoadingSpinner v-if="saving" />
                    </button>
                </div>
            </div>
        </section>
        <div class="slds-backdrop slds-backdrop_open" role="presentation"></div>
    </dialog>
</template>

<style lang="css" scoped></style>
