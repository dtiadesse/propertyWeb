<template>
  <PropertyItemComparablesAddRentSurvey @add-rents="handleAddRents" />

  <article class="slds-card">
    <div class="slds-card__header slds-grid" style="padding: 0.5rem;">
      <div class="slds-col slds-size_5-of-12">
        <div class="slds-media__body slds-no-flex">
          <div
            class="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_left slds-global-search__form-element"
            role="none"><span
              class="slds-icon_container slds-icon-utility-search slds-input__icon slds-input__icon_left">
              <svg class="slds-icon slds-icon slds-icon_xx-small slds-icon-text-default" aria-hidden="true">
                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#search"></use>
              </svg>
            </span>
            <input type="text" class="slds-input slds-combobox__input" id="combobox-search" autocomplete="off"
              @keyup="filterGrid" role="combobox" placeholder="Search ..." style="box-shadow: none;">
          </div>
        </div>
      </div>
      <div class="slds-col slds-size_7-of-12" style="text-align: right;">
        <div class="slds-no-flex">
          <div class="slds-button-group" role="group">
            <button class="slds-button slds-button_neutral" @click="showAddRentComparablesPopup">Add</button>
            <button class="slds-button slds-button_neutral" @click="removeRentComparables">Remove</button>
          </div>
        </div>
      </div>
    </div>
    <div class="slds-card__body slds-card__body_inner" style="padding: 0.5rem;">
      <AgGridVue style="width: 100%;" :columnDefs="columnDefs" :rowData="propertyStore.property.rentComparables"
        :gridOptions="gridOptions" :defaultColDef="defaultColDef" :animateRows="true" domLayout='autoHeight'
        @row-drag-end="onRowDragEnd" :pagination="false" @selection-changed="onSelectionChanged"
        @cellValueChanged="onCellValueChanged" @grid-ready="onGridReady" />
    </div>

  </article>

</template>

<script lang="ts" setup>
import { AgGridVue } from 'ag-grid-vue3';
import { themeBalham, type GridApi, type GridOptions } from 'ag-grid-community';
import { orderBy } from 'lodash-es';

const globalState = useMyGlobalStateStore()
const config = useConfig()
const propertyStore = useMyPropertyStore()

// const gridApi: any = ref(null);
let api: any = null;

const filterGrid = (event: any) => {
  api.setGridOption('quickFilterText', event.target.value);
}

const selectedRows: any = ref([])

const onGridReady = (params: any) => {
  // gridApi.value = params.api;
  api = params.api;
};


const onCellValueChanged = (event: any, idx: any) => {
  let value: any = null;
  if (event.oldValue === 0) {
    propertyStore.property.rentComparables[event.rowIndex].rank = 0
    return;
  }
  else if (event.newValue && event.newValue > 0 && event.oldValue !== 0) {
    value = +event.newValue;
    const findRankExists = propertyStore.property.rentComparables.find(rc => rc.rank === value)

    if (findRankExists) {
      findRankExists.rank = event.oldValue
    }
    propertyStore.property.rentComparables[event.rowIndex].removed = false;
  }
  else {
    propertyStore.property.rentComparables[event.rowIndex].removed = true;
  }

  propertyStore.property.rentComparables[event.rowIndex].rank = value;

  propertyStore.property.rentComparables = [...propertyStore.property.rentComparables].sort((a, b) => {
    if (a.rank === null || a.rank === undefined) return 1;
    if (b.rank === null || b.rank === undefined) return -1;
    return a.rank - b.rank;
  });
  config.config.value.editMode = true;
}

const showAddRentComparablesPopup = () => {
  globalState.openModal('Add_Rent_Comparables');
}

const handleAddRents = (event: any) => {
  event.forEach((e: any) => {
    const alreadyExists = propertyStore.property.rentComparables.some((rc: any) => rc.propertyId === e.propertyId && rc.surveyId === e.surveyId)
    if (!alreadyExists) {
      if (propertyStore.property.id === e.propertyId) {
        e.rank = 0;
      }
      else {
        e.rank = propertyStore.property.rentComparables.filter(rc => rc.rank > 0).length + 1;
      }

      const items = [...propertyStore.property.rentComparables, e];

      propertyStore.property.rentComparables = orderBy(items, 'rank', 'asc')

    }
  });
  config.config.value.editMode = true;
}

const removeRentComparables = (event: any) => {
  const selectedIds = new Set(selectedRows.value.map((item: any) => item.propertyId + "_" + item.surveyId));
  propertyStore.property.rentComparables = propertyStore.property.rentComparables.filter((item: any) => !selectedIds.has(item.propertyId + "_" + item.surveyId));
  updateRanks()
  config.config.value.editMode = true;

}

const onSelectionChanged = (event: any, i: any) => {
  const selectedNodes = event.api.getSelectedNodes();
  selectedRows.value = selectedNodes.map((node: any) => node.data);
}


const updateRanks = () => {
  propertyStore.property.rentComparables.filter(rc => rc.rank > 0).forEach((row: any, index) => {
    if (!row.removed && row.rank !== 0) {
      row.rank = index + 1;
    }
  });
  config.config.value.editMode = true;
};

const onRowDragEnd = (event: any) => {
  const movingData: any = event.node.data;
  const oldIndex = propertyStore.property.rentComparables.findIndex((row: any) => row.propertyId === movingData.propertyId && row.surveyId === movingData.surveyId);
  const newIndex = event.overIndex;

  if (oldIndex !== newIndex && newIndex !== undefined) {
    const newData = [...propertyStore.property.rentComparables];
    newData.splice(oldIndex, 1);
    newData.splice(newIndex, 0, movingData);
    propertyStore.property.rentComparables = newData;
    updateRanks();
  }
};

const columnDefs: any = ref([
  { field: '', headerName: '', rowDrag: true, width: 30, },
  { field: 'rank', headerName: 'Rank', editable: (event: any) => event.node.data.rank !== 0, sortable: true, width: 60, cellStyle: { textAlign: 'center' } },
  { headerName: 'Survey Name', field: 'value', sortable: true, filter: false },
  { headerName: 'Property Name', field: 'propertyName', sortable: true, filter: false },
  { headerName: 'Creator', field: 'creator', sortable: true, filter: false },
  {
    headerName: 'Date', field: 'date', sortable: true, filter: false,
    valueFormatter: (params: any) => {
      if (!params.value) return '';
      const date = new Date(params.value);
      return date.toLocaleDateString('en-US');
    }
  },
  { headerName: 'Source', field: 'source', sortable: true, filter: false },
  { headerName: 'Type', field: 'type', sortable: true, filter: false },
  { headerName: 'Address', field: 'stdAddress1', sortable: true, filter: false },
  { headerName: 'City', field: 'stdCity', sortable: true, filter: false },
]);


const gridOptions: GridOptions = {
  pagination: true,
  theme: themeBalham,
  rowDragManaged: true,
  localeText: {
    noRowsToShow: "No records found. Click on \"Add\" button to add Rent Surveys."
  },
  rowSelection: {
    mode: 'multiRow'
  }
};

const defaultColDef = ref({
  sortable: true,
  filter: false,
  suppressHeaderMenuButton: true,
  suppressHeaderContextMenu: true,

});
</script>

<style scoped></style>