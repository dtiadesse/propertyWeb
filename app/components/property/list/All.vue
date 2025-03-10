<script lang="ts" setup>
import { AgGridVue } from "ag-grid-vue3";
import {
    type GetContextMenuItemsParams, type GridApi, type GridReadyEvent,
    type MenuItemDef, type RowSelectionOptions, type SelectionChangedEvent
} from "ag-grid-community";
import RowActionCell from "./RowActionCell.vue";
// import type { PropertySummary } from "~~/models/propertySummary.model";
// const config = useRuntimeConfig();
// const apiBaseUrl = config.public.apiBaseUrl;
const propertyListStore = usePropertyListStore();
const toastStore = useToastStore()

const { gridSearchString, allProperties, isLoading } = storeToRefs(propertyListStore);
const { setSelectedProperties, clearSelectedProperties } = propertyListStore;
const { openPersonalListDlg, setSelectedProperty } = usePersonalListStore();
// const allPropertiesUrl = `${apiBaseUrl}/properties/all`
// const { data, status, error, execute } = await useLazyFetch(allPropertiesUrl, {
//     server: false,
//     immediate: false
// });
// if (allProperties.value.length === 0) {
//     await execute()
//     if (status.value === "success") {
//         allProperties.value = data.value as PropertySummary[];
//     } else {
//         console.error(error);
//     }
// }

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
        flex: 1.5,
        filterParams: {
            buttons: ["reset"],
        },
        // cellRenderer: PropertyLink,
        cellRenderer: (params: any) => {
            return `<a href="/property/${params.data.id}">${params.value}</a>`;
        },
        contextMenuItems: []
    },
    {
        field: "stdAddress1",
        headerName: "Address",
        filter: "agTextColumnFilter",
        flex: 1.5,
        filterParams: {
            buttons: ["reset"],
        },
        contextMenuItems: []
    },
    {
        field: "stdCity", headerName: "City", filter: "agTextColumnFilter",
        filterParams: {
            buttons: ["reset"],
        },
        contextMenuItems: []
    },
    {
        field: "stdStateCode", headerName: "State", filter: "agTextColumnFilter", filterParams: {
            buttons: ["reset"],
        },
        contextMenuItems: []
    },
    {
        field: "stdPostalCode",
        headerName: "PostalCode",
        filter: "agTextColumnFilter",
        filterParams: {
            buttons: ["reset"],
        },
        contextMenuItems: []
    },
    {
        field: "propertyType", headerName: "Type", filter: "agTextColumnFilter", filterParams: {
            buttons: ["reset"],
        },
        contextMenuItems: []
    },
    {
        field: "numberOfUnits",
        headerName: "Units",
        filter: "agNumberColumnFilter",
        flex: 0.75,
        cellClass: "ag-grid-number-cell",
        filterParams: {
            buttons: ["reset"],
        },
        contextMenuItems: []
    },
    {
        field: "buildingClass", headerName: "Class", filter: "agTextColumnFilter", flex: 0.75, filterParams: {
            buttons: ["reset"],
        },
        contextMenuItems: []
    },
    {
        field: "buildingSizeSqFt",
        headerName: "Size (sf)",
        filter: "agNumberColumnFilter",
        cellClass: "ag-grid-number-cell",
        valueFormatter: numberFormatter,
        headerTooltip: "Building Size (SqFt)",
        filterParams: {
            buttons: ["reset"],
        },
        contextMenuItems: []
    },
    {
        field: "yearBuilt",
        headerName: "Yr Blt",
        filter: "agNumberColumnFilter",
        cellClass: "ag-grid-number-cell",
        flex: 0.75,
        headerTooltip: "Year Built",
        filterParams: {
            buttons: ["reset"],
        },
        contextMenuItems: []
    },
    {
        field: "source", headerName: "Source", filter: "agTextColumnFilter", filterParams: {
            buttons: ["reset"],
        },
        contextMenuItems: []
    },
    {
        field: 'actions',
        colId: 'rowActionCell',
        cellRenderer: RowActionCell,
        headerName: "",
        flex: 0.40,
        tooltipShowDelay: 500,
        tooltipField: "actions",
        cellStyle: {
            textOverflow: "unset"
        }
    },
];

const onGridReady = (params: GridReadyEvent) => {
    gridApi.value = params.api;
}

watch(gridSearchString, (searchString) => {
    gridApi.value.setGridOption(
        "quickFilterText",
        searchString
    );
});

function onCellClicked(params: any) {
    if (params.column.getColId() === 'rowActionCell') {
        params.api.showContextMenu({
            column: params.column,
            rowNode: params.node,
        })
    }
}

function onCellContextMenu(params: any) {
    params.api.hidePopupMenu();
}

function showPropertyRelationships(id: string) {
    alert(`Property Relationships for Property ID: ${id}`)
    // fetch property relationships from API
}

function addToMyList(rowNode: any) {
    setSelectedProperty(rowNode.data);
    openPersonalListDlg();
}

function getContextMenuItems(params: GetContextMenuItemsParams): (string | MenuItemDef)[] | Promise<(string | MenuItemDef)[]> {
    const result: (string | MenuItemDef)[] = [
        {
            // custom item
            name: "Add To My List",
            action: () => addToMyList(params.node)
        },
        // {
        //     // custom item
        //     name: "Property Relationships",
        //     action: () => showPropertyRelationships(params.node?.data.id)
        // },
        {
            // custom item
            name: "Delete Property",
            disabled: true,
            tooltip: "Not supported",
        }
    ];
    return result;
};

function onSelectionChanged(event: SelectionChangedEvent) {
    const rowCount = event.api.getSelectedNodes().length;
    if (rowCount === 0) {
        clearSelectedProperties();
    } else {
        setSelectedProperties(event.api.getSelectedNodes().map((node) => node.data));
    }
}
</script>

<template>
    <div class="slds-notify_container slds-is-relative">
        <template v-for="toastItem in toastStore.toasts">
            <UiItemToast :item="toastItem" />
        </template>
    </div>
    <article class="slds-card">
        <div class="mx-3 mb-2">
            <ag-grid-vue :rowData="allProperties" :columnDefs="columnDefs" class="h-[calc(100vh-140px)] mt-2"
                :defaultColDef="defaultColDef" :loading="isLoading" :pagination="pagination"
                :paginationPageSize="paginationPageSize" :rowSelection="rowSelection" @grid-ready="onGridReady"
                :paginationPageSizeSelector="paginationPageSizeSelector" :tooltipShowDelay="tooltipShowDelay"
                @cell-clicked="onCellClicked" :getContextMenuItems="getContextMenuItems"
                @cell-context-menu="onCellContextMenu" @selection-changed="onSelectionChanged">
            </ag-grid-vue>
        </div>
        <LazyPersonalListAddDialog />
    </article>
</template>

<style lang="css">
.ag-header-group-cell,
.ag-header-cell {
    color: black;
}

.ag-grid-number-cell {
    text-align: right;
}

.ag-grid-link-cell {
    @apply text-blue-600 hover:underline font-semibold cursor-pointer
}

.ag-grid-sidebar-header {
    font-size: 12px !important;
}
</style>
