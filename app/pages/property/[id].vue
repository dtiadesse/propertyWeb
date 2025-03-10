<script lang="ts" setup>

import { ModuleRegistry } from "ag-grid-community";
import { AllEnterpriseModule, LicenseManager } from "ag-grid-enterprise";

ModuleRegistry.registerModules([AllEnterpriseModule]);
LicenseManager.setLicenseKey("Using_this_{AG_Grid}_Enterprise_key_{AG-075091}_in_excess_of_the_licence_granted_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_changing_this_key_please_contact_info@ag-grid.com___{Cushman_&_Wakefield_U.S.,_Inc.}_is_granted_a_{Multiple_Applications}_Developer_License_for_{1}_Front-End_JavaScript_developer___All_Front-End_JavaScript_developers_need_to_be_licensed_in_addition_to_the_ones_working_with_{AG_Grid}_Enterprise___This_key_has_not_been_granted_a_Deployment_License_Add-on___This_key_works_with_{AG_Grid}_Enterprise_versions_released_before_{14_February_2026}____[v3]_[01]_MTc3MTAyNzIwMDAwMA==e2822cd7ded089b64f4338b9d41d9ffb");


import { useMyPropertyStore } from '~/stores/Property';
import type { Property } from '~~/models/property.model';

const config = useRuntimeConfig();
const toastStore = useToastStore()
const ppPropertyUrl = config.public.propertiesBaseUrl;
const propertyAssetStore = usePropertyAssetStore();

const propertyStore = useMyPropertyStore();

const route = useRoute()
const propertyId = route.params.id as string;
const propertyUri = `${ppPropertyUrl}/${propertyId}`;

// const { data, status, error, execute } = await useFetch(propertyUri, {
//   server: false,
//   immediate: false,
// });

onMounted(async () => {
  // await execute();
  // if (data) {
  // setPropertyAsset(data.value as Property)
  // }
})


propertyStore.getOptions();
propertyStore.getProperty(route.params.id);


const propertyTabs: any = [
  { "label": "Property Details", "name": "Property Details", "component": shallowRef(resolveComponent("property/item/tabs/DetailsTabs")), "is_active": true, "is_visible": true },
  { "label": "Construction", "name": "Construction", "component": shallowRef(resolveComponent("property/item/tabs/Construction")), "is_active": false, "is_visible": true },
  { "label": "Development", "name": "Development", "component": shallowRef(resolveComponent("property/item/tabs/Development")), "is_active": false, "is_visible": true },
  { "label": "Rents", "name": "Rents", "component": shallowRef(resolveComponent("property/item/tabs/Rents")), "is_active": false, "is_visible": true },
  { "label": "Amenities & Features", "name": "Amenities & Features", "component": shallowRef(resolveComponent("property/item/tabs/Amenities")), "is_active": false, "is_visible": true },
  { "label": "Photos", "name": "Photos", "component": shallowRef(resolveComponent("property/item/tabs/Photos")), "is_active": false, "is_visible": true },
  // { "label": "BOV", "name": "BOV", "component": null, "is_active": false, "is_visible": false },
  { "label": "Comparables", "name": "Comparables", "component": shallowRef(resolveComponent("property/item/tabs/Comparables")), "is_active": false, "is_visible": false },
  // { "label": "Projections", "name": "Projections", "component": null, "is_active": false, "is_visible": false },
  // { "label": "Loan", "name": "Loan", "component": null, "is_active": false, "is_visible": false },
  { "label": "Transactions", "name": "Transactions", "component": shallowRef(resolveComponent("property/item/tabs/Transactions")), "is_active": false, "is_visible": false },

]

</script>

<template>
  <div class="slds-notify_container slds-is-relative">
    <template v-for="toastItem in toastStore.toasts">
      <UiItemToast :item="toastItem" />
    </template>
  </div>
  <div v-if="!propertyStore.property.id">
    <UiLoadingSpinner />
  </div>
  <!-- <div v-else-if="status === 'error'">
    <p>{{ error.message }}</p>
  </div> -->
  <div v-if="propertyStore.property.id">
    <div class="slds-grid slds-p-horizontal_xx-small slds-wrap grid-container">
      <div class="slds-col slds-size_12-of-12 mt-2">
        <PropertyItemPageHeader :title="propertyStore.property.name" :address="propertyStore.property.stdAddress1" />
      </div>
      <div v-show="!propertyStore.isLoadingProperty"
        class="slds-col slds-size_4-of-12 slds-p-horizontal_small slds-p-top_medium">
        <PropertyItemPropertyInfo :property="propertyStore.property" />
        <PropertyItemMapBox v-if="propertyStore.property.name" :property="propertyStore.property" />
        <PropertyItemActivities />
      </div>
      <div v-show="!propertyStore.isLoadingProperty"
        class="slds-col slds-size_8-of-12 slds-p-right_small slds-p-top_medium">
        <div class="tabs-container">
          <div class="inner">
            <UiItemTabs :tabs="propertyTabs"></UiItemTabs>
          </div>
          <PropertyItemFormFooter />
        </div>
      </div>

    </div>

  </div>
</template>

<style scoped>
.grid-container {
  margin-bottom: 2rem;
}

.tabs-container {
  background: white;
  border: 1px solid #C9C9C9;
  border-radius: 3px;
  position: relative;

  .inner {
    padding: 0.75rem 0.75rem;
  }
}
</style>