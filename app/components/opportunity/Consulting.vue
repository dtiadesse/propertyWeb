<script lang="ts" setup>
import { useOneCapOfficePicklist } from '~/composables/useOneCapOfficePicklist';
const hasError = ref(false);
const errorMsg = ref('');
const nuxtApp = useNuxtApp();
//lead offices
const { oneCapOffices, status: loStatus, error: loError } = await useOneCapOfficePicklist(nuxtApp.$pinia, 'sales')
let officeOptions: Ref<string[]> = ref(oneCapOffices);

const opportunityStore = useOpportunityStore();
const { newOpportunity, invalidCompany, invalidRefCompany, invalidBroker, oppsCreateResponse } = storeToRefs(opportunityStore);
newOpportunity.value.opportunityType = "Consulting"
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

const typeOptions: Ref<string[]> = ref(["Referral", "Split Payment", "BOV"])
</script>

<template>
    <p v-if="hasError" class="text-red-600 mb-2">{{ errorMsg }}</p>
    <div class="grid grid-cols-2 gap-3">
        <UiInput v-model="newOpportunity.opportunityName" label="Opportunity Name" type="text" required id="oppsName" />
        <UiInput v-model="newOpportunity.closeDate" label="Close Date" type="date" required id="closeDate" />
        <CompaniesAutocomplete v-model="newOpportunity.company" label="Company Name" id="oppsCompany" required
            :has-error="invalidCompany" />
        <BrokersAutocomplete v-model="newOpportunity.leadBroker" label="Lead Broker" id="oppsBroker" required
            :has-error="invalidBroker" />
        <UiInput v-model="newOpportunity.estimatedLoanAmount" label="Fee Amount" type="number" required id="amount" />
        <UiCombobox v-model="newOpportunity.consultingType" label="Type" id="consultingType" required
            :options="typeOptions" />
        <UiCombobox v-model="newOpportunity.leadOffice" label="Lead Office" id="leadOffice" required
            :options="officeOptions" dropdown-top />
        <CompaniesAutocomplete v-model="newOpportunity.referralCompany" label="Referral Company" id="oppsRefCompany"
            required dropdown-top :has-error="invalidRefCompany" />
    </div>
</template>
