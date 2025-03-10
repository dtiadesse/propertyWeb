<template>
  <div class="unit-mix">
    <PropertyItemRentsExcelmapping @load="loadExcelData"
      :s-sytem="propertyStore.property.rentSurveys[propertyStore.surveySelected]?.source" />

    <div class="slds-grid slds-wrap slds-p-vertical_medium slds-p-horizontal_small"
      style="margin-bottom: 1rem; align-items: center;">
      <div class="slds-col slds-size_5-of-12">

      </div>
      <div class="slds-col slds-size_1-of-12"></div>
      <div class="slds-col slds-size_6-of-12" style="text-align: right;">
        <div class="slds-button-group" role="group">
          <button class="slds-button slds-button_neutral" @click="globalState.openModal('Excel_Mapping')">Upload Excel
            Sheet</button>
          <button class="slds-button slds-button_text-destructive" @click="clearTable">Clear the Table</button>
        </div>
      </div>
      <div class="slds-col slds-size_12-of-12">
        <div class="slds-box no-records" v-if="unitMixData.length === 0">
          Nothing added yet. Click on the "Upload Excel Sheet" button to create unit mix. </div>
        <div v-else class="data-table">
          <div class="slds-table_edit_container slds-is-relative">
            <table aria-multiselectable="true" class="slds-table slds-table_cell-buffer slds-table_bordered"
              role="grid">
              <thead>
                <tr class="slds-line-height_reset">
                  <th style="position: relative;" v-for="headerCol in unitHeaders" aria-sort="none" class=""
                    scope="col">
                    <div v-if="headerCol.showHelp" class="slds-popover slds-popover_tooltip slds-nubbin_bottom-left"
                      role="tooltip" id="help">
                      <div class="slds-popover__body">{{ headerCol.helpText }}</div>
                    </div>
                    <a class="slds-th__action slds-text-link_reset" href="javascript:;" role="button" tabindex="-1"
                      @mouseenter="handleTooltip($event, headerCol)" @mouseleave="handleTooltip($event, headerCol)">
                      <span class="slds-assistive-text">Sort by: </span>
                      <div class="slds-grid slds-grid_vertical-align-center slds-has-flexi-truncate"
                        style="justify-content: center;">

                        <span class="slds-truncate">{{ headerCol.name }}</span>
                      </div>
                    </a>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(um, i) in unitMixData" aria-selected="false" class="slds-hint-parent">
                  <td class="slds-cell-edit" scope="row" tabindex="0">
                    <span v-show="!um.Units.editmode" @dblclick="handleDblClick(um.Units, i, 'Unit')"
                      class="slds-grid slds-grid_align-center"> {{ um["Units"]['value'] }}</span>
                    <input ref="inputUnitRef" type="number" v-show="um.Units.editmode" class="input-box"
                      v-model.number="um.Units.value" @change="handleInputChange" @blur="handleCellEdit(um.Units)"
                      @keyup.enter="handleCellEdit(um.Units)" />
                  </td>
                  <td class="slds-cell-edit" scope="row" tabindex="0">
                    <span v-show="!um.Beds.editmode" @dblclick="handleDblClick(um.Beds, i, 'Bed')"
                      class="slds-grid slds-grid_align-center"> {{ um["Beds"]['value'] }}</span>
                    <input ref="inputBedRef" type="text" v-show="um.Beds.editmode" class="input-box"
                      v-model.number="um.Beds.value" @change="handleInputChange" @blur="handleCellEdit(um.Beds)"
                      @keyup.enter="handleCellEdit(um.Beds)" />
                  </td>
                  <td class="slds-cell-edit" scope="row" tabindex="0">
                    <span v-show="!um.Bathrooms.editmode" @dblclick="handleDblClick(um.Bathrooms, i, 'Bath')"
                      class="slds-grid slds-grid_align-center"> {{ um["Bathrooms"]['value'] }}</span>
                    <input ref="inputBathRef" type="text" v-show="um.Bathrooms.editmode" class="input-box"
                      v-model.number="um.Bathrooms.value" @change="handleInputChange"
                      @blur="handleCellEdit(um.Bathrooms)" @keyup.enter="handleCellEdit(um.Bathrooms)" />
                  </td>
                  <td class="slds-cell-edit" scope="row" tabindex="0">
                    <span v-show="!um.SF.editmode" @dblclick="handleDblClick(um.SF, i, 'SF')"
                      class="slds-grid slds-grid_align-center"> {{ um["SF"]['value'] }}</span>
                    <input ref="inputSFRef" type="text" v-show="um.SF.editmode" class="input-box"
                      v-model.number="um.SF.value" @change="handleInputChange" @blur="handleCellEdit(um.SF)"
                      @keyup.enter="handleCellEdit(um.SF)" />
                  </td>
                  <td class="slds-cell-edit" scope="row" tabindex="0">
                    <span v-show="!um.Rent.editmode" @dblclick="handleDblClick(um.Rent, i, 'Rent')"
                      class="slds-grid slds-grid_align-center"> {{ um["Rent"]['value'] }}</span>
                    <input ref="inputRentRef" type="text" v-show="um.Rent.editmode" class="input-box"
                      v-model.number="um.Rent.value" @blur="handleCellEdit(um.Rent)"
                      @keyup.enter="handleCellEdit(um.Rent)" @change="calculateValues('Rent', um); handleInputChange" />
                  </td>
                  <td class="slds-cell-edit" scope="row" tabindex="0">
                    <span v-show="!um.Concession.editmode" @dblclick="handleDblClick(um.Concession, i, 'Concess')"
                      class="slds-grid slds-grid_align-center"> {{ um["Concession"]['value'] }}</span>
                    <input ref="inputConcessRef" type="text" v-show="um.Concession.editmode" class="input-box"
                      v-model.number="um.Concession.value" @blur="handleCellEdit(um.Concession)"
                      @keyup.enter="handleCellEdit(um.Concession)"
                      @change="calculateValues('Concession', um); handleInputChange" />
                  </td>
                  <td class="slds-cell-edit" scope="row" tabindex="0">
                    <span class="slds-grid slds-grid_align-center"> {{ um["EffectiveRent"]['value'] }}</span>
                  </td>
                  <td class="slds-cell-edit" scope="row" tabindex="0">
                    <span v-show="!um.Adjustment.editmode" @dblclick="handleDblClick(um.Adjustment, i, 'Adj')"
                      class="slds-grid slds-grid_align-center"> {{ um["Adjustment"]['value'] }}</span>
                    <input ref="inputAdjRef" type="text" v-show="um.Adjustment.editmode" class="input-box"
                      v-model.number="um.Adjustment.value" @blur="handleCellEdit(um.Adjustment)"
                      @keyup.enter="handleCellEdit(um.Adjustment)"
                      @change="calculateValues('Adjustment', um); handleInputChange" />
                  </td>
                  <td class="slds-cell-edit" scope="row" tabindex="0">
                    <span class="slds-grid slds-grid_align-center"> {{ um["AdjustedRent"]['value'] }}</span>
                  </td>
                  <td class="slds-cell-edit" scope="row" tabindex="0">
                    <span v-show="!um.VADRent.editmode" @dblclick="handleDblClick(um.VADRent, i, 'VAD')"
                      class="slds-grid slds-grid_align-center"> {{ um["VADRent"]['value'] }}</span>
                    <input ref="inputVADRef" type="text" v-show="um.VADRent.editmode" class="input-box"
                      v-model.number="um.VADRent.value" @change="handleInputChange" @blur="handleCellEdit(um.VADRent)"
                      @keyup.enter="handleCellEdit(um.VADRent)" />
                  </td>
                  <td class="slds-cell-edit" scope="row" tabindex="0">
                    <span v-show="!um.Description.editmode" @dblclick="handleDblClick(um.Description, i, 'Desc')"
                      class="slds-grid slds-grid_align-center slds-truncate" :title="um.Description.value"> {{
                        um["Description"]['value'] }}</span>
                    <input ref="inputDescRef" type="text" v-show="um.Description.editmode" class="input-box"
                      v-model="um.Description.value" @change="handleInputChange" @blur="handleCellEdit(um.Description)"
                      @keyup.enter="handleCellEdit(um.Description)" />
                  </td>
                </tr>
              </tbody>
            </table>




          </div>



        </div>
        <div v-if="unitMixData.length > 0" class="slds-grid slds-wrap slds-p-vertical_medium slds-p-horizontal_small">

          <div class="slds-col slds-size_4-of-12">
            <label class="slds-form-element__label custom-lbl">Units</label>
            <div class="slds-grid slds-wrap">
              <div class="slds-col slds-size_4-of-12 slds-p-vertical_x-small slds-p-right_xx-small">
                <UiItemInputBox label="Proposed" :edit-mode="true" :value="propertyStore.property.numberOfUnits"
                  :read-only="true" />
              </div>
              <div class="slds-col slds-size_4-of-12 slds-p-vertical_x-small slds-p-horizontal_xx-small">
                <UiItemInputBox label="Calculated" :edit-mode="true" :value="unitsCalculated" :read-only="true" />
              </div>
              <div class="slds-col slds-size_4-of-12 slds-p-vertical_x-small slds-p-left_xx-small">
                <UiItemInputBox label="Difference" :edit-mode="true" :value="unitsDifference" :read-only="true" />
              </div>
              <div v-if="unitsDifference !== 0" class="slds-col slds-size_12-of-12 slds-p-vertical_x-small">
                <button class="slds-button slds-button_neutral sync-btn"
                  @click="syncWithProperty('units')">Sync</button>
              </div>

            </div>


          </div>
          <div class="slds-col slds-size_1-of-12"></div>
          <div class="slds-col slds-size_4-of-12">
            <label class="slds-form-element__label custom-lbl">Square Feet</label>

            <div class="slds-grid slds-wrap">
              <div class="slds-col slds-size_4-of-12 slds-p-vertical_x-small slds-p-right_xx-small">
                <UiItemInputBox label="Proposed" :edit-mode="true" :value="propertyStore.property.buildingSizeSqFt"
                  :read-only="true" />
              </div>
              <div class="slds-col slds-size_4-of-12 slds-p-vertical_x-small slds-p-horizontal_xx-small">
                <UiItemInputBox label="Calculated" :edit-mode="true" :value="sfCalculated" :show-edit-icon="false"
                  :read-only="true" />
              </div>
              <div class="slds-col slds-size_4-of-12 slds-p-vertical_x-small slds-p-left_xx-small">
                <UiItemInputBox label="Difference" :edit-mode="true" :value="sfDifference" :show-edit-icon="false"
                  :read-only="true" />
              </div>
              <div v-if="sfDifference !== 0" class="slds-col slds-size_12-of-12 slds-p-vertical_x-small">
                <button class="slds-button slds-button_neutral sync-btn" @click="syncWithProperty('SF')">Sync</button>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>

  </div>
