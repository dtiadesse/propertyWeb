<script lang="ts" setup>
const contactListStore = useContactListStore();
const { gridSearchString, selectedContacts } = storeToRefs(contactListStore);
const campaignStore = useCampaignStore();
const { toggleCampaignMode } = campaignStore;
const setGridSearchString = (event: any) => {
    gridSearchString.value = event.target.value.trim();
};

</script>

<template>
    <article class="slds-card">
        <div class="slds-page-header">
            <div class="slds-page-header__row">
                <div class="slds-page-header__col-title">
                    <div class="slds-media">
                        <div class="slds-media__figure bg-blue-500 text-white">
                            <span class="slds-icon_container slds-current-color">
                                <svg class="slds-icon slds-page-header__icon_small" aria-hidden="true">
                                    <use
                                        xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#opportunity_contact_role">
                                    </use>
                                </svg>
                            </span>
                        </div>
                        <div class="slds-media__body">
                            <ListPageSwitcher />
                        </div>
                    </div>
                </div>
                <div class="slds-page-header__col-actions">
                    <div class="slds-page-header__controls">
                        <div class="slds-page-header__control">
                            <!-- <button class="slds-button slds-button_brand mr-2"
                                :disabled="selectedContacts.length === 0" @click="toggleCampaignMode()">
                                Add To OneCap Campaign
                            </button> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="slds-page-header__row">
                <div class="slds-page-header__col-meta">
                    <div class="flex items-center border-solid">
                        <span class="animate__animated animate__zoomIn font-semibold">
                            Contacts with at least one associated Property+ property are listed below.
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
                            aria-haspopup="listbox" autocomplete="off" role="combobox" placeholder="Search contacts..."
                            @input="setGridSearchString($event)">
                    </div>
                </div>
            </div>
        </div>
        <LazyCampaignAddMembersDlg v-if="selectedContacts.length > 0" />
    </article>
</template>
