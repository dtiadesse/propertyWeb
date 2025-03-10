<script lang="ts" setup>
import { CompaniesRelatedContacts } from '#components';

const companyListStore = useCompanyListStore();
const { selectedCompany } = storeToRefs(companyListStore);
</script>

<template>
    <div class="flex flex-col min-w-full max-h-screen">
        <div class="slds-page-header h-[50px] w-full">
            <div class="slds-page-header__row">
                <div class="slds-page-header__col-title">
                    <div class="slds-media">
                        <div class="slds-media__figure">
                            <span class="slds-icon_container slds-icon-utility-announcement -mt-2" title="company">
                                <svg class="slds-icon slds-icon-text-success" aria-hidden="true">
                                    <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#company"></use>
                                </svg>
                                <span class="slds-assistive-text">company</span>
                            </span>
                        </div>
                        <div class="slds-media__body">
                            <p class="font-bold">{{ selectedCompany?.name }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <CompaniesRelatedProperties v-if="selectedCompany" />
        <CompaniesRelatedContacts v-if="selectedCompany" />
    </div>
</template>