</template>

<script lang="ts" setup>
import { sumBy } from 'lodash-es';

const globalState = useMyGlobalStateStore()
const propertyStore = useMyPropertyStore()
const config = useConfig()
const inputUnitRef: any = ref([]);
const inputBedRef: any = ref([]);
const inputBathRef: any = ref([]);
const inputSFRef: any = ref([]);
const inputRentRef: any = ref([]);
const inputConcessRef: any = ref([]);
const inputAdjRef: any = ref([]);
const inputVADRef: any = ref([]);
const inputDescRef: any = ref([]);
const unitMixData: any = ref([])
const unitHeaders: any = ref([
  {
    helpText: "Units",
    name: "Units",
    showHelp: false
  },
  {
    helpText: "Beds",
    name: "Beds",
    showHelp: false
  },
  {
    helpText: "Bathrooms",
    name: "Bathrooms",
    showHelp: false
  },
  {
    helpText: "Square Feet",
    name: "SF",
    showHelp: false
  },
  {
    helpText: "Rent per Unit",
    name: "Rent",
    showHelp: false
  },
  {
    helpText: "Monthly concession amount",
    name: "Csn",
    showHelp: false
  },
  {
    helpText: "Effective Rent",
    name: "Eff Rent",
    showHelp: false
  },
  {
    helpText: "Adjustment",
    name: "Adj",
    showHelp: false
  },
  {
    helpText: "Adjusted Rent",
    name: "Adj Rent",
    showHelp: false
  },
  {
    helpText: "Value Add Rent",
    name: "V-ad Rent",
    showHelp: false
  },
  {
    helpText: "Description",
    name: "Description",
    showHelp: false
  }
]
)

