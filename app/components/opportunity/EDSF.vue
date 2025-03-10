<script lang="ts" setup>
import { useOneCapCategoryPicklist } from '~/composables/useOneCapCategoryPicklist';
import { useOneCapOfficePicklist } from '~/composables/useOneCapOfficePicklist';
const nuxtApp = useNuxtApp();
const hasError = ref(false);
const errorMsg = ref('');
//lead offices
const { oneCapOffices, status: loStatus, error: loError } = await useOneCapOfficePicklist(nuxtApp.$pinia, 'edsf')
let officeOptions: Ref<string[]> = ref(oneCapOffices);
//categories
const { oneCapCategories, status: cStatus, error: cError } = await useOneCapCategoryPicklist(nuxtApp.$pinia, 'edsf')
let ocCategories: Ref<string[]> = ref(oneCapCategories);
//deal profiles
const dealProfilesUri = "/api/onecap/picklists/deal-profiles/edsf";
const { status: dpStatus, data: dpData, error: dpError } = await useLazyFetch(dealProfilesUri)
let dealProfileOptions: Ref<string[]> = ref([]);
watch(dpData, (dealProfileData) => {
  if (dpStatus.value === 'success') {
    dealProfileOptions.value = dealProfileData;
  }
})

const opportunityStore = useOpportunityStore();
const { newOpportunity, invalidCompany, invalidBroker, oppsCreateResponse } = storeToRefs(opportunityStore);
newOpportunity.value.opportunityType = "edsf"
const { toggleOppsCreationMode, toggleOppsDataEntryMode } = opportunityStore

let subcategoryOptions = ref([])
watch(newOpportunity, async (opportunityData) => {
  if (newOpportunity.value.category !== '') {
    const { oneCapSubcategories, status, error } =
      await useOneCapSubcategoryPicklist(nuxtApp.$pinia, 'edsf', newOpportunity.value.category)
    if (status === 'success') {
      subcategoryOptions.value = oneCapSubcategories;
    } else {
      console.error(error);
    }
  }
}, { deep: true })

watch(oppsCreateResponse, (createResponse) => {
  if (createResponse && createResponse.hasError) {
    hasError.value = true;
    errorMsg.value = createResponse.message
  } else {
    hasError.value = false;
    errorMsg.value = "";
  }
})

const sideRepOptions = ['Borrower', 'Lender']
</script>

<template>
  <p v-if="hasError" class="text-red-600 mb-2">{{ errorMsg }}</p>
  <div class="grid grid-cols-2 gap-3">
    <UiInput v-model="newOpportunity.opportunityName" label="Opportunity Name" type="text" required id="oppsName" />
    <UiCombobox v-model="newOpportunity.dealProfile" label="Deal Profile" id="dealProfile" required
      :options="dealProfileOptions" />
    <UiInput v-model="newOpportunity.estimatedLoanAmount" label="Estimated Loan Amount" type="number" required
      id="amount" />
    <UiCombobox v-model="newOpportunity.category" label="Category" id="category" required :options="ocCategories" />
    <UiInput v-model="newOpportunity.feeAmountPct" label="Fee Amount %" type="number" required id="feeAmtPct" />
    <UiCombobox v-model="newOpportunity.subcategory" label="Sub Category" id="subcategory" required
      :options="subcategoryOptions" :disabled="newOpportunity.category === ''" />
    <CompaniesAutocomplete v-model="newOpportunity.company" label="Company Name" id="oppsCompany" required dropdown-top
      :has-error="invalidCompany" />
    <UiCombobox v-model="newOpportunity.sideRepresented" label="Side Represented" id="sideRepresented" required
      :options="sideRepOptions" />
    <BrokersAutocomplete v-model="newOpportunity.leadBroker" label="Lead Broker" id="oppsBroker" required dropdown-top
      :has-error="invalidBroker" />
    <UiInput v-model="newOpportunity.closeDate" label="Close Date" type="date" required id="closeDate" />
    <UiInput v-model="newOpportunity.stabilizeLoanAmount" label="Stabilize Loan Amount" type="number"
      id="stabilizeLoanAmount" />
    <UiInput v-model="newOpportunity.stabilizeNOI" label="Stabilize NOI" type="number" id="stabilizeNOI" />
    <UiCombobox v-model="newOpportunity.leadOffice" label="Lead Office" id="leadOffice" required
      :options="officeOptions" dropdown-top />
  </div>
</template>
