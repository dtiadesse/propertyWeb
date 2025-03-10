import type { CreateResponse } from "~~/models/createResponse.model";
import type { Opportunity } from "~~/models/opportunity.model";
import type { OpportunityData } from "~~/models/opportunityData.model";
import type { PropertySummary } from "~~/models/propertySummary.model";

export const useOpportunityStore = defineStore('oneCapOpportunityStore', () => {
    const propertySelectionMode = ref(false);
    const oppsCreationMode = ref(false);
    const oppsDataEntryMode = ref(false);
    const selectedProperties = ref<PropertySummary[]>([]);
    const portfolioName = ref('');
    const opportunityType = ref('');
    const newOpportunity = ref<Opportunity>({} as Opportunity);
    const oppsCreateResponse = ref<CreateResponse>();
    const toastMessage = ref('')

    function isValidOppsData() {
        const opportunity = newOpportunity.value;
        if (!opportunity.opportunityType || opportunity.opportunityType?.trim() === '')
            return false;
        switch (opportunity.opportunityType.toLowerCase()) {
            case "sales":
            case "corpcm":
                if (opportunity.opportunityType && opportunity.opportunityType?.trim() !== ''
                    && opportunity.opportunityName && opportunity.opportunityName.trim() !== ''
                    && opportunity.dealProfile && opportunity.dealProfile.trim() !== ''
                    && opportunity.estimatedLoanAmount > 0
                    && opportunity.feeAmountPct && opportunity.feeAmountPct > 0 && opportunity.feeAmountPct < 100
                    && opportunity.company && opportunity.company.id.trim() !== 'searching'
                    && opportunity.leadBroker && opportunity.leadBroker.id.trim() !== 'searching'
                    && opportunity.closeDate && opportunity.closeDate.trim() !== ''
                    && opportunity.pitchDate && opportunity.pitchDate.trim() !== ''
                    && opportunity.leadOffice && opportunity.leadOffice.trim() !== '') {
                    return true;
                } else {
                    return false;
                }
            case "consulting":
                if (opportunity.opportunityType && opportunity.opportunityType?.trim() !== ''
                    && opportunity.opportunityName && opportunity.opportunityName.trim() !== ''
                    && opportunity.estimatedLoanAmount > 0
                    && opportunity.company && opportunity.company.id.trim() !== 'searching'
                    && opportunity.leadBroker && opportunity.leadBroker.id.trim() !== 'searching'
                    && opportunity.closeDate && opportunity.closeDate.trim() !== ''
                    && opportunity.leadOffice && opportunity.leadOffice.trim() !== ''
                    && opportunity.consultingType && opportunity.consultingType.trim() !== ''
                    && opportunity.referralCompany && opportunity.referralCompany.id.trim() !== 'searching'
                ) {
                    return true;
                } else {
                    return false;
                }
            case "edsf":
                if (opportunity.opportunityType && opportunity.opportunityType?.trim() !== ''
                    && opportunity.opportunityName && opportunity.opportunityName.trim() !== ''
                    && opportunity.dealProfile && opportunity.dealProfile.trim() !== ''
                    && opportunity.estimatedLoanAmount > 0
                    && opportunity.feeAmountPct && opportunity.feeAmountPct > 0 && opportunity.feeAmountPct < 100
                    && opportunity.company && opportunity.company.id.trim() !== 'searching'
                    && opportunity.leadBroker && opportunity.leadBroker.id.trim() !== 'searching'
                    && opportunity.closeDate && opportunity.closeDate.trim() !== ''
                    && opportunity.sideRepresented && opportunity.sideRepresented.trim() !== ''
                    && opportunity.category && opportunity.category.trim() !== ''
                    && opportunity.subcategory && opportunity.subcategory.trim() !== ''
                    && opportunity.leadOffice && opportunity.leadOffice.trim() !== '') {
                    return true;
                } else {
                    return false;
                }
        }

    }

    const isPortfolio = computed(() => selectedProperties.value.length > 1);
    const invalidCompany = computed(() => {
        return newOpportunity.value.company && newOpportunity.value.company.id === "searching";
    })
    const invalidRefCompany = computed(() => {
        return newOpportunity.value.referralCompany && newOpportunity.value.referralCompany.id === "searching";
    })
    const invalidBroker = computed(() => {
        return newOpportunity.value.leadBroker && newOpportunity.value.leadBroker.id === "searching";
    })

    function togglePropertySelectionMode(): void {
        propertySelectionMode.value = !propertySelectionMode.value;
    }

    function toggleOppsCreationMode(): void {
        portfolioName.value = '';
        selectedProperties.value = [];
        opportunityType.value = '';
        oppsDataEntryMode.value = false;
        oppsCreationMode.value = !oppsCreationMode.value;
    }

    function toggleOppsDataEntryMode(): void {
        newOpportunity.value = <Opportunity>{};
        oppsDataEntryMode.value = !oppsDataEntryMode.value;
    }

    async function saveOpportunityToOneCap() {
        oppsCreateResponse.value = null;
        const opportunity = newOpportunity.value;
        opportunity.isPortfolio = isPortfolio.value;
        const oppsData: OpportunityData = {
            opportunity: newOpportunity.value,
            properties: selectedProperties.value,
            portfolioName: portfolioName.value
        }
        oppsCreateResponse.value = await $fetch('/api/onecap/opportunity', {
            method: 'POST',
            body: JSON.stringify(oppsData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (oppsCreateResponse.value.message === 'Opportunity created successfully') {
            toggleOppsCreationMode();
            togglePropertySelectionMode();
            alert(oppsCreateResponse.value.message);
        }
    }

    return {
        propertySelectionMode,
        togglePropertySelectionMode,
        oppsCreationMode,
        toggleOppsCreationMode,
        selectedProperties,
        portfolioName,
        isPortfolio,
        opportunityType,
        newOpportunity,
        toggleOppsDataEntryMode,
        oppsDataEntryMode,
        isValidOppsData,
        invalidCompany,
        invalidBroker,
        saveOpportunityToOneCap,
        oppsCreateResponse,
        invalidRefCompany
    }
})