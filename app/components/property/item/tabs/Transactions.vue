<template>
  <div class="slds-grid slds-wrap">
    <div v-if="transactionView === 'list'" class="slds-col slds-size_12-of-12">
      <PropertyItemTransactionsList @toggle-view="toggleView" />
    </div>
    <div v-if="transactionView === 'detail'" class="slds-col slds-size_12-of-12">
      <PropertyItemTransactionsDetails @toggle-view="toggleView" :id="transactionDetailsId" />
    </div>
  </div>

</template>

<script lang="ts" setup>
const transactionView: any = ref('list');
const transactionDetailsId = ref(null);

const toggleView = (event: any) => {
  const [page, id] = event;
  transactionDetailsId.value = id;
  transactionView.value = page;
}

</script>

<style scoped></style>
