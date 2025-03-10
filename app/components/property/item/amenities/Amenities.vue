<template>
  <div class="container">
    <div class="head">
      <span class="slds-icon_container null slds-icon__svg--default"><svg
          class="slds-icon slds-icon-text-default test-class" aria-hidden="true">
          <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#home"></use>
        </svg></span>
      Property Amenities
    </div>
    <div class="inner-content">
      <span class="info">Choose Amenities from the dropdown list or start typing to add new ones.</span>
      <div class="slds-grid grid-form">
        <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
          <label class="slds-form-element__label">New Amenity</label>
          <UiItemAutoComplete :required="false" :selected="amenity" :edit-mode="true" :model="'amenity'"
            @item-selected="handleAmenitySelected" :reset="reset" @input-changed="handleAmenityAdded" />
        </div>
        <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small" style="text-align: right;">
          <label class="slds-form-element__label">Details</label>
          <UiItemInputBox label="" :value="details" edit-mode="true" @input-changed="handleInputChange" />

          <button class="slds-button slds-button_outline-brand add-btn" @click="addAmenity">Add Amenity</button>
        </div>
      </div>
      <div v-if="propertyStore.property.amenities.length > 0" class="slds-grid slds-wrap grid-list">
        <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
          <label class="slds-form-element__label">Amenities</label>
        </div>
        <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small" style="text-align: right;">
          <label class="slds-form-element__label">Details</label>

        </div>
        <template v-for="(item, index) in propertyStore.property.amenities">
          <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small"
            :class="{ 'listitem': config.config.value.editMode }">
            <!-- <ComboBox :editable="true" label="" :selected="item.name" :values="amenitiesList"
              @selected="handleAmenitySelected($event, index)" /> -->

            <UiItemInputBox :editable="true" label="" :value="item.name"
              @input-changed="handleAmenitySelected($event, index)" />

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
        No Amenities added.
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>

const details = ref('')
const amenity = ref('')
const newAmenity = ref('')

const reset: any = ref('')

const propertyStore = useMyPropertyStore()

const config = useConfig();

const handleInputChange = (item: any, index: number = -1) => {
  if (index >= 0) {
    propertyStore.property.amenities[index]!.description = item;
  }
  else {
    details.value = item;
  }
}

const handleAmenitySelected = (item: any, index: number = -1) => {
  if (index >= 0) {
    propertyStore.property.amenities[index]!.name = item;
  } else {
    amenity.value = item.Name || item;
    newAmenity.value = "";
  }
}

const handleAmenityAdded = (item: any, index: number = -1) => {
  amenity.value = item;
  newAmenity.value = item
}

const addAmenity = () => {
  const amValue = amenity.value.trim();
  const detailsValue = details.value.trim();
  if (amValue) {
    propertyStore.property.amenities.push({ name: amValue, description: detailsValue });

    if (newAmenity.value) {
      const Id = newAmenity.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
      propertyStore.amenityFeature.push({ "Id": Id, type: "amenity", Name: newAmenity.value });
      newAmenity.value = "";
    }

    amenity.value = '';
    details.value = '';
    reset.value = new Date();
    config.config.value.editMode = true;
  }
}

const removeItem = (index: any) => {
  propertyStore.property.amenities.splice(index, 1)
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
  background: #EEF4FF;
  border-bottom: 2px solid #014486;
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