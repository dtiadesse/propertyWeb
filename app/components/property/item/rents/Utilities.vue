<template>
  <div class="container">
    <div class="inner-content">
      <div class="slds-grid slds-wrap utility-form">
        <div class="slds-col slds-size_3-of-12 slds-p-around_xx-small">
          <label class="slds-form-element__label">Utility</label>
          <UiItemAutoComplete :required="false" :selected="utility" :edit-mode="true" :model="''"
            @input-changed="handleUserAddedUtility" :reset="utilityReset" :hide-search="true" />
        </div>
        <div class="slds-col slds-size_3-of-12 slds-p-around_xx-small">
          <label class="slds-form-element__label">Paid By</label>
          <UiItemComboBox label="" :values="paidBy" :edit-mode="true" @selected="handleUserAddedPaidBySelected"
            :selected="utilityPaidBy" />
        </div>
        <div class="slds-col slds-size_3-of-12 slds-p-around_xx-small" style="padding: 1.8rem 0 0 2rem;">
          <button class="slds-button slds-button_outline-brand add-btn" @click="addUtility">Add to the list</button>
        </div>
        <div class="slds-col slds-size_8-of-12 slds-p-around_xx-small">
          <span class="info">Tip: If you don't see a utility on the list, you can add your own.</span>
        </div>
      </div>
      <div class="slds-grid slds-wrap">
        <template v-for="(item, i) of propertyStore.options.utilities">
          <div class="slds-col slds-size_2-of-12 utility-col">
            <label v-if="i === 0 || i === 1" class="slds-form-element__label">Utility</label>
            <div class="utility-name">{{ item.name }}</div>
          </div>
          <div class="slds-col slds-size_3-of-12 paidby-col" :class="{ 'no-padding': i % 2 === 1 }">
            <label v-if="i === 0 || i === 1" class="slds-form-element__label">Paid By</label>
            <div class="paidby-value">
              <UiItemComboBox name="" label=""
                :selected="propertyStore.property.rentSurveys[propertyStore.surveySelected].utilities?.find((u: any) => u.name === item.name)?.paidBy"
                val :values="paidBy" @selected="handleInputChange($event, item.name)" />
            </div>
          </div>
          <div class="slds-col slds-size_1-of-12"></div>
        </template>
      </div>
      <div v-if="utilitiesAddedByUser?.length > 0" class="slds-grid slds-wrap slds-p-around_xx-small"
        style="margin-top: 1.5rem;">
        <div class="slds-col slds-size_12-of-12">
          <label class="slds-form-element__label" style="font-weight: 700;">Utilities Added By User</label>
        </div>
        <template v-for="(item, i) of utilitiesAddedByUser">
          <div class="slds-col slds-size_2-of-12 utility-col">
            <div class="utility-name">{{ item.name }}</div>
          </div>
          <div class="slds-col slds-size_3-of-12 paidby-col" :class="{ 'no-padding': i % 2 === 1 }">
            <div class="paidby-value">
              <UiItemComboBox name="" label="" :values="paidBy"
                :selected="propertyStore.property.rentSurveys[propertyStore.surveySelected].utilities.find((u: any) => u.name === item.name)?.paidBy"
                @selected="handleInputChange($event, item.name)" />
            </div>
          </div>
          <div class="slds-col slds-size_1-of-12 delete-col">

            <span v-if="config.config.value.editMode" style="cursor: pointer;" @click="deleteUserAddedUtility(item, i)"
              class="slds-icon_container slds-icon-action-close slds-icon_container_circle">
              <svg class="slds-icon slds-icon_small" aria-hidden="true">
                <use xlink:href="/assets/icons/action-sprite/svg/symbols.svg#close"></use>
              </svg>
            </span>

          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const propertyStore = useMyPropertyStore();
const config = useConfig();

const paidBy: any = ref([{ "label": "-", "value": "-" }, { "label": "Resident", "value": "Resident" }, { "label": "Property", "value": "Property" }])

const utility = ref('')
const utilityPaidBy = ref('')
const utilityReset: any = ref(null)

const utilitiesAddedByUser = computed(() => propertyStore.property.rentSurveys[propertyStore.surveySelected]?.utilities?.filter((u: any) => u.isUserAdded) || []);

const handleInputChange = (event: any, key: any) => {
  const utilities = propertyStore.property.rentSurveys[propertyStore.surveySelected].utilities;
  let idx = -1;
  if (utilities) {
    idx = utilities.findIndex((u: any) => u.name === key);
  }

  if (idx >= 0) {
    propertyStore.property.rentSurveys[propertyStore.surveySelected].utilities[idx].paidBy = event;
  }
  else {
    propertyStore.property.rentSurveys[propertyStore.surveySelected].utilities.push({ name: key, paidBy: event });
  }
}

const handleUserAddedUtility = ($event: any) => {
  utility.value = $event
}

const handleUserAddedPaidBySelected = ($event: any) => {
  utilityPaidBy.value = $event

}

const addUtility = () => {
  const utilValue = utility.value.trim();
  if (utilValue) {
    // propertyStore.updatedRentSurveys[propertyStore.surveySelected].utilities.push({ name: utilValue, paidBy: utilityPaidBy.value, isUserAdded: true });
    propertyStore.property.rentSurveys[propertyStore.surveySelected].utilities.push({ name: utilValue, paidBy: utilityPaidBy.value, isUserAdded: true });
    utility.value = "";
    utilityPaidBy.value = "";
    utilityReset.value = new Date();
    config.config.value.editMode = true;
  }
}

const deleteUserAddedUtility = (item: any, index: any) => {
  propertyStore.property.rentSurveys[propertyStore.surveySelected].utilities = propertyStore.property.rentSurveys[propertyStore.surveySelected].utilities.filter((i: any) => i.name !== item.name)
}

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

.utility-form {
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #C9C9C9;
  margin-bottom: 0.5rem;
}

.utility-form .slds-form-element__label {
  font-weight: 700;
}

.utility-col {
  padding: 0.75rem 0;
}

.utility-col label {
  font-weight: 700;
}


.utility-name {
  padding: 0.25rem 0;
}

.paidby-col {
  padding: 0.75rem 0;
  /* padding-right: 1rem; */
}

.paidby-col.no-padding {
  padding-right: 0;
}

.paidby-col label {
  font-weight: 700;

}

.slds-col.delete-col {
  padding-left: 0.75rem;
  justify-content: flex-start;
  align-items: center;
  display: flex;
  align-self: center;
}

.slds-icon-action-close {
  background-color: var(--primary-color);
}

.slds-icon_small {
  width: 0.85rem;
  height: 0.85rem;
}
</style>