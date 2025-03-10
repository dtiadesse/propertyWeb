<script lang="ts" setup>
import type { SelectOption } from "~~/models/selectOption";
const hasError = ref(false);
const errorMsg = ref('');
const newOpportunityDlg = ref(null);
const oppsValidToSave = ref(false);
let componentHeight = 0;

const opportunityStore = useOpportunityStore();
const { getUserEmail } = useAuthStore();
const {
    oppsCreationMode,
    portfolioName,
    isPortfolio,
    opportunityType,
    oppsDataEntryMode,
    newOpportunity,
    selectedProperties
} = storeToRefs(opportunityStore);
const { toggleOppsCreationMode, toggleOppsDataEntryMode, isValidOppsData, saveOpportunityToOneCap } = opportunityStore;

function validateSelectedProperties() {
    if (selectedProperties.value.length === 0) {
        hasError.value = true;
        errorMsg.value = "Please select at least one property";
        return false;
    }
    selectedProperties.value.forEach(property => {
        if (!property.propertyType || !property.propertyType.toLowerCase().includes('multi')) {
            hasError.value = true;
            errorMsg.value = "Only multi-family properties can be used for creating opportunity.";
            return false;
        }
        if (property.profiseeMasterRecordId === '') {
            hasError.value = true;
            errorMsg.value = "Mastering pending for one or more properties and cannot be used for creating opportunity.";
            return false;
        }
    });
    return true;
}

watch(oppsCreationMode, (isVisible) => {
    if (isVisible) {
        hasError.value = false;
        errorMsg.value = "";
        newOpportunityDlg.value.showModal();
        validateSelectedProperties();
    } else {
        hasError.value = false;
        errorMsg.value = "";
        newOpportunityDlg.value.close();
    }
});

watch(newOpportunity, () => {
    oppsValidToSave.value = isValidOppsData();
}, { deep: true })

function validToShowNext() {
    if (hasError.value) {
        return false;
    }

    if (isPortfolio.value === true && portfolioName.value === "") {
        return false;
    }
    if (opportunityType.value === "") {
        return false;
    }
    return true;
}

const opportunityTypes: SelectOption[] = [
    { label: "Sales", value: "sales" },
    { label: "EDSF", value: "edsf" },
    { label: "Consulting", value: "consulting" },
    { label: "Corporate Capital Market", value: "corpcm" },
];

const saving = ref(false);

async function saveOpportunity() {
    saving.value = true;
    newOpportunity.value.userEmail = getUserEmail();
    await saveOpportunityToOneCap();
    saving.value = false;
}

</script>

<template>
    <dialog ref="newOpportunityDlg">
        <section role="dialog" tabindex="-1" aria-modal="true" aria-labelledby="modal-heading-01"
            class="slds-modal slds-fade-in-open">
            <div class="slds-modal__container">
                <button class="slds-button slds-button_icon slds-modal__close" @click="toggleOppsCreationMode()">
                    <svg class="slds-button__icon slds-button__icon_large" aria-hidden="true">
                        <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#close"></use>
                    </svg>
                    <span class="slds-assistive-text">Cancel and close</span>
                </button>
                <div class="slds-modal__header">
                    <h1 id="modal-heading-01" class="slds-modal__title slds-hyphenate" tabindex="-1">
                        Create
                        <span class="text-blue-600 animate__animated animate__zoomIn"
                            v-if="isPortfolio">Portfolio</span>
                        Opportunity In OneCap
                        <span class="text-blue-600 animate__animated animate__zoomIn" v-if="oppsDataEntryMode">
                            <span v-if="opportunityType === 'sales'">: Sales</span>
                            <span v-if="opportunityType === 'edsf'">: EDSF</span>
                            <span v-if="opportunityType === 'consulting'">: Consulting</span>
                            <span v-if="opportunityType === 'corpcm'">: Corp Capital Market</span>
                        </span>
                    </h1>
                </div>
                <div class="slds-modal__content slds-p-around_medium" id="modal-content-id-1" v-if="!oppsDataEntryMode">
                    <p v-if="hasError" class="text-red-600 mb-2">{{ errorMsg }}</p>
                    <OpportunityProperties />
                    <hr class="h-px my-4 bg-gray-400 border-0" />
                    <UiInput v-model="portfolioName" label="Portfolio Name" type="text" required id="portfolioName"
                        v-if="isPortfolio" :label-class="'font-bold'" />
                    <hr class="h-px my-4 bg-gray-400 border-0" v-if="isPortfolio" />
                    <UiRadioGroup v-model="opportunityType" label="Choose the Opportunity Type"
                        :options="opportunityTypes" required name="opportunityType" />
                </div>
                <div class="slds-modal__content slds-p-around_medium" id="modal-content-id-2" v-if="oppsDataEntryMode">
                    <Suspense>
                        <article>
                            <LazyOpportunityEDSF v-if="opportunityType === 'edsf'" />
                            <LazyOpportunityConsulting v-if="opportunityType === 'consulting'" />
                            <LazyOpportunityCorpCapMkt v-if="opportunityType === 'corpcm'" />
                            <LazyOpportunitySales v-if="opportunityType === 'sales'" />
                        </article>
                        <template #fallback>
                            <div class="slds-text-align_center">
                                <UiLoadingSpinner :page-height="500" />
                            </div>
                        </template>
                    </Suspense>
                </div>
                <div class="slds-modal__footer" v-if="!oppsDataEntryMode">
                    <button class="slds-button slds-button_brand" :disabled="!validToShowNext()"
                        @click="toggleOppsDataEntryMode()">
                        Next
                    </button>
                </div>
                <div class="slds-modal__footer" v-if="oppsDataEntryMode">
                    <button class="slds-button slds-button_brand" @click.prevent="saveOpportunity()"
                        :disabled="!oppsValidToSave || saving">
                        <span v-if="!saving">Create In OneCap</span>
                        <UiLoadingSpinner v-if="saving" />
                    </button>
                </div>
            </div>
        </section>
        <div class="slds-backdrop slds-backdrop_open" role="presentation"></div>
    </dialog>
</template>

<style lang="css" scoped></style>
