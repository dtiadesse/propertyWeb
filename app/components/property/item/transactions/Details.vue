<template>
  <div class="slds-grid slds-wrap">

    <div class="slds-col slds-size_12-of-12 ">
      <nav role="navigation" aria-label="Breadcrumbs">
        <ol class="slds-breadcrumb slds-list_horizontal slds-wrap">
          <li class="slds-breadcrumb__item">
            <a href="javascript:;" @click.prevent="showDetails">Transactions</a>
          </li>
          <li class="slds-breadcrumb__item">
            <a v-if="transaction" href="javascript:;">{{ transaction?.name }}</a>
          </li>
        </ol>
      </nav>
    </div>
    <div class="slds-col slds-size_12-of-12 edit-form">
      <UiItemExpandableSection :label="'Transaction'">
        <div class="slds-grid slds-wrap">
          <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
            <UiItemInputBox label="Transaction Name" :value="transaction.name"
              @input-changed="updateModel($event, 'name')" />
          </div>
          <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
            <UiItemCheckbox label="Is this Confidential?" :selected="transaction.confidential"
              @value-changed="updateModel($event, 'confidential')" :value="'Yes'" />
          </div>
          <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
            <UiItemValueBox label="Property" :value="transaction.property" :show-edit-icon="false" />
          </div>
          <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
          </div>
          <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
            <UiItemComboBox label="Status" :values="propertyStore.options.transactionStatus"
              :selected="transaction.status" @selected="updateModel($event, 'status')" />
          </div>
          <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
            <UiItemInputBox :type="'number'" label="Occupancy" :value="transaction.occupancy"
              @input-changed="updateModel($event, 'occupancy')" />
          </div>
          <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
            <UiItemComboBox label="Type" :values="propertyStore.options.transactionTypes"
              :selected="transaction.propertyType" @selected="updateModel($event, 'propertyType')" />
          </div>
          <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
          </div>
          <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
            <UiItemDatePicker label="Closing Date" :value="transaction.closingDate"
              @date-selected="updateModel($event, 'closingDate')" />
          </div>

          <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
            <UiItemInputBox :type="'number'" label="Pre-leased" :value="transaction.preLeased"
              @input-changed="updateModel($event, 'preLeased')" />
          </div>

          <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
            <UiItemInputBox :type="'number'" label="Sale Price" :value="transaction.salePrice"
              @input-changed="updateModel($event, 'salePrice')" />
          </div>
          <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
          </div>

          <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
            <UiItemInputBox :type="'number'" label="Cap Rate (%)" :value="transaction.capRate"
              @input-changed="updateModel($event, 'capRate')" />
          </div>
          <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
          </div>
        </div>
      </UiItemExpandableSection>

      <UiItemExpandableSection :label="'Statistics'">
        <div class="slds-grid slds-wrap">
          <div class="slds-col slds-size_4-of-12 slds-p-around_xx-small">
            <UiItemInputBox label="Units" :value="transaction.numberOfUnits"
              @input-changed="updateModel($event, 'numberOfUnits')" />
          </div>
          <div class="slds-col slds-size_4-of-12 slds-p-around_xx-small">
            <UiItemValueBox :value="transaction.pricePerUnit" label="Price Per Unit ($)" :show-edit-icon="false" />
          </div>
          <div class="slds-col slds-size_4-of-12 slds-p-around_xx-small">
          </div>

          <div class="slds-col slds-size_4-of-12 slds-p-around_xx-small">
            <UiItemInputBox label="Square Feet" :value="transaction.buildingSizeSqFt"
              @input-changed="updateModel($event, 'buildingSizeSqFt')" />
          </div>
          <div class="slds-col slds-size_4-of-12 slds-p-around_xx-small">
            <UiItemValueBox :value="transaction.pricePerSqFt" label="Price Per Square Feet ($)"
              :show-edit-icon="false" />
          </div>
          <div class="slds-col slds-size_4-of-12 slds-p-around_xx-small">
          </div>


          <div class="slds-col slds-size_4-of-12 slds-p-around_xx-small">
            <UiItemInputBox label="Acres" :value="transaction.sizeAcres"
              @input-changed="updateModel($event, 'sizeAcres')" />
          </div>
          <div class="slds-col slds-size_4-of-12 slds-p-around_xx-small">
            <UiItemValueBox :value="transaction.pricePerAcre" label="Price Per Acre ($)" :show-edit-icon="false" />
          </div>
          <div class="slds-col slds-size_4-of-12 slds-p-around_xx-small">
            <UiItemValueBox :value="transaction.unitPerAcre" label="Units Per Acre" :show-edit-icon="false" />
          </div>

          <div class="slds-col slds-size_4-of-12 slds-p-around_xx-small">
            <UiItemInputBox label="Beds" :value="transaction.beds" @input-changed="updateModel($event, 'beds')" />
          </div>
          <div class="slds-col slds-size_4-of-12 slds-p-around_xx-small">
            <UiItemValueBox :value="transaction.pricePerBed" label="Price Per Bed ($)" :show-edit-icon="false" />
          </div>
          <div class="slds-col slds-size_4-of-12 slds-p-around_xx-small">
          </div>


        </div>
      </UiItemExpandableSection>

      <UiItemExpandableSection :label="'Contacts & Other'">
        <div class="slds-grid slds-wrap">
          <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
            <UiItemAutoComplete label="Seller's Company" :selected="transaction.sellerCompany?.Name" :edit-mode="false"
              :model="'company'" @item-selected="updateModel($event, 'sellerCompany')"
              :sf-object="transaction.sellerCompany" />
          </div>
          <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
            <UiItemAutoComplete label="Seller's Contact" :edit-mode="false" :selected="transaction.sellerContact?.Name"
              :model="'contact'" @item-selected="updateModel($event, 'sellerContact')"
              :sf-object="transaction.sellerContact" />
          </div>

          <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
            <UiItemAutoComplete label="Co-seller's Company" :edit-mode="false"
              :selected="transaction.coSellerCompany?.Name" :model="'company'"
              @item-selected="updateModel($event, 'coSellerCompany')" :sf-object="transaction.coSellerCompany" />
          </div>
          <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
            <UiItemAutoComplete label="Co-seller's Contact" :edit-mode="false"
              :selected="transaction.coSellerContact?.Name" :model="'contact'"
              @item-selected="updateModel($event, 'coSellerContact')" :sf-object="transaction.coSellerContact" />
          </div>

          <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
            <UiItemAutoComplete label="Buyer's Company" :edit-mode="false" :selected="transaction.buyerCompany?.Name"
              :model="'company'" @item-selected="updateModel($event, 'buyerCompany')"
              :sf-object="transaction.buyerCompany" />
          </div>
          <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
            <UiItemAutoComplete label="Buyer's Contact" :edit-mode="false" :selected="transaction.buyerContact?.Name"
              :model="'contact'" @item-selected="updateModel($event, 'buyerContact')"
              :sf-object="transaction.buyerContact" />
          </div>

          <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
            <UiItemAutoComplete label="Co-Buyer's Company" :edit-mode="false"
              :selected="transaction.coBuyerCompany?.Name" :model="'company'"
              @item-selected="updateModel($event, 'coBuyerCompany')" :sf-object="transaction.coBuyerCompany" />
          </div>
          <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
            <UiItemAutoComplete label="Co-Buyer's Contact" :edit-mode="false"
              :selected="transaction.coBuyerContact?.Name" :model="'contact'"
              @item-selected="updateModel($event, 'coBuyerContact')" :sf-object="transaction.coBuyerContact" />
          </div>

          <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
            <UiItemAutoComplete label="Brokered By" :edit-mode="false" :selected="transaction.brokeredBy?.Name"
              :model="'company'" @item-selected="updateModel($event, 'brokeredBy')"
              :sf-object="transaction.brokeredBy" />
          </div>
          <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
            <UiItemCheckbox label="In House" :selected="transaction.inHouse"
              @value-changed="updateModel($event, 'inHouse')" :value="'Yes'" />
          </div>

          <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
            <UiItemCheckbox label="Loan Assumption" :selected="transaction.loanAssumption"
              @value-changed="updateModel($event, 'loanAssumption')" :value="'Yes'" />
          </div>

          <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
            <UiItemValueBox label="Source" :value="transaction.source" :show-edit-icon="false" />
          </div>

          <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
            <UiItemTextArea label="Sales Report Comments" :value="transaction.saleReportComments"
              @input-changed="updateModel($event, 'saleReportComments')" />
          </div>
        </div>
      </UiItemExpandableSection>
    </div>
  </div>



</template>

<script lang="ts" setup>
const propertyStore = useMyPropertyStore()

const props = defineProps(['id'])

const transaction: Transaction | any = ref({});

const emit = defineEmits(['toggleView'])

const showDetails = () => {
  emit("toggleView", ["list", 0])
}


const updateModel = (event: any, key: any) => {
  if (key === 'closingDate') {
    event = event
  }
  else if (key === 'confidential' || key === 'loanAssumption' || key === 'inHouse') {
    if (event === true) {
      event = "Yes";
    }
    else {
      event = "No"
    }
  }

  transaction.value[key] = event;
}

watch(() => [transaction.value.salePrice, transaction.value.numberOfUnits, transaction.value.buildingSizeSqFt, transaction.value.sizeAcres, transaction.value.beds], (arrObj: any[]) => {
  const [sp, numberOfUnits, buildingSizeSqFt, sizeAcres, beds] = arrObj
  if (sp && sp > 0) {
    transaction.value.pricePerUnit = (isFinite(sp / transaction.value.numberOfUnits) ? sp / transaction.value.numberOfUnits : 0).toFixed(2);
    transaction.value.pricePerSqFt = (isFinite(sp / transaction.value.buildingSizeSqFt) ? sp / transaction.value.buildingSizeSqFt : 0).toFixed(2);
    transaction.value.pricePerAcre = (isFinite(sp / transaction.value.sizeAcres) ? sp / transaction.value.sizeAcres : 0).toFixed(2);
    transaction.value.unitPerAcre = (isFinite(transaction.value.numberOfUnits / transaction.value.sizeAcres) ? (transaction.value.numberOfUnits / transaction.value.sizeAcres) : 0).toFixed(2);
    transaction.value.pricePerBed = (isFinite(sp / transaction.value.beds) ? (sp / transaction.value.beds) : 0).toFixed(2);
  }
  else {
    transaction.value.pricePerUnit = 0;
    transaction.value.pricePerSqFt = 0;
    transaction.value.pricePerAcre = 0;
    transaction.value.unitPerAcre = 0;
    transaction.value.pricePerBed = 0;
  }

});

onMounted(() => {
  transaction.value = propertyStore.property.transactions.find((t: any) => t.id === props.id)
});

</script>

<style scoped>
.edit-form {
  margin-top: 1rem;
}
</style>
