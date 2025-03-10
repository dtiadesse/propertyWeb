<template>
  <div class="slds-grid slds-wrap slds-gutters_direct-x-small">
    <div class="slds-col slds-size_12-of-12 slds-p-around_xx-small">
      <UiItemValueBox label="Street" name="street" :required="false" :value="propertyStore.property.stdAddress1"
        :show-edit-icon="false" />
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemValueBox label="City" name="stdCity" :required="false" :value="propertyStore.property.stdCity"
        :show-edit-icon="false" />
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemValueBox label="State/Province" name="stdState" :required="false" :value="propertyStore.property.stdState"
        :show-edit-icon="false" />
    </div>


    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemValueBox label="Country" name="stdCountry" :required="false" :value="propertyStore.property.stdCountry"
        :show-edit-icon="false" />
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemValueBox label=" Zip/Postal Code" name="address.zip" :required="false"
        :value="propertyStore.property.stdPostalCode" :show-edit-icon="false" />
    </div>

    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemAutoComplete label="Market" name="market" :required="false" :selected="propertyStore.property.market"
        :edit-mode="false" :model="'market'" />
    </div>


    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemAutoComplete label="Sub-Market" name="subMarket" :required="false" :model="'sub-market'" :edit-mode="false"
        :selected="propertyStore.property.subMarket" />
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemComboBox label="Micro-Market" name="microMarket" :required="false"
        :selected="propertyStore.property.microMarket" :values="[]" />
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small"></div>

    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemValueBox label="County" name="stdCounty" :required="false" :value="propertyStore.property.stdCounty"
        :show-edit-icon="false" />
    </div>

    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemInputBox label="Borough" name="borough" :required="false" :value="propertyStore.property.borough" />
    </div>

    <!-- <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemInputBox label="Municipality" name="municipality" :required="false"
        :value="propertyStore.property.municipality" />
    </div> -->



    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemInputBox label="Township" name="township" :required="false" :value="propertyStore.property.township" />
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small"></div>

    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemInputBox label="Cross Street 1" name="crossStreet" :required="false"
        :value="propertyStore.property.crossStreet" />
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemInputBox label="Cross Street 2" name="crossStreet2" :required="false"
        :value="propertyStore.property.crossStreet2" />
    </div>

    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemValueBox label="Latitude" name="latitude" :required="false" :value="propertyStore.property.latitude"
        :show-edit-icon="false" />
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_xx-small">
      <UiItemValueBox label="Longitude" name="longitude" :required="false" :value="propertyStore.property.longitude"
        :show-edit-icon="false" />
    </div>

  </div>
</template>

<script lang="ts" setup>
const propertyStore = useMyPropertyStore();
</script>

<style></style>