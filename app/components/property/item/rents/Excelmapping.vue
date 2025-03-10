<template>
  <UiItemModal :is-visible="globalState.modalName === 'Excel_Mapping'" :size="'medium'" @close="closeModal">
    <template #header>
      Upload and Map Excel
    </template>
    <div class="slds-grid slds-wrap" style="min-height: 20rem;flex-direction: column;">
      <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
        <UiItemComboBox label="Select source system" :values="sourceSystems" :edit-mode="true"
          @selected="handleSourceSystem" :selected="sourceSystemSelectedValue" />
      </div>
      <div class="slds-col slds-size_12-of-12 slds-p-around_xx-small">
        <div class="slds-form-element">
          <span class="slds-form-element__label" id="file-selector-primary-label-9">Select Excel
            File</span><span class="help-text">Allowed
            types 'xlsx'. Max file size 2MB</span>
          <div class="slds-form-element__control">
            <div class="slds-file-selector slds-file-selector_files">
              <div class="slds-file-selector__dropzone">
                <input type="file" class="slds-file-selector__input slds-assistive-text"
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  id="file-upload-input" :multiple="false" @change="handleFileSelect" />
                <label class="slds-file-selector__body" for="file-upload-input" id="file-selector-secondary-label10">
                  <span class="slds-file-selector__button slds-button slds-button_neutral">
                    <svg class="slds-button__icon slds-button__icon_left" aria-hidden="true">
                      <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#upload"></use>
                    </svg>Choose File</span>
                </label>
              </div>
              <span style="align-self: center;margin-left: 0.5rem;">{{ fileName }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="slds-col slds-size_12-of-12 slds-p-around_xx-small">
        <div class="slds-grid slds-wrap">
          <template v-if="headers.length > 0">
            <div class="slds-col slds-size_5-of-12 slds-p-vertical_x-small header-row">
              <label>Unit Mix Fields</label>
            </div>
            <div class="slds-col slds-size_5-of-12 slds-p-around_x-small header-row">
              <label>Excel Columns</label>
            </div>
            <div class="slds-col slds-size_2-of-12 slds-p-vertical_x-small header-row">&nbsp;</div>


          </template>
          <template v-if="headers.length > 0" v-for="mf in mappingFields">
            <div class="slds-col slds-size_5-of-12 slds-p-vertical_x-small content-row">
              <label>{{ mf.label }}</label>
            </div>
            <div class="slds-col slds-size_5-of-12 slds-p-around_x-small content-row">
              <UiItemComboBox label="" :edit-mode="true" :values="headers" :selected="mappedColumns[mf.label]"
                @selected="handleSelection($event, mf)" />
            </div>
            <div class="slds-col slds-size_2-of-12 slds-p-vertical_x-small content-row" style="text-align: center;">
              <button class="slds-button slds-button_neutral" @click="false">Reset</button>
            </div>


          </template>
          <div class="slds-box no-records" v-if="headers.length === 0">Choose a "Source system" and upload the excel
            file to
            proceed.
          </div>

        </div>
      </div>
    </div>

    <template #footer>
      <div style="display: flex;justify-content: flex-end;align-items: center;">
        <button class="slds-button slds-button_neutral" @click="closeModal">Cancel</button>
        <button class="slds-button slds-button_brand" @click="loadMappedExcel">Upload and Save</button>
      </div>
    </template>
  </UiItemModal>

</template>

<script lang="ts" setup>
import { read, utils } from 'xlsx';

// import { excelMapping, processExcelData } from '~/utils/excelMapping';

const globalState = useMyGlobalStateStore()
const propertyStore = useMyPropertyStore()

const props = defineProps(['sSytem'])

const emits = defineEmits(["load"])

const sourceSystems = [
  { label: "CoStar", value: "CoStar" },
  { label: "Axiometrics", value: "Axiometrics" },
  { label: "RedIQ", value: "RedIQ" },
  { label: "Yardi", value: "Yardi" },
  // { label: "Market Survey", value: "Market Survey" },
  // { label: "Pro Forma", value: "Pro Forma" },
  // { label: "Property Financials", value: "Property Financials" },
  // { label: "Property Website", value: "Property Website" },
  // { label: "Rent Roll", value: "Rent Roll" },
  { label: "Other", value: "Other" },
]

const mappingFields = [
  { label: "Units", value: "Units" },
  { label: "Beds", value: "Beds" },
  { label: "Bathrooms", value: "Bathrooms" },
  { label: "SF", value: "SF" },
  { label: "Rent", value: "Rent" },
]

const fileName = ref(null)
const headers = ref([])
const mappedColumns: any = ref({})
const mappedColumnIndex: any = ref({})
const excelData: any = ref(null)
const sourceSystem: any = ref(null)
const excelHeaders: any = ref(null)

const cellMapping: any = {
  "CoStar": { "Units": "D", "Beds": "A", "Bathrooms": "B", "SF": "C", "Rent": "H" },
  "Axiometrics": { "Units": "B", "Beds": "A", "Bathrooms": "A", "SF": "C", "Rent": "G" },
  "RedIQ": { "Units": "G", "Beds": "D", "Bathrooms": "E", "SF": "F", "Rent": "O" },
  "Yardi": { "Units": "B", "Beds": "A", "Bathrooms": "A", "SF": "D", "Rent": "F" },
  "Other": { "Units": "A", "Beds": "A", "Bathrooms": "A", "SF": "A", "Rent": "A" }
}

const sourceSystemSelectedValue = computed(() => {

  switch (propertyStore.property.rentSurveys[propertyStore.surveySelected]?.source) {
    case "Market Survey":
    case "Pro Forma":
    case "Property Website":
    case "Rent Roll":
    case "Other":
      sourceSystem.value = "Other"
      return "Other";

    case "Property Financials":
    case "RedIQ":
      sourceSystem.value = "RedIQ"
      return "RedIQ";
    default:
      sourceSystem.value = propertyStore.property.rentSurveys[propertyStore.surveySelected]?.source;
      return propertyStore.property.rentSurveys[propertyStore.surveySelected]?.source;
  }



}

)

const handleSelection = (event: any, mf: any) => {
  const idx = excelHeaders.value.findIndex((eh: any) => eh === event);
  cellMapping[sourceSystem.value][mf.value] = String.fromCharCode(65 + idx)
  const { result, indexResult } = excelMapping(sourceSystem.value, excelHeaders.value, cellMapping);
  mappedColumns.value = result;
  mappedColumnIndex.value = indexResult;
}

const handleFileSelect = (files: any) => {
  if (files) {
    const file = files.target.files[0];
    fileName.value = file.name;

    const filesize = +((file.size / 1024) / 1024).toFixed(4); // MB

    if (filesize <= 2.5) {
      const reader = new FileReader();
      let headerRow = 0;
      let wsname: any = null;
      reader.onload = (e: any) => {
        const bstr = e.target.result;
        const wb = read(bstr, { type: 'binary' });



        wsname = wsname || wb.SheetNames[0];
        const ws: any = wb.Sheets[wsname!];
        excelData.value = utils.sheet_to_json(ws!, { header: 1 });

        if (sourceSystem.value === 'CoStar') {
          const index = excelData.value.findIndex((e: any) => e.includes("Beds") && e.includes("Baths") && e.includes("Avg SF"));
          headerRow = index;
        }
        else if (sourceSystem.value === 'Axiometrics') {
          // headerRow = 7;

          const index = excelData.value.findIndex((e: any) => e.includes("Units") && e.includes("Floorplan"));
          headerRow = index;

          wsname = "UNIT MIX";
        }
        else if (sourceSystem.value === 'RedIQ' || sourceSystem.value === 'Property Financials') {
          const index = excelData.value.findIndex((e: any) => e.includes("Bed") && e.includes("Floor Plan"));
          headerRow = index;
          // headerRow = 5;
          wsname = "Floor Plan Summary";
        }
        else if (sourceSystem.value === 'Yardi') {
          const index = excelData.value.findIndex((e: any) => e.includes("Unit Type") && e.includes("No. of Units"));
          headerRow = index;
          // headerRow = 1;
        }

        excelHeaders.value = excelData.value[headerRow];

        const { result, indexResult } = excelMapping(sourceSystem.value, excelHeaders.value, cellMapping);

        mappedColumns.value = result;
        mappedColumnIndex.value = indexResult;
        headers.value = excelHeaders.value.map((h: any, i: any) => ({ label: h, value: h }))
      }
      reader.readAsArrayBuffer(file);
    }
  }
}

const handleSourceSystem = (event: any) => {
  sourceSystem.value = event;
}

const loadMappedExcel = () => {
  let excelResult: any = []

  if (excelData.value) {
    excelResult = processExcelData(excelData.value, sourceSystem.value, mappedColumnIndex.value)
  }
  emits("load", excelResult);

  closeModal()
}


const closeModal = () => {
  fileName.value = null;
  headers.value = [];
  mappedColumns.value = {}
  mappedColumnIndex.value = {}
  excelData.value = null
  sourceSystem.value = null
  excelHeaders.value = null
  globalState.closeModal();

}
watch(() => props.sSytem, (s) => { sourceSystem.value = s; })

onMounted(() => {
  sourceSystem.value = propertyStore.property.rentSurveys[propertyStore.surveySelected]?.source;
})

</script>

<style scoped>
.help-text {
  font-style: italic;
  font-size: 12px;
  text-align: left;
  width: 100%;
  display: block;
  margin-bottom: 0.25rem;
  color: #2196f3;
}

.header-row {
  background: rgb(201 201 201 / 40%);
  padding-left: 0.5rem;
  font-weight: 500;
}

.content-row {
  border-bottom: 1px solid #c9c9c9;
  padding-left: 0.25rem;
  height: 3rem;
}

.no-records {
  width: 100%;
  background: #f5f5f5;
}
</style>