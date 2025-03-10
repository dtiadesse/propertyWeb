<script lang="ts" setup>
import { useOneCapOfficePicklist } from '~/composables/useOneCapOfficePicklist';
const hasError = ref(false);
const errorMsg = ref('');
const nuxtApp = useNuxtApp();
//lead offices
const { oneCapOffices, status: loStatus, error: loError } = await useOneCapOfficePicklist(nuxtApp.$pinia, 'sales')
let officeOptions: Ref<string[]> = ref(oneCapOffices);
//deal profiles
const dealProfilesUri = "/api/onecap/picklists/deal-profiles/corpcm";
const { status: dpStatus, data: dpData, error: dpError } = await useLazyFetch(dealProfilesUri)
let dealProfileOptions: Ref<string[]> = ref([]);
watch(dpData, (dealProfileData) => {
    if (dpStatus.value === 'success') {
        dealProfileOptions.value = dealProfileData;
    }
})

const opportunityStore = useOpportunityStore();
const { newOpportunity, invalidCompany, invalidBroker, oppsCreateResponse } = storeToRefs(opportunityStore);
newOpportunity.value.opportunityType = "corpcm"
const { toggleOppsCreationMode, toggleOppsDataEntryMode } = opportunityStore

watch(oppsCreateResponse, (createResponse) => {
    if (createResponse && createResponse.hasError) {
        hasError.value = true;
        errorMsg.value = createResponse.message
    } else {
        hasError.value = false;
        errorMsg.value = "";
    }
})

</script>

<template>
    <p v-if="hasError" class="text-red-600 mb-2">{{ errorMsg }}</p>
    <div class="grid grid-cols-2 gap-3">
        <UiInput v-model="newOpportunity.opportunityName" label="Opportunity Name" type="text" required id="oppsName" />
        <UiInput v-model="newOpportunity.closeDate" label="Close Date" type="date" required id="closeDate" />
        <UiInput v-model="newOpportunity.estimatedLoanAmount" label="Amount" type="number" required id="amount" />
        <UiCombobox v-model="newOpportunity.dealProfile" label="Deal Profile" id="dealProfile" required
            :options="dealProfileOptions" />
        <UiInput v-model="newOpportunity.feeAmountPct" label="Fee Amount %" type="number" required id="feeAmtPct" />
        <BrokersAutocomplete v-model="newOpportunity.leadBroker" label="Lead Broker" id="oppsBroker" required
            dropdown-top :has-error="invalidBroker" />
        <CompaniesAutocomplete v-model="newOpportunity.company" label="Company Name" id="oppsCompany" required
            dropdown-top :has-error="invalidCompany" />
        <UiInput v-model="newOpportunity.pitchDate" label="Pitch Date" type="date" required id="pitchDate" />
        <UiCombobox v-model="newOpportunity.leadOffice" label="Lead Office" id="leadOffice" required
            :options="officeOptions" dropdown-top />
    </div>
</template>
