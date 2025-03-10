<template>
  <UiItemModal :is-visible="globalState.modalName === 'Add_Rent_Comparables'" :size="'large'" @close="closeModal">
    <template #header>
      Add Property Rent
    </template>
    <div class="slds-grid slds-wrap">
      <div class="slds-col slds-size_12-of-12 slds-p-around_xx-small">
        <AgGridVue id="myGrid" style="width: 100%;" :columnDefs="columnDefs" :rowData="rowData"
          :gridOptions="gridOptions" :defaultColDef="defaultColDef" :animateRows="true" domLayout='autoHeight'
          @selection-changed="onSelectionChanged" />
      </div>

    </div>
    <template #footer>
      <div style="display: flex;justify-content: flex-end;align-items: center;">
        <button class="slds-button slds-button_neutral" @click="closeModal">Cancel</button>
        <button class="slds-button slds-button_brand" @click="addRentSurvey">Add<span v-if="selectedRows.length > 0">
            ({{
              selectedRows.length }})</span></button>
      </div>
    </template>
  </UiItemModal>
</template>

<script lang="ts" setup>
import { v4 as uuidv4 } from 'uuid';

import { AgGridVue } from 'ag-grid-vue3';
import { createGrid, themeBalham, type GridApi, type GridOptions, type GridReadyEvent, type RowSelectionOptions } from 'ag-grid-community';

const columnDefs: any = ref([
  { headerName: 'Survey Name', field: 'value', sortable: true, filter: true, },
  { headerName: 'Property Name', field: 'propertyName', sortable: true, filter: true },
  { headerName: 'Creator', field: 'creator', sortable: true, filter: true },
  {
    headerName: 'Date', field: 'date', sortable: true, filter: 'agDateColumnFilter', valueFormatter: (params: any) => {
      if (!params.value) return '';
      const date = new Date(params.value);
      return date.toLocaleDateString('en-US');
    }
  },
  { headerName: 'Source', field: 'source', sortable: true, filter: true },
  { headerName: 'Type', field: 'type', sortable: true, filter: true },
  { headerName: 'Address', field: 'stdAddress1', sortable: true, filter: true },
  { headerName: 'City', field: 'stdCity', sortable: true, filter: true },
]);

const rowData = ref([]);

const gridOptions: GridOptions = {
  pagination: true,
  paginationPageSize: 10,
  paginationPageSizeSelector: [10, 30, 50, 100],
  theme: themeBalham,
  localeText: {
    noRowsToShow: "No records found"
  },
  rowSelection: {
    mode: 'multiRow',
    selectAll: 'filtered'
  },

};

const defaultColDef = ref({
  sortable: true,
  filter: false,
  suppressHeaderMenuButton: true,
  suppressHeaderContextMenu: true,
});

const globalState = useMyGlobalStateStore()
const propertyStore = useMyPropertyStore()
const data: any = ref({})
const emit = defineEmits(["addRents"])

const selectedRows: any = ref([])

const onSelectionChanged = (event: any, i: any) => {
  const selectedNodes = event.api.getSelectedNodes();
  selectedRows.value = selectedNodes.map((node: any) => node.data);
}

const closeModal = () => {
  selectedRows.value = []
  globalState.closeModal();
}


const addRentSurvey = () => {
  emit("addRents", selectedRows.value);
  closeModal()
}

propertyStore.getRentSurveys().then(r => rowData.value = r);


</script>

<style scoped>
.slds-checkbox_standalone .slds-checkbox_standalone {
  position: relative;
}

.slds-checkbox_standalone:after {
  content: "In-house";
  position: absolute;
  left: 1.4rem;
  top: -2px;
}
</style>