<script lang="ts" setup>
import { ModuleRegistry } from "ag-grid-community";
import { AllEnterpriseModule, LicenseManager } from "ag-grid-enterprise";
ModuleRegistry.registerModules([AllEnterpriseModule]);
LicenseManager.setLicenseKey("Using_this_{AG_Grid}_Enterprise_key_{AG-075091}_in_excess_of_the_licence_granted_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_changing_this_key_please_contact_info@ag-grid.com___{Cushman_&_Wakefield_U.S.,_Inc.}_is_granted_a_{Multiple_Applications}_Developer_License_for_{1}_Front-End_JavaScript_developer___All_Front-End_JavaScript_developers_need_to_be_licensed_in_addition_to_the_ones_working_with_{AG_Grid}_Enterprise___This_key_has_not_been_granted_a_Deployment_License_Add-on___This_key_works_with_{AG_Grid}_Enterprise_versions_released_before_{14_February_2026}____[v3]_[01]_MTc3MTAyNzIwMDAwMA==e2822cd7ded089b64f4338b9d41d9ffb");
</script>

<template>

  <Head>
    <Title>Property+</Title>
  </Head>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<style>
html {
  background: #F3F3F3;
  overflow-y: scroll;
}

:root {
  --primary-color: #1f6477;
  --slds-c-button-shadow: none;
  --slds-c-button-shadow-focus: none;
  --slds-g-shadow-outset-focus-1: none;

  --slds-c-button-brand-color-background: var(--primary-color);
  --slds-c-button-brand-color-background-active: var(--primary-color);
  --slds-c-button-brand-color-background-hover: var(--primary-color);
  --slds-c-button-brand-color-border: var(--primary-color);
  --slds-c-button-brand-color-border-hover: var(--primary-color);
  --slds-c-button-outline-brand-color-border: var(--primary-color);
  --slds-c-button-text-color: var(--primary-color);
  --slds-c-tabs-item-color-border-active: var(--primary-color);
  --slds-c-tabs-item-color-border-hover: var(--primary-color);
  /* --slds-c-button-color-border-hover: var(--primary-color); */
  --slds-c-button-outline-brand-color-border-hover: var(--primary-color);
  --sds-c-button-text-destructive-text-color-hover: var(--primary-color);
  --sds-c-button-text-destructive-text-color: var(--primary-color);
  --slds-c-radio-mark-color-foreground: var(--primary-color);
  --slds-c-checkbox-mark-color-foreground: var(--primary-color);
  --slds-c-checkbox-toggle-color-border: var(--primary-color);
  --slds-c-checkbox-toggle-color-background: var(--primary-color);

  --red: #e4002b;
  --dark-red: #8e1000;
  --dark-blue: #0093AD;
  --light-blue: #80C9D6;
  --grey: #545859;
  --indigo: #1D1740;
  --black: #000000;
  --light-grey: #EAEAEA;
  --cw-grey: #545859;
  --border-grey: #B8B8B8
}



a,
a:active,
a:hover,
a:focus,
.slds-dropdown_actions a,
.slds-dropdown--actions a {
  color: #1f6477;
}



.slds-context-bar {
  border-bottom: 3px solid var(--primary-color) !important;
}

.slds-is-sortable__icon {
  fill: var(--primary-color) !important;
}

.no-records {
  padding: 1rem;
  text-align: center;
  width: 96%;
  margin: 1rem auto;
  background: white;
}

.required-fields {
  position: relative;
  display: block;
  text-align: right;

}

.required-fields::before {
  content: "*";
  position: absolute;
  right: 5.5rem;
  color: red;
}

.slds-form-element .slds-form-element__label {
  margin-bottom: 0.35rem;
}


.slds-notify_container {
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 0 auto;
  height: 1px;
  position: fixed !important;
  left: 25%;
  top: 4.5%;
}

.slds-form-element__help {
  display: none;
}

.slds-has-error .slds-form-element__help {
  display: block;
  white-space: pre-line;
}
</style>
