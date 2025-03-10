<script lang="ts" setup>
import { computed, ref } from 'vue';

// const propertyAssetStore = usePropertyAssetStore();
// const { propertyPageHeader } = storeToRefs(propertyAssetStore);

const globalStore = useMyGlobalStateStore()

const reportBtnStatus = ref(false)
const reportPopup = async () => {
    globalStore.openModal('Report');
}

const pageTitle = computed(() => {
    return title.trim().length > 2 ? title : address
})

const { title = "", address = "" } = defineProps(['title', 'address'])

</script>

<style scoped>
.property-link {
    width: 11rem;
}
</style>

<template>
    <PropertyItemReportOverview />

    <article class="slds-card">
        <div class="slds-page-header">
            <div class="slds-page-header__row">
                <div class="slds-page-header__col-title">
                    <div class="slds-media">
                        <div class="slds-media__figure">
                            <span class="slds-icon_container slds-icon-standard-opportunity">
                                <svg class="slds-icon slds-page-header__icon bg-[#6689CC]" aria-hidden="true">
                                    <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#location"></use>
                                </svg>
                            </span>
                        </div>
                        <div class="slds-media__body">
                            <div class="flex flex-col -mt-1">
                                <h1 class="slds-text-heading_medium">{{ pageTitle }}</h1>
                                <NuxtLink class="flex items-center font-medium property-link" @click="$router.back()">
                                    <svg class="slds-button__icon slds-button__icon_small mr-2" aria-hidden="true">
                                        <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#back"></use>
                                    </svg>
                                    <span class="slds-assistive-text">Go to list</span>
                                    Back To Property+ List
                                </NuxtLink>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="slds-page-header__col-actions">
                    <div class="slds-page-header__controls">
                        <div class="slds-page-header__control">
                            <button class="slds-button slds-button_brand mr-2">
                                Create Opportunity
                            </button>
                            <button class="slds-button slds-button_neutral mr-3">
                                Add To My List
                            </button>
                            <button class="slds-button slds-button_neutral" :disabled="reportBtnStatus"
                                @click="reportPopup">Generate
                                a Report</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <LazyOpportunityCreateDlg />
    </article>
</template>
