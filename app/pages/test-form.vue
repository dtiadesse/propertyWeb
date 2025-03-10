<script lang="ts" setup>
import { companyOption, type CompanySelectOption } from '~~/models/companySelectOption'

const name = ref("")
const age = ref(50)
const selectedPropertyType = ref("Office")

const propertyTypes = [
    {
        label: "Multifamily",
        value: "Multifamily"
    },
    {
        label: "Land",
        value: "Land"
    },
    {
        label: "Retail",
        value: "Retail"
    },
    {
        label: "Industrial",
        value: "Industrial"
    },
    {
        label: "Office",
        value: "Office"
    }

]

const needCatering = ref(true)
const pets = ref("1");
const petOptions = [
    {
        label: 'No',
        value: "0"
    },
    {
        label: 'Yes Re',
        value: "1"
    }
]

const pTypeOptions = ['MultiFamily', 'Land', 'Retail', 'Industrial', 'Office']

const selectedCompany: Ref<CompanySelectOption> = ref(null)
</script>

<template>
    <div class="w-1/2 mx-10">
        <CompaniesAutocomplete v-model="selectedCompany" label="Select a Company" id="companies-1" required />
    </div>

    <div>Company Selected: {{ selectedCompany }}</div>
    <UiInput v-model="name" label="Your Name" type="text" required id="yourName" />
    <div>Hello, {{ name }}!</div>
    <UiInput v-model="age" label="Your Age" type="number" required id="yourAge" class="text-red-800" />
    <div>Hello, {{ age }}!</div>
    <UiSelect v-model="selectedPropertyType" label="Select an Option" id="mySelect" required :options="propertyTypes" />
    <div>You selected: {{ selectedPropertyType }}</div>
    <UiCheckbox v-model="needCatering" label="Do you need catering?" id="catering" required />
    <div>Catering needed: {{ needCatering }}</div>
    <!-- <UiRadio v-model="pets" label="Yes" value="1" name="pets" id="pets_1" />
    <UiRadio v-model="pets" label="No" value="0" name="pets" id="pets_0" /> -->
    <UiRadioGroup v-model="pets" label="Do you have pets?" :options="petOptions" required name="pets" />
    <div>Number of pets: {{ pets }}</div>
    <!-- <UiCombobox v-model="selectedPropertyType" label="Select an Option" id="myCombobox" required
        :options="pTypeOptions" /> -->

</template>