<script lang="ts" setup>
import type { ColDef, GridApi, GridReadyEvent } from "ag-grid-enterprise";
import { AgGridVue } from "ag-grid-vue3";
const runtimeConfig = useRuntimeConfig();
const oneCapEnvironment = runtimeConfig.public.oneCapEnvironment;
import { getOneCapContactLink } from "@/utils/oneCapLinkHelper";
const companyListStore = useCompanyListStore();
const { relatedContacts, isLoading } = storeToRefs(companyListStore);
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
        flex: 0.8,
        cellRenderer: (params: any) => {
            return `<a href="${getOneCapContactLink(oneCapEnvironment, params.data.id)}" target="_blank">
                ${params.value}</a>`;
        },
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

const onFilterTextChanged = (event: any) => {
    gridApi.value.setGridOption(
        "quickFilterText",
        event.target.value.trim()
    );
}

</script>

<template>
    <article class="mx-2 mt-7 min-h-[37vh] flex flex-col">
        <div class="font-semibold mb-3 flex flex-row">
            <span class="text-blue-400">
                <span class="slds-icon_container slds-current-color" title="Related Contacts">
                    <svg class="slds-icon" aria-hidden="true">
                        <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#opportunity_contact_role"></use>
                    </svg>
                    <span class="slds-assistive-text">Related Contacts</span>
                </span>
            </span>
            <span class="mt-1">Related Contacts ({{ relatedContacts?.length }})</span>
            <div class="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_left slds-global-search__form-element
            ml-16" role="none" v-if="relatedContacts?.length > 4">
                <span class="slds-icon_container slds-icon-utility-search slds-input__icon slds-input__icon_left">
                    <svg class="slds-icon slds-icon slds-icon_xx-small slds-icon-text-default" aria-hidden="true">
                        <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#search"></use>
                    </svg>
                </span>
                <input type="text" class="slds-input slds-combobox__input text-xs p-1"
                    id="all-properties-filter-text-box" aria-autocomplete="list" aria-controls="search-listbox-id-1"
                    aria-expanded="false" aria-haspopup="listbox" autocomplete="off" role="combobox"
                    placeholder="Search contacts..." @input="onFilterTextChanged($event)">
            </div>
        </div>
        <ag-grid-vue :rowData="relatedContacts" :columnDefs="columnDefs" :defaultColDef="defaultColDef"
            @grid-ready="onGridReady" :rowHeight="28" :headerHeight="28" style="width: 100%; height: 100%;"
            :loading="isLoading">
        </ag-grid-vue>
    </article>
</template>
