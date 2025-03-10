<template>
  <div class="container">
    <div class="head">
      <span class="slds-icon_container null slds-icon__svg--default"><svg
          class="slds-icon slds-icon-text-default test-class" aria-hidden="true">
          <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#favorite"></use>
        </svg></span>
      Unit Features

    </div>
    <div class="inner-content">
      <span class="info">Choose Unit Features from the dropdown list or start typing to add new ones.</span>
      <div class="slds-grid grid-form slds-wrap">
        <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
          <label class="slds-form-element__label">New Unit Feature</label>
          <UiItemAutoComplete :required="false" :selected="feature" :edit-mode="true" :model="'feature'"
            @item-selected="handleFeatureSelected" :reset="reset" @input-changed="handleFeatureAdded" />
          <div class="slds-form-element" style="margin-top: 0.5rem;">
            <div class="slds-form-element__control">
              <div class="slds-checkbox">
                <input v-model="selectUnit" type="checkbox" name="options" id="select-unit-01" value="select-unit-01"
                  @change="handleSelectUnit" />
                <label class="slds-checkbox__label" for="select-unit-01">
                  <span class="slds-checkbox_faux"></span>
                  <span class="slds-form-element__label">Select Units</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small" style="text-align: right;">
          <label class="slds-form-element__label">Details</label>
          <UiItemInputBox label="" edit-mode="true" @input-changed="handleInputChange" :value="details" />
          <button class="slds-button slds-button_outline-brand add-btn" @click="addFeature">Add Feature</button>
        </div>

      </div>

      <div v-if="propertyStore.property.features.length > 0" class="slds-grid slds-wrap grid-list">
        <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
          <label class="slds-form-element__label">Unit Feature</label>
        </div>
        <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small" style="text-align: right;">
          <label class="slds-form-element__label">Details</label>

        </div>
        <template v-for="(item, index) in propertyStore.property.features">
          <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small"
            :class="{ 'listitem': config.config.value.editMode }">
            <UiItemInputBox :editable="true" label="" :value="item.name"
              @input-changed="handleFeatureSelected($event, index)" />


            <div class="slds-form-element" style="margin-top: 0.5rem;">
              <div class="slds-form-element__control">
                <div class="slds-checkbox">
                  <input type="checkbox" name="options" :id="'select-unit-' + index" :value="'select-unit-' + index"
                    :disabled="!config.config.value.editMode" :checked="item.selectUnits" v-model="item.selectUnits" />
                  <label class="slds-checkbox__label" :for="'select-unit-' + index">
                    <span class="slds-checkbox_faux"></span>
                    <span class="slds-form-element__label">Select Units</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div
            :class="{ 'slds-size_5-of-12 listitem': config.config.value.editMode, 'slds-size_6-of-12': !config.config.value.editMode }"
            class="slds-col slds-p-around_xx-small" style="text-align: right;">
            <UiItemInputBox label="" :value="item.description" @input-changed="handleInputChange($event, index)" />
          </div>


          <div class="slds-col slds-size_1-of-12 close-container" v-if="config.config.value.editMode">
            <span class="slds-icon_container slds-icon-action-close slds-icon_container_circle"
              @click="removeItem(index)" style="cursor: pointer;">
              <svg class="slds-icon slds-icon_small" aria-hidden="true">
                <use xlink:href="/assets/icons/action-sprite/svg/symbols.svg#close"></use>
              </svg>
            </span>

          </div>
        </template>
      </div>
      <div v-else class="slds-box no-records">
        No Unit Features added.
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
const propertyStore = useMyPropertyStore()

const newFeature: any = ref('')
const selectUnit: any = ref(false)
const details = ref('')
const feature = ref('')
const config = useConfig();

const reset: any = ref('')


const handleInputChange = (item: any, index: number = -1) => {
  if (index >= 0) {
    propertyStore.property.features[index]!.description = item;
  }
  else {
    details.value = item;
  }
}

const handleFeatureSelected = (item: any, index: number = -1) => {
  if (index >= 0) {
    propertyStore.property.features[index]!.name = item;
  }
  else {
    feature.value = item.Name || item;
    newFeature.value = "";
  }
}

const handleFeatureAdded = (item: any, index: number = -1) => {
  feature.value = item;
  newFeature.value = item;
}

const addFeature = () => {
  const ufValue = feature.value.trim();
  const detailsValue = details.value.trim();
  if (ufValue) {
    propertyStore.property.features.push({ name: feature.value, description: detailsValue, selectUnits: selectUnit.value });

    if (newFeature.value) {
      const Id = newFeature.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
      propertyStore.amenityFeature.push({ "Id": Id, type: "feature", Name: newFeature.value });
      newFeature.value = "";
    }

    feature.value = '';
    details.value = '';
    reset.value = new Date();
    config.config.value.editMode = true;
  }
}

const removeItem = (index: any) => {
  propertyStore.property.features.splice(index, 1)
}

const handleSelectUnit = () => {
  // console.log(selectUnit)
}

</script>

<style scoped>
.container {
  background: #F3F3F3;
}

.info {
  font-size: 13px;
}

.head {
  background: #FFF1EA;
  border-bottom: 2px solid #A96404;
  padding: 0.5rem 0.7rem;
  font-size: 16px;
  font-weight: 400;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.slds-icon {
  width: 1rem;
  margin-right: 0.5rem;
}

.inner-content {
  padding: 0.5rem;
}

.inner-content .slds-form-element__label {
  font-weight: 700;
  width: 100%;
  text-align: left;
}

.add-btn {
  margin-top: 1rem;
}

.grid-form {
  margin-top: 0.75rem;
  border-bottom: 1px solid #E5E5E5;
  padding-bottom: 0.65rem;
}

.listitem {
  border-bottom: 1px solid #E5E5E5;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.slds-icon-action-close {
  background-color: var(--primary-color);
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5rem;
  height: 1.5rem;
}

.slds-icon-action-close .slds-icon {
  width: 1rem;
  height: 1rem;
  margin: 0;
}

.close-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
}

.no-records {
  margin-bottom: 0;
  width: 100%;
}
</style>