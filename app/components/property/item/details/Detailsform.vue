<template>
  <div class="slds-grid slds-wrap slds-gutters_direct-x-small">
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemInputBox label="Property/Building Name" name="name" :value="propertyStore.property.name"
        :required="propertyStore.propertySchema.name.required" :has-error="propertyStore.propertySchema.name.error" />
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small"></div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemComboBox label="Property Type" name="propertyType"
        :required="propertyStore.propertySchema.propertyType.required"
        :has-error="propertyStore.propertySchema.propertyType.error" :selected="propertyStore.property.propertyType"
        :values="propertyStore.options.propertyType" @selected="handleTypeSelected" />
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemComboBox label="Property Sub-Type" name="propertySubType" :required="false"
        :selected="propertyStore.property.propertySubType" :values="propertySubType" />
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small" style="align-self: center;">
      <UiItemCheckbox label="Mixed Use" name="mixedUse" :required="false" :selected="propertyStore.property.mixedUse"
        @value-changed="handleMixedUse" />

    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemComboBox v-show="propertyStore.property.mixedUse" label="Secondary Property Type"
        name="secondaryPropertyType" :required="propertyStore.propertySchema.secondaryPropertyType.required"
        :has-error="propertyStore.propertySchema.secondaryPropertyType.error"
        :selected="propertyStore.property.secondaryPropertyType"
        :values="propertyStore.options.secondaryPropertyType" />
    </div>


    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemComboBox label="Class" name="buildingClass" :required="propertyStore.propertySchema.buildingClass.required"
        :has-error="propertyStore.propertySchema.buildingClass.error" :selected="propertyStore.property.buildingClass"
        :values="propertyStore.options.class_options" />
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small"></div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemComboBox label="Configuration" name="configuration" :required="false"
        :selected="propertyStore.property.configuration" :values="propertyStore.options.config_options" />
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemComboBox label="Designation" name="designation" :required="false"
        :selected="propertyStore.property.designation" :values="propertyStore.options.desig_options" />
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemComboBox label="Intended Use" name="intendedUse" :required="false"
        :selected="propertyStore.property.intendedUse" :values="propertyStore.options.use_options"
        @selected="handleUseSelected" />
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemComboBox label="Intended Sub-use" name="intendedSubUse" :required="false"
        :selected="propertyStore.property.intendedSubUse" :values="subUse" />
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemComboBox label="Rate" name="rate" :required="false" :values="propertyStore.options.rate"
        :selected="propertyStore.property.rate" @selected="handleRateSelected" />
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemComboBox label="Rate Detail" name="rateDetail" :required="false" :values="rateDetail"
        :selected="propertyStore.property.rateDetail" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const propertyStore = useMyPropertyStore();

const propertySubType: any = ref([])

const subUse: any = ref([])

const rateDetail: any = ref([])

const secondaryPropertyType: any = ref([])

const mixedUse = ref(null)

const propertyType = ref(null)

const config = useConfig();

watch(() => config.config.value.editMode, (val) => {
  if (val === true) {
    handleMixedUse(propertyStore.property.mixedUse, false);
    handleTypeSelected(propertyStore.property.propertyType, false);
    handleUseSelected(propertyStore.property.intendedUse, false);
    handleRateSelected(propertyStore.property.rate, false);
  }
});


const handleMixedUse = (event: any, changed: any = true) => {
  mixedUse.value = event;
  if (event) {
    secondaryPropertyType.value = propertyStore.options.secondaryPropertyType;
  }
  else if (propertyType.value === "Land") {
    secondaryPropertyType.value = propertyStore.options.secondaryPropertyType;
  }
  else {
    secondaryPropertyType.value = []
  }

  if (changed === true) {
    propertyStore.property.secondaryPropertyType = "";
  }
}

const handleTypeSelected = (event: any, changed: any = true) => {

  propertyType.value = event;

  propertySubType.value = propertyStore.options.propertySubType.filter(st => st.parent === event)
  if (changed === true) {
    propertyStore.property.propertySubType = "";
  }
  if (event === 'Land') {
    secondaryPropertyType.value = propertyStore.options.secondaryPropertyType;
  }
  else if (propertyStore.property.mixedUse || mixedUse.value) {
    secondaryPropertyType.value = propertyStore.options.secondaryPropertyType;
  }
  else {
    secondaryPropertyType.value = []
  }
}

const handleUseSelected = (event: any, changed: any = true) => {
  if (changed === true) {
    propertyStore.property.intendedSubUse = "";
  }
  subUse.value = propertyStore.options.sub_use_options.filter(su => su.parent === event)

}

const handleRateSelected = (event: any, changed: any = true) => {
  if (changed === true) {
    propertyStore.property.rateDetail = "";
  }
  rateDetail.value = propertyStore.options.rateDetail.filter(rd => rd.parent === event)
}
</script>

<style></style>