const valueChanged: any = ref(false)

const handleInputChange = () => {
  valueChanged.value = true;
}

const loadExcelData = (event: any) => {
  unitMixData.value = event;
  config.config.value.editMode = true;
  propertyStore.property.rentSurveys[propertyStore.surveySelected].unitMix = event;
}

const handleDblClick = (obj: any, idx: number, key: string) => {
  obj.editmode = true;
  setTimeout(() => {
    let input = null;
    switch (key) {
      case "Unit":
        input = inputUnitRef.value[idx];
        break;
      case "Bed":
        input = inputBedRef.value[idx];
        break;
      case "Bath":
        input = inputBathRef.value[idx];
        break;
      case "SF":
        input = inputSFRef.value[idx];
        break;
      case "Rent":
        input = inputRentRef.value[idx];
        break;
      case "Concess":
        input = inputConcessRef.value[idx];
        break;
      case "Adj":
        input = inputAdjRef.value[idx];
        break;
      case "VAD":
        input = inputVADRef.value[idx];
        break;
      case "Desc":
        input = inputDescRef.value[idx];
        break;
    }
    if (input) {

      input.focus();
    }
  }, 50)
}

const handleCellEdit = (obj: any) => {
  obj.editmode = false;
  if (valueChanged.value === true) {
    config.config.value.editMode = true;
  }

}

const calculateValues = (field: any, obj: any) => {
  if (field === 'Rent') {
    obj.EffectiveRent.value = +(obj.Rent.value - obj.Concession.value).toFixed(2);
    obj.AdjustedRent.value = +(obj.EffectiveRent.value - obj.Adjustment.value).toFixed(2);
  }
  else if (field === "Concession") {
    obj.EffectiveRent.value = +(obj.Rent.value - obj.Concession.value).toFixed(2);
    obj.AdjustedRent.value = +(obj.EffectiveRent.value - obj.Adjustment.value).toFixed(2);
  }
  else if (field === "Adjustment") {
    obj.AdjustedRent.value = +(obj.EffectiveRent.value - obj.Adjustment.value).toFixed(2);
  }
  config.config.value.editMode = true
}

const unitsCalculated = computed(() => {
  if (unitMixData.value) {
    return sumBy(unitMixData.value, (i: any) => +i.Units.value);
  }
  else {
    return 0;
  }
});

const unitsDifference = computed(() => {
  if (unitMixData.value) {
    return unitsCalculated.value - (propertyStore.property.numberOfUnits || 0);
  }
  else {
    return 0;
  }
});

const sfCalculated: any = computed(() => {
  if (unitMixData.value) {
    let tSF: any = totalSF({ rentSurveys: [{ unitMix: unitMixData.value }] });
    tSF = tSF.replace(/[^0-9.]/g, "");
    return Math.round(tSF);
  }
  else {
    return 0;
  }
});

const sfDifference = computed(() => {
  if (unitMixData.value) {
    return sfCalculated.value - (propertyStore.property.buildingSizeSqFt || 0);
  }
  else {
    return 0;
  }
});

const handleTooltip = ($event: any, col: any) => {
  if ($event.type === "mouseenter") {
    col.showHelp = true;
  }
  else {
    col.showHelp = false;
  }
}

const clearTable = () => {
  unitMixData.value = [];
  propertyStore.property.rentSurveys[propertyStore.surveySelected].unitMix = []
  config.config.value.editMode = true;
}

const syncWithProperty = (type: any) => {
  if (type === 'units') {
    propertyStore.property.numberOfUnits = unitsCalculated.value;
  }
  else if (type === 'SF') {
    propertyStore.property.buildingSizeSqFt = sfCalculated.value;
  }
  config.config.value.editMode = true;
}


onMounted(() => {
  unitMixData.value = propertyStore.property.rentSurveys[propertyStore.surveySelected].unitMix || [];
})

watch(() => propertyStore.surveySelected, (ss: any) => {
  unitMixData.value = propertyStore.property.rentSurveys[propertyStore.surveySelected].unitMix || [];
});

watch(() => config.config.value.editMode, (em: any) => {
  if (em === false) {
    valueChanged.value = false;
  }
});

</script>

<style scoped>
.unit-mix {
  margin-top: -0.75rem;
  background: #F5F5F5;
}

.data-table {
  margin: 0.5rem 0;
  max-width: 100%;
  max-height: 18rem;
  overflow: auto;
}

.no-records {
  width: 100%;
}

.input-box {
  border-bottom: 1px solid #a9a9a9;
  padding-bottom: 0.1rem;
  text-align: center;
  width: 85%;
  outline: 0;
}

.slds-cell-edit span {
  min-height: 1rem;
}

.data-table thead {
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  z-index: 999;
}

.data-table table {
  border-top: 0;
}

.data-table thead th {
  border-top: 1px solid #e5e5e5;
}

.data-table .slds-th__action:focus {
  outline: 0;
  box-shadow: none;
}

.sync-btn {
  width: 100%;
}

.slds-form-element__label.custom-lbl {
  font-weight: 700;
}

.slds-popover {
  position: absolute;
  bottom: -32px;
  left: 0
}

.slds-popover::after,
.slds-popover::before {
  top: 0;
}
</style>