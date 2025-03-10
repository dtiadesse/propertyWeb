<script lang="ts" setup>
import type { ColDef } from "ag-grid-enterprise";
import { themeBalham } from 'ag-grid-community';
import { AgGridVue } from "ag-grid-vue3";
const opportunityStore = useOpportunityStore();
const { selectedProperties } = storeToRefs(opportunityStore);
const theme = themeBalham;
const defaultColDef: ColDef = {
    flex: 1,
    suppressHeaderMenuButton: true,
    suppressHeaderFilterButton: true,
};

const columnDefs = [
    { field: "id", headerName: "id", hide: true },
    {
        field: "name",
        headerName: "Name",
        flex: 1.5,
    },
    {
        field: "stdAddress1",
        headerName: "Address",
        flex: 1.5,
    },
    {
        field: "stdCity", headerName: "City"

    },
    {
        field: "stdStateCode", headerName: "State"
    },
    {
        field: "stdPostalCode",
        headerName: "PostalCode",

    },
    {
        field: "propertyType", headerName: "Type"
    },
];
</script>

<template>
    <article class="slds-card">
        <div class="font-bold">Selected Properties</div>
        <div class="slds-card__body">
            <ag-grid-vue :rowData="selectedProperties" :columnDefs="columnDefs" :defaultColDef="defaultColDef"
                :theme="theme"
                :class="{ 'h-[70px]': (selectedProperties.length === 1), 'h-[125px]': (selectedProperties.length > 1) }">
            </ag-grid-vue>
        </div>
    </article>
</template>
