<script lang="ts" setup>
import { AgGridVue } from "ag-grid-vue3";
import {
    type GridApi,
    type GridReadyEvent,
    type RowSelectionOptions,
    type SideBarDef,
    ClientSideRowModelModule,
} from "ag-grid-community";
import Sidebar from "./Sidebar.vue";
const runtimeConfig = useRuntimeConfig();
const oneCapEnvironment = runtimeConfig.public.oneCapEnvironment;
import { getOneCapAccountLink } from "@/utils/oneCapLinkHelper";
const companyListStore = useCompanyListStore();
const { gridSearchString, relationships, isLoading } =
    storeToRefs(companyListStore);
const { setSelectedCompany, resetStore } = companyListStore;
const gridApi = shallowRef<GridApi | null>(null);
const pagination = true;
// sets 20 rows per page (default is 100)
const paginationPageSize = 15;
// allows the user to select the page size from a predefined list of page sizes
const paginationPageSizeSelector = [15, 25, 50, 100];
const tooltipShowDelay = ref(500);
const rowSelection = ref<RowSelectionOptions>({
    mode: "singleRow",
    checkboxes: false,
});
const numberFormatter = (params: any) => {
    if (Number.isNaN(Number.parseFloat(params.value))) {
        return "";
    }
    return Number(params.value).toLocaleString();
};
const defaultColDef = {
    flex: 1,
    suppressHeaderMenuButton: true,
};

const columnDefs = [
    { field: "id", headerName: "id", hide: true },
    {
        field: "name",
        headerName: "Name",
        filter: "agTextColumnFilter",
        flex: 1.5,
        filterParams: {
            buttons: ["reset"],
        },
        cellRenderer: (params: any) => {
            return `<a href="${getOneCapAccountLink(oneCapEnvironment, params.data.id)}" target="_blank">
                ${params.value}</a>`;
        },
        contextMenuItems: [],
    },
    {
        field: "contactCount",
        headerName: "Contacts",
        filter: "agNumberColumnFilter",
        flex: 0.5,
        headerTooltip: "Count of Contacts",
        cellClass: ["ag-grid-number-cell", "ag-grid-link-cell"],
        colId: "contactCountCell",
        filterParams: {
            buttons: ["reset"],
        },
        contextMenuItems: [],
    },
    {
        field: "propertyCount",
        headerName: "Properties",
        colId: "propertyCountCell",
        filter: "agNumberColumnFilter",
        cellClass: ["ag-grid-number-cell", "ag-grid-link-cell"],
        flex: 0.5,
        headerTooltip: "Count of Properties",
        filterParams: {
            buttons: ["reset"],
        },
        contextMenuItems: [],
    },
    {
        field: "totalUnits",
        headerName: "Total Units",
        filter: "agNumberColumnFilter",
        cellClass: ['ag-grid-number-cell', 'font-semibold'],
        flex: 0.6,
        headerTooltip: "Total Number of Units",
        valueFormatter: numberFormatter,
        filterParams: {
            buttons: ["reset"],
        },
        contextMenuItems: [],
    },
    {
        field: "address",
        headerName: "Address",
        filter: "agTextColumnFilter",
        flex: 1.5,
        filterParams: {
            buttons: ["reset"],
        },
        contextMenuItems: [],
    },
    {
        field: "phone",
        headerName: "Phone",
        filter: "agTextColumnFilter",
        filterParams: {
            buttons: ["reset"],
        },
        contextMenuItems: [],
    },
    {
        field: "website",
        headerName: "Website",
        filter: "agTextColumnFilter",
        filterParams: {
            buttons: ["reset"],
        },
        contextMenuItems: [],
    },
];

const sideBar = ref<SideBarDef | string | string[] | boolean | null>({
    toolPanels: [
        {
            id: "related",
            labelDefault: "Related",
            labelKey: "related",
            iconKey: "arrows",
            toolPanel: Sidebar,
            toolPanelParams: {
                title: "Related",
            },
            width: 550,
        },
    ],
    defaultToolPanel: "related",
});

const onGridReady = (params: GridReadyEvent) => {
    gridApi.value = params.api;
    gridApi.value.closeToolPanel();
};

watch(gridSearchString, (searchString) => {
    gridApi.value.closeToolPanel();
    gridApi.value.setGridOption("quickFilterText", searchString);
});

function onCellClicked(params: any) {
    if (
        params.column.getColId() === "propertyCountCell" ||
        params.column.getColId() === "contactCountCell"
    ) {
        params.node.setSelected(true);
        setSelectedCompany(params.data);
        gridApi.value.openToolPanel("related");
    }
}
</script>

<template>
    <article class="slds-card">
        <div class="mx-3 mb-2">
            <ag-grid-vue :rowData="relationships" :columnDefs="columnDefs" class="h-[calc(100vh-140px)] mt-2"
                :defaultColDef="defaultColDef" :loading="isLoading" :pagination="pagination"
                :paginationPageSize="paginationPageSize" @grid-ready="onGridReady"
                :paginationPageSizeSelector="paginationPageSizeSelector" :tooltipShowDelay="tooltipShowDelay"
                @cell-clicked="onCellClicked" :sideBar="sideBar" :rowSelection="rowSelection">
            </ag-grid-vue>
        </div>
    </article>
</template>
