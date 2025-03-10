<script lang="ts" setup>
import { AgGridVue } from "ag-grid-vue3";
import {
    type GridApi, type GridReadyEvent,
    type RowSelectionOptions,
    type SelectionChangedEvent,
    type SideBarDef, ClientSideRowModelModule
} from "ag-grid-community";
import Sidebar from "./Sidebar.vue";
const runtimeConfig = useRuntimeConfig();
const oneCapEnvironment = runtimeConfig.public.oneCapEnvironment;
import { getOneCapContactLink, getOneCapAccountLink } from "@/utils/oneCapLinkHelper";
const contactListStore = useContactListStore();
const { gridSearchString, relationships, isLoading } = storeToRefs(contactListStore);
const { setSelectedContact, setSelectedContacts, clearSelectedContacts } = contactListStore;
const gridApi = shallowRef<GridApi | null>(null);
const pagination = true;
// sets 20 rows per page (default is 100)
const paginationPageSize = 15;
// allows the user to select the page size from a predefined list of page sizes
const paginationPageSizeSelector = [15, 25, 50, 100];
const tooltipShowDelay = ref(500);
const rowSelection = ref<RowSelectionOptions | "single" | "multiple">({
    mode: "multiRow",
});
const numberFormatter = (params: any) => {
    if (Number.isNaN(Number.parseFloat(params.value))) {
        return "";
    }
    return Number(params.value).toLocaleString();
}
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
        flex: 1,
        filterParams: {
            buttons: ["reset"],
        },
        cellRenderer: (params: any) => {
            return `<a href="${getOneCapContactLink(oneCapEnvironment, params.data.id)}" target="_blank">
                ${params.value}</a>`;
        },
        contextMenuItems: []
    },
    {
        field: "companyName",
        headerName: "Company",
        filter: "agTextColumnFilter",
        flex: 1,
        filterParams: {
            buttons: ["reset"],
        },
        cellRenderer: (params: any) => {
            return `<a href="${getOneCapAccountLink(oneCapEnvironment, params.data.accountId)}" target="_blank">
                ${params.value}</a>`;
        },
        contextMenuItems: [],
    },
    {
        field: "propertyCount",
        headerName: "Properties",
        colId: 'propertyCountCell',
        filter: "agNumberColumnFilter",
        cellClass: ['ag-grid-number-cell', 'ag-grid-link-cell'],
        flex: 0.45,
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
        flex: 0.45,
        headerTooltip: "Total Number of Units",
        valueFormatter: numberFormatter,
        filterParams: {
            buttons: ["reset"],
        },
        contextMenuItems: [],
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
            width: 550
        },
    ],
    defaultToolPanel: "related",
});

const onGridReady = (params: GridReadyEvent) => {
    gridApi.value = params.api;
    gridApi.value.closeToolPanel();
}

watch(gridSearchString, (searchString) => {
    gridApi.value.closeToolPanel();
    gridApi.value.setGridOption(
        "quickFilterText",
        searchString
    );
});

function onCellClicked(params: any) {
    if (params.column.getColId() === 'propertyCountCell' || params.column.getColId() === 'contactCountCell') {
        // params.node.setSelected(true)
        setSelectedContact(params.data);
        gridApi.value.openToolPanel("related");
    }
}

function onSelectionChanged(event: SelectionChangedEvent) {
    const rowCount = event.api.getSelectedNodes().length;
    if (rowCount === 0) {
        clearSelectedContacts();
    } else {
        setSelectedContacts(event.api.getSelectedNodes().map((node) => node.data));
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
                @cell-clicked="onCellClicked" :sideBar="sideBar" :rowSelection="rowSelection"
                @selection-changed="onSelectionChanged">
            </ag-grid-vue>
        </div>
    </article>
</template>

<style scoped>
.ag-paging-panel {
    font-size: 12px !important;
}
</style>
