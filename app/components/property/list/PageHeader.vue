<script lang="ts" setup>
const propertyListStore = usePropertyListStore();
const opportunityStore = useOpportunityStore();
const globalState = useMyGlobalStateStore();
const propertyStore = useMyPropertyStore();
const newPropertyStore = useNewPropertyStore();

const { selectedProperties, gridSearchString } = storeToRefs(propertyListStore);
const { selectedProperties: oppsProperties } = storeToRefs(opportunityStore);
const { createNewPropertyMode } = storeToRefs(newPropertyStore);

const { propertySelectionMode } = storeToRefs(opportunityStore);
const { togglePropertySelectionMode, toggleOppsCreationMode } = opportunityStore
const { toggleCreateNewPropertyMode } = newPropertyStore

const initOpportunityCreation = () => {
    toggleOppsCreationMode();
    oppsProperties.value = selectedProperties.value;
};

const setGridSearchString = (event: any) => {
    gridSearchString.value = event.target.value.trim();
};

const showCreatePropertyPopup = () => {
    globalState.openModal('Create_Property')
}

propertyStore.getOptions();


</script>

<template>
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
                            <ListPageSwitcher />
                        </div>
                    </div>
                </div>
                <div class="slds-no-flex">
                </div>
                <div class="slds-page-header__col-actions">
                    <div class="slds-page-header__controls">
                        <div class="slds-page-header__control">
                            <button class="slds-button slds-button_brand mr-2" @click="togglePropertySelectionMode()"
                                v-if="!propertySelectionMode">
                                Create Opportunity
                            </button>
                            <button class="slds-button slds-button_brand mr-2" @click="initOpportunityCreation()"
                                v-if="propertySelectionMode" :disabled="selectedProperties.length === 0">
                                Continue...
                            </button>
                            <button class="slds-button slds-button_text-destructive mr-2"
                                @click="togglePropertySelectionMode()" v-if="propertySelectionMode">
                                Cancel
                            </button>
                            <button class="slds-button slds-button_neutral mr-2" @click="showCreatePropertyPopup">
                                Create Property
                            </button>
                            <!-- <button class="slds-button slds-button_neutral mr-2" :disabled="propertySelectionMode"
                                @click="toggleCreateNewPropertyMode()">
                                Create Property
                            </button> -->
                            <!-- <button class="slds-button slds-button_neutral mr-3"
                                :disabled="true">
                                Add To My List
                            </button> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="slds-page-header__row">
                <div class="slds-page-header__col-meta">
                    <div class="flex items-center border-solid" v-if="propertySelectionMode">
                        <span class="font-bold animate__animated animate__zoomIn">
                            You can add a property or a group of properties (portfolio) to the opportunity.
                            Select / confirm selection(s) now. Currently selected:
                            <span class="text-blue-600 text-lg">{{ selectedProperties.length }}</span>
                        </span>
                    </div>
                </div>
                <div class="slds-page-header__col-controls w-2/5">
                    <div class="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_left slds-global-search__form-element"
                        role="none">
                        <span
                            class="slds-icon_container slds-icon-utility-search slds-input__icon slds-input__icon_left">
                            <svg class="slds-icon slds-icon slds-icon_xx-small slds-icon-text-default"
                                aria-hidden="true">
                                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#search"></use>
                            </svg>
                        </span>
                        <input type="text" class="slds-input slds-combobox__input" id="all-properties-filter-text-box"
                            aria-autocomplete="list" aria-controls="search-listbox-id-1" aria-expanded="false"
                            aria-haspopup="listbox" autocomplete="off" role="combobox"
                            placeholder="Search properties..." @input="setGridSearchString($event)">
                    </div>
                </div>
            </div>
        </div>
        <PropertyItemNewProperty />
        <LazyOpportunityCreateDlg />
        <!-- <LazyPropertyAssetCreateDlg /> -->
    </article>
</template>

<style lang="css" scoped>
/* .slds-button_success {
    @apply bg-slate-500;
} */
</style>
