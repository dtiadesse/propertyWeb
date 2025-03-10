<template>
  <PropertyItemTransactionsAddTransaction @create="handleTransactionCreation" />
  <div class="slds-grid slds-wrap">
    <div class="slds-col slds-size_12-of-12 slds-text-align_right">
      <div class="slds-button-group">
        <button class="slds-button slds-button_neutral" @click="showAddTransactionPopup">Create New Transaction</button>
      </div>
    </div>
    <div class="slds-col slds-size_12-of-12 slds-p-vertical_small">
      <div v-if="!propertyStore.property.transactions || propertyStore.property.transactions.length === 0"
        class="slds-box no-records">No Transactions found.</div>
      <UiItemDataTable v-else :enable-scroll="true" :columns="columns" :data="transactions" :isLoading="false"
        :show-action="true" @trigger-action="navigateToDetails" @delete="handleTransactionDelete" />


    </div>
  </div>
</template>

<script lang="ts" setup>

const globalState = useMyGlobalStateStore()

const propertyStore = useMyPropertyStore()

const emit = defineEmits(['toggleView'])

const transactions = computed(() => propertyStore.property.transactions.map((p: any) => ({
  id: p.id,
  name: p.name,
  seller: p.sellerCompany?.Name,
  property: p.property,
  propertyType: p.propertyType,
  yearBuilt: p.yearBuilt,
  numberOfUnits: p.numberOfUnits
})))


const showAddTransactionPopup = () => {
  globalState.openModal('Add_Transaction');
}

const navigateToDetails = (event: any) => {
  emit("toggleView", ["detail", event.row.id])
}

const columns = [
  { name: 'id', label: "Id", type: "key", },
  { name: 'name', label: "Transaction", type: "string", sort: true, triggerAction: true },
  { name: 'seller', label: "Seller Company", type: "string", sort: true },
  { name: 'property', label: "Property", type: "string", sort: true },
  { name: 'propertyType', label: "Type", type: "string", sort: true },
  { name: 'yearBuilt', label: "Year Built", type: "string", sort: true },
  { name: 'numberOfUnits', label: "Units", type: "string", sort: true },
]

const handleTransactionCreation = (event: any) => {
  propertyStore.createTransaction(event);
}

const handleTransactionDelete = (event: any) => {
  propertyStore.deleteTransaction(event.record.id);
}

</script>

<style scoped>
.no-records {
  background: #f3f3f3;
  width: 100%;
}
</style>
