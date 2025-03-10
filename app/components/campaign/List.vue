<script lang="ts" setup>
import type { ColDef, GridApi, GridReadyEvent, RowSelectionOptions, SelectionChangedEvent } from "ag-grid-enterprise";
import { AgGridVue } from "ag-grid-vue3";
import type { ApiResponse } from "~~/models/apiResponse.model";
import type { Campaign } from "~~/models/campaign.model";
const campaignStore = useCampaignStore();
const { campaigns } = storeToRefs(campaignStore);
const { setSelectedCampaign, clearSelectedCampaign } = campaignStore;
const { getUserEmail } = useAuthStore();
const isLoading = ref(false);
const userEmail = getUserEmail();
const hasError = ref(false);
const errorMsg = ref('');
const campaignListUri = `/api/onecap/campaigns/${userEmail}/`;
const { status, data: apiResponse, error, execute } = await useLazyFetch(campaignListUri, {
    server: false,
    immediate: false
});

onMounted(async () => {
    if (campaigns.value.length === 0) {
        isLoading.value = true;
        await execute();
        if (status.value === 'success') {
            const response = apiResponse.value as ApiResponse;
            if (response.hasError) {
                hasError.value = true;
                errorMsg.value = response.message;
            } else {
                campaigns.value = response.data as Campaign[];
            }
        }
        isLoading.value = false;
    }
});

const gridApi = shallowRef<GridApi | null>(null);
const defaultColDef: ColDef = {
    flex: 1,
    suppressHeaderMenuButton: true,
    suppressHeaderFilterButton: true,
    cellStyle: { fontSize: '12px' },
    headerClass: 'ag-grid-sidebar-header'
};
const pagination = true;
// sets 20 rows per page (default is 100)
const paginationPageSize = 10;
// allows the user to select the page size from a predefined list of page sizes
const paginationPageSizeSelector = [10, 20, 50, 100];
const rowSelection = ref<RowSelectionOptions>({
    mode: "singleRow",
});
const columnDefs = [
    { field: "id", headerName: "id", hide: true },
    {
        field: "name",
        headerName: "Name",
    },
    {
        field: "owner", headerName: "Owner", flex: 0.8

    },
    {
        field: "type", headerName: "Type"
    },
    {
        field: "status", headerName: "Status"
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

function onSelectionChanged(event: SelectionChangedEvent) {
    const rowCount = event.api.getSelectedNodes().length;
    if (rowCount === 0) {
        clearSelectedCampaign();
    } else {
        setSelectedCampaign(event.api.getSelectedNodes()[0].data);
    }
    console.log("selection changed, " + rowCount + " rows selected");
}
</script>

<template>
    <article class="mx-2 flex flex-col h-[35vh]">
        <div class="font-semibold flex flex-row mb-1">
            <span class="text-orange-600">
                <span class="slds-icon_container slds-current-color" title="Related Contacts">
                    <svg class="slds-icon" aria-hidden="true">
                        <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#advertising"></use>
                    </svg>
                    <span class="slds-assistive-text">Campaigns</span>
                </span>
            </span>
            <span class="mt-1">Select OneCap Campaign:</span>
            <div class="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_left slds-global-search__form-element
            ml-16" role="none" v-if="campaigns?.length > 4">
                <span class="slds-icon_container slds-icon-utility-search slds-input__icon slds-input__icon_left">
                    <svg class="slds-icon slds-icon slds-icon_xx-small slds-icon-text-default" aria-hidden="true">
                        <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#search"></use>
                    </svg>
                </span>
                <input type="text" class="slds-input slds-combobox__input text-xs p-1"
                    id="all-properties-filter-text-box" aria-autocomplete="list" aria-controls="search-listbox-id-1"
                    aria-expanded="false" aria-haspopup="listbox" autocomplete="off" role="combobox"
                    placeholder="Search campaigns..." @input="onFilterTextChanged($event)">
            </div>
        </div>
        <p v-if="hasError" class="text-red-600 mb-2">{{ errorMsg }}</p>
        <ag-grid-vue :rowData="campaigns" :columnDefs="columnDefs" :defaultColDef="defaultColDef"
            @grid-ready="onGridReady" :rowHeight="28" :headerHeight="28" style="width: 100%; height: 100%;"
            :loading="isLoading" :pagination="pagination" :paginationPageSize="paginationPageSize"
            :paginationPageSizeSelector="paginationPageSizeSelector" :rowSelection="rowSelection"
            @selection-changed="onSelectionChanged">
        </ag-grid-vue>
    </article>
</template>
