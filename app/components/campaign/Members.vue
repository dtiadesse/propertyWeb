<script lang="ts" setup>
import type { ColDef, GridApi, GridReadyEvent } from "ag-grid-enterprise";
import { AgGridVue } from "ag-grid-vue3";
const contactListStore = useContactListStore();
const { selectedContacts } = storeToRefs(contactListStore);
const gridApi = shallowRef<GridApi | null>(null);
const defaultColDef: ColDef = {
    flex: 1,
    suppressHeaderMenuButton: true,
    suppressHeaderFilterButton: true,
    cellStyle: { fontSize: '12px' },
    headerClass: 'ag-grid-sidebar-header'
};

const columnDefs = [
    { field: "id", headerName: "id", hide: true },
    {
        field: "name",
        headerName: "Name",
        flex: 0.8
    },
    {
        field: "phoneNumber", headerName: "Phone", flex: 0.8

    },
    {
        field: "email", headerName: "Email", flex: 0.8,
        cellRenderer: (params: any) => {
            return `<a href="mailto:${params.data.email}" title="${params.data.email}">
                ${params.data.email}
                </a>`;
        }

    },
    {
        field: "location", headerName: "Location"
    },
];

const onGridReady = (params: GridReadyEvent) => {
    gridApi.value = params.api;
    // params.api.setGridOption("rowHeight", 28);
    // params.api.setGridOption("headerHeight", 28);
}
</script>

<template>
    <article class="mx-2 flex flex-col h-[35vh]">
        <div class="font-semibold mb-1 flex flex-row">
            <span class="text-blue-400">
                <span class="slds-icon_container slds-current-color" title="Related Contacts">
                    <svg class="slds-icon" aria-hidden="true">
                        <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#opportunity_contact_role"></use>
                    </svg>
                    <span class="slds-assistive-text">Selected Contacts</span>
                </span>
            </span>
            <span class="mt-1">Selected Contacts ({{ selectedContacts?.length }})</span>
        </div>
        <ag-grid-vue :rowData="selectedContacts" :columnDefs="columnDefs" :defaultColDef="defaultColDef"
            @grid-ready="onGridReady" :rowHeight="28" :headerHeight="28" style="width: 100%; height: 100%;">
        </ag-grid-vue>
    </article>
</template>
