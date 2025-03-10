<script lang="ts" setup>
import type { ColDef, GridApi, GridReadyEvent } from "ag-grid-enterprise";
import { AgGridVue } from "ag-grid-vue3";
const contactListStore = useContactListStore();
const { relatedProperties, isLoading } = storeToRefs(contactListStore);
const gridApi = shallowRef<GridApi | null>(null);
const defaultColDef: ColDef = {
    flex: 1,
    suppressHeaderMenuButton: true,
    suppressHeaderFilterButton: true,
    cellStyle: { fontSize: '12px' },
    headerClass: 'ag-grid-sidebar-header'
};

const columnDefs = [
    { field: "propertyId", headerName: "id", hide: true },
    {
        field: "propertyName",
        headerName: "Name",
        flex: 0.5,
        cellRenderer: (params: any) => {
            return `<a href="/property/${params.data.propertyId}">${params.value}</a>`;
        },

    },
    {
        field: "role", headerName: "Role", flex: 0.3

    },
    {
        field: "stdFullAddress", headerName: "Address"
    },
];

const onGridReady = (params: GridReadyEvent) => {
    gridApi.value = params.api;
    // params.api.setGridOption("rowHeight", 28);
    // params.api.setGridOption("headerHeight", 28);
}

const onFilterTextChanged = (event: any) => {
    gridApi.value.setGridOption(
        "quickFilterText",
        event.target.value.trim()
    );
}
</script>

<template>
    <article class="mx-2 mt-3 min-h-[35vh] flex flex-col">
        <div class="font-semibold mb-3 flex flex-row">
            <span class="text-blue-400">
                <span class="slds-icon_container slds-current-color" title="Related Properties">
                    <svg class="slds-icon" aria-hidden="true">
                        <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#location"></use>
                    </svg>
                    <span class="slds-assistive-text">Related Properties</span>
                </span>
            </span>
            <span class="mt-1">Related Properties ({{ relatedProperties.length }})</span>
            <div class="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_left slds-global-search__form-element
            ml-16" role="none" v-if="relatedProperties?.length > 4">
                <span class="slds-icon_container slds-icon-utility-search slds-input__icon slds-input__icon_left">
                    <svg class="slds-icon slds-icon slds-icon_xx-small slds-icon-text-default" aria-hidden="true">
                        <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#search"></use>
                    </svg>
                </span>
                <input type="text" class="slds-input slds-combobox__input text-xs p-1"
                    id="all-properties-filter-text-box" aria-autocomplete="list" aria-controls="search-listbox-id-1"
                    aria-expanded="false" aria-haspopup="listbox" autocomplete="off" role="combobox"
                    placeholder="Search properties..." @input="onFilterTextChanged($event)">
            </div>
        </div>
        <ag-grid-vue :rowData="relatedProperties" :columnDefs="columnDefs" :defaultColDef="defaultColDef"
            @grid-ready="onGridReady" :rowHeight="28" :headerHeight="28" style="width: 100%; height: 100%;"
            :loading="isLoading">
        </ag-grid-vue>
    </article>
</template>
