<template>
  <UiItemModal :is-visible="globalState.modalName === 'Add_Transaction'" :size="'small'" @close="closeModal">
    <template #header>
      Add Transaction
    </template>
    <label class="required-fields">required fields</label>
    <UiItemExpandableSection :label="'Main Details'">
      <div class="slds-grid slds-wrap">
        <div class="slds-col slds-size_12-of-12 slds-p-around_xx-small">
          <UiItemInputBox label="Transaction Name" :edit-mode="true" :required="true" :value="''"
            @input-changed="updateModel($event, 'name')" />
        </div>
        <div class="slds-col slds-size_12-of-12 slds-p-around_xx-small">
          <UiItemValueBox label="Property Name" :value="propertyStore.property.name" :required="true"
            :show-edit-icon="false" />
        </div>
        <div class="slds-col slds-size_8-of-12 slds-p-around_xx-small">
          <UiItemComboBox label="Type" :values="propertyStore.options.transactionTypes" :edit-mode="true"
            :selected="propertyStore.property.propertyType" @selected="updateModel($event, 'propertyType')"
            :required="true" />
        </div>
        <div class="slds-col slds-size_4-of-12 slds-p-around_xx-small">
          <UiItemInputBox label="Year Built" @input-changed="updateModel($event, 'yearBuilt')" :edit-mode="true"
            :required="true" :value="propertyStore.property.yearBuilt" />
        </div>
        <div class="slds-col slds-size_10-of-12 slds-p-around_xx-small">
          <UiItemAutoComplete :required="true" label="Seller's Company" :model="'company'"
            @item-selected="updateModel($event, 'sellerCompany')" :edit-mode="true" />
        </div>
      </div>
    </UiItemExpandableSection>

    <UiItemExpandableSection :label="'Information from Property'">

      <div class="slds-grid slds-wrap">
        <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
          <UiItemValueBox label="Units" :show-edit-icon="false" :value="propertyStore.property.numberOfUnits"
            :required="true" />
        </div>
        <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
          <UiItemValueBox label="Square Feet" :show-edit-icon="false"
            :value="propertyStore.property.buildingSizeSqFt" />
        </div>
        <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
          <UiItemValueBox label="Acres" :show-edit-icon="false" :value="propertyStore.property.sizeAcres" />
        </div>
        <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
          <UiItemValueBox label="Beds" :value="propertyStore.property.beds" :show-edit-icon="false" />
        </div>
      </div>
    </UiItemExpandableSection>

    <template #footer>
      <div style="display: flex;justify-content: flex-end;align-items: center;">
        <UiItemInlineLoader />
        <button class="slds-button slds-button_neutral" @click="closeModal">Cancel</button>
        <button class="slds-button slds-button_brand" @click="addTransaction">Add</button>
      </div>
    </template>
  </UiItemModal>
</template>

<script lang="ts" setup>
import { v4 as uuidv4 } from 'uuid';

const globalState = useMyGlobalStateStore()
const propertyStore = useMyPropertyStore()
const data: any = ref({})
const emit = defineEmits(["create"])

const closeModal = () => {
  globalState.closeModal();
}

const updateModel = (event: any, key: any) => {
  data.value[key] = event;
}

const addTransaction = () => {
  data.value['id'] = uuidv4();
  data.value['propertyType'] = propertyStore.property.propertyType;
  data.value['numberOfUnits'] = propertyStore.property.numberOfUnits;
  data.value['yearBuilt'] = propertyStore.property.yearBuilt;
  data.value['buildingSizeSqFt'] = propertyStore.property.buildingSizeSqFt;
  data.value['sizeAcres'] = propertyStore.property.sizeAcres;
  data.value['beds'] = propertyStore.property.beds;
  data.value['property'] = propertyStore.property.name;
  data.value['source'] = 'Property+';

  const clonnedData = { ...data.value }

  emit("create", clonnedData);
  data.value = {};
  closeModal()
}
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