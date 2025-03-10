<template>
  <div class="container">
    <div class="inner-content">
      <div class="slds-grid slds-wrap fees-form">
        <div class="slds-col slds-size_3-of-12 slds-p-around_xx-small">
          <label class="slds-form-element__label">New Fee</label>
          <UiItemAutoComplete :required="false" :edit-mode="true" :model="'fees'" @input-changed="handleNewFees"
            @item-selected="handleNewFees" :reset="resetFeeRef" />
        </div>
        <div class="slds-col slds-size_2-of-12 slds-p-around_xx-small">
          <label class="slds-form-element__label">Amount ($)</label>
          <UiItemInputBox :placeholder="'0.00'" label="" :edit-mode="true" @input-changed="handleNewFeeAmount"
            :value="newFeeAmountRef" :type="'number'" />
        </div>
        <div class="slds-col slds-size_2-of-12 slds-p-around_xx-small">
          <div class="slds-form-element custom-checkbox">
            <label class="slds-form-element__label" for="checkbox-unique-id-01">Included</label>
            <div class="slds-form-element__control centered-checkbox">
              <span class="slds-checkbox slds-checkbox_standalone">
                <input type="checkbox" id="checkbox-unique-id-01" name="label" value="option" :checked="false"
                  v-model="includedRef" />
                <span class="slds-checkbox_faux"></span>
              </span>
            </div>
          </div>
        </div>
        <div class="slds-col slds-size_2-of-12 slds-p-around_xx-small">
          <div class="slds-form-element custom-checkbox">
            <label class="slds-form-element__label" for="checkbox-unique-id-02">Optional</label>
            <div class="slds-form-element__control centered-checkbox">
              <span class="slds-checkbox slds-checkbox_standalone">
                <input type="checkbox" id="checkbox-unique-id-02" name="label" value="option" :checked="false"
                  v-model="optionalRef" />
                <span class="slds-checkbox_faux"></span>
              </span>
            </div>
          </div>
        </div>
        <div class="slds-col slds-size_3-of-12 slds-p-around_xx-small"
          style="align-self: center;padding-top: 2rem;text-align: right;">
          <button class="slds-button slds-button_outline-brand add-btn" @click="addFees">Add New Fee to the
            list</button>
        </div>
        <div class="slds-col slds-size_8-of-12 slds-p-around_xx-small">
          <span class="info">If you don't see a fee on the list, you can <b>type in</b> your own.</span>
          <br />
          <span class="info">Fee is going to <b>show on the report</b> once the <b>Amount ($)</b> is there.</span>
        </div>
      </div>

      <div v-if="propertyStore.property.rentSurveys[propertyStore.surveySelected].fees?.length > 0"
        class="slds-grid slds-wrap fees-form" style="margin-top: 1rem;">
        <template v-for="(item, index) of propertyStore.property.rentSurveys[propertyStore.surveySelected].fees">
          <div class="slds-col slds-size_3-of-12 slds-p-around_xx-small">
            <label class="slds-form-element__label">Fee</label>
            <UiItemInputBox :value="item.type" :required="false" :edit-mode="true"
              @input-changed="updateFeeRecord($event, item, index, 'type')" />
          </div>
          <div class="slds-col slds-size_2-of-12 slds-p-around_xx-small">
            <label class="slds-form-element__label">Amount ($)</label>
            <UiItemInputBox :type="'number'" :value="item.amount" :placeholder="'0.00'" label="" :edit-mode="true"
              @input-changed="updateFeeRecord($event, item, index, 'amount')" />
          </div>
          <div class="slds-col slds-size_2-of-12 slds-p-around_xx-small">
            <div class="slds-form-element custom-checkbox">
              <label class="slds-form-element__label" :for="'checkbox-included-id-' + index">Included</label>
              <div class="slds-form-element__control centered-checkbox">
                <span class="slds-checkbox slds-checkbox_standalone">
                  <input type="checkbox" :id="'checkbox-included-id-' + index" :name="'checkbox-included-id-' + index"
                    value="option" :checked="item.included"
                    @change="updateFeeRecord($event, item, index, 'included')" />
                  <span class="slds-checkbox_faux"></span>
                </span>
              </div>
            </div>
          </div>
          <div class="slds-col slds-size_2-of-12 slds-p-around_xx-small">
            <div class="slds-form-element custom-checkbox">
              <label class="slds-form-element__label" :for="'checkbox-optional-id-' + index">Optional</label>
              <div class="slds-form-element__control centered-checkbox">
                <span class="slds-checkbox slds-checkbox_standalone">
                  <input type="checkbox" :id="'checkbox-optional-id-' + index" :name="'checkbox-optional-id-' + index"
                    value="option" :checked="item.optional"
                    @change="updateFeeRecord($event, item, index, 'optional')" />
                  <span class="slds-checkbox_faux"></span>
                </span>
              </div>
            </div>
          </div>
          <div class="slds-col slds-size_3-of-12 slds-p-around_xx-small" style="align-self: center;
    padding-top: 1.5rem; text-align: right;">
            <button class="slds-button slds-button_outline-brand add-btn" @click="deleteFees(index)">Delete</button>
          </div>
        </template>
      </div>
      <div v-else class="slds-box no-records">Nothing added yet.</div>
    </div>
  </div>
</template>

<script lang="ts" setup>

const propertyStore = useMyPropertyStore();
const config = useConfig();

const includedRef: any = ref(false)
const optionalRef: any = ref(false)
const newFeeRef: any = ref('')
const newFeeAmountRef: any = ref(null)
const resetFeeRef: any = ref('')

const handleNewFees = (event: any) => {

  newFeeRef.value = event.Name || event;
}


const handleNewFeeAmount = (event: any) => {
  newFeeAmountRef.value = event
}

const addFees = () => {
  const fee = { type: newFeeRef.value, amount: newFeeAmountRef.value, included: includedRef.value, optional: optionalRef.value }
  propertyStore.property.rentSurveys[propertyStore.surveySelected].fees.push(fee);
  resetFeeRef.value = new Date();
  newFeeAmountRef.value = '';
  includedRef.value = false;
  optionalRef.value = false;
  config.config.value.editMode = true;
}

const updateFeeRecord = (event: any, item: any, index: any, key: any) => {
  if (typeof event === 'object') {
    event = event.target.checked;
  }
  propertyStore.property.rentSurveys[propertyStore.surveySelected].fees[index][key] = event;
  config.config.value.editMode = true;
}

const deleteFees = (index: any) => {
  propertyStore.property.rentSurveys[propertyStore.surveySelected].fees.splice(index, 1);
  config.config.value.editMode = true;
}

onMounted(() => {
  if (!propertyStore.property.rentSurveys[propertyStore.surveySelected].fees) {
    propertyStore.property.rentSurveys[propertyStore.surveySelected].fees = []
  }
})

</script>

<style scoped>
.container {
  background: #F3F3F3;
  margin-top: -0.75rem;
  padding: 1rem;
}

.info {
  font-size: 11px;
}

.custom-checkbox label {
  text-align: center;
  width: 100%;
}

.centered-checkbox {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
  text-align: center;
}

.fees-form {
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #C9C9C9;
  margin-bottom: 0.5rem;
}

.fees-form .slds-form-element__label {
  font-weight: 700;
  margin-bottom: 0.35rem;
}

.fees-form .custom-checkbox .slds-checkbox {
  position: relative;
}

.fees-form .custom-checkbox .slds-checkbox input[type="checkbox"] {
  position: absolute;
  left: 0;
  top: 0;
}

.no-records {
  width: 100%;
}
</style>