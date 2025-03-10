<script lang="ts" setup>
import { ListPages } from '~~/models/listPages';

const listMenuVisible = ref(false);
const listStore = useListSettingsStore();
const { pageTitle, currentListPage } = storeToRefs(listStore);

onMounted(async () => {
    listMenuVisible.value = false;
    window.addEventListener("click", (e) => {
        if (e.target.classList.contains("list-menu-button")) return;
        listMenuVisible.value = false;
    });
});

onBeforeUnmount(() => {
    window.removeEventListener("click", () => {
        listMenuVisible.value = false;
    });
});
</script>

<template>
    <div class="flex mt-1">
        <h2 class="slds-page-header__title">{{ pageTitle }}</h2>
        <div class="slds-page-header__name-switcher slds-is-relative">
            <div class="slds-dropdown-trigger slds-dropdown-trigger_click">
                <button class="slds-button slds-button_icon slds-button_icon-small list-menu-button"
                    aria-haspopup="true" title="Switch list view" @click="listMenuVisible = !listMenuVisible"
                    ref="menuButton">
                    <svg class="slds-button__icon slds-icon_x-small" aria-hidden="true">
                        <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#down"></use>
                    </svg>
                    <span class="slds-assistive-text">Switch list view</span>
                </button>
            </div>
            <div class="slds-dropdown slds-dropdown_left slds-dropdown_small" v-if="listMenuVisible">
                <ul class="slds-dropdown__list" role="menu" aria-label="Show More">
                    <li class="slds-dropdown__item" role="presentation"
                        v-if="currentListPage !== ListPages.AllPropertiesList">
                        <NuxtLink to="/">
                            <span class="slds-truncate flex" title="All Properties">
                                <svg class="slds-icon slds-icon slds-icon-text-success" aria-hidden="true">
                                    <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#location"></use>
                                </svg>
                                <span class="text-sm mt-1">Property+ Properties</span>
                            </span>
                        </NuxtLink>
                    </li>
                    <li class="slds-dropdown__item" role="presentation"
                        v-if="currentListPage !== ListPages.PropertyPersonalList">
                        <NuxtLink to="/personal-list">
                            <span class="slds-truncate flex" title="My Property Personal Lists">
                                <svg class="slds-icon slds-icon_small bg-blue-400 slds-m-right_x-small"
                                    aria-hidden="true">
                                    <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#contract_line_item">
                                    </use>
                                </svg>
                                <span class="text-sm">My Property+ Personal Lists</span>
                            </span>
                        </NuxtLink>
                    </li>
                    <li class="slds-dropdown__item" role="presentation"
                        v-if="currentListPage !== ListPages.CompanyRelationshipsList">
                        <NuxtLink to="/companies">
                            <span class="slds-truncate flex" title="Company Relationships">
                                <svg class="slds-icon slds-icon_small slds-icon-text-success slds-m-right_x-small"
                                    aria-hidden="true">
                                    <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#company"></use>
                                </svg>
                                <span class="text-sm mt-1">Company Relationships</span>
                            </span>
                        </NuxtLink>
                    </li>
                    <li class="slds-dropdown__item" role="presentation"
                        v-if="currentListPage !== ListPages.ContactRelationshipsList">
                        <NuxtLink to="/contacts">
                            <span class="slds-truncate flex" title="Contact Property & Transaction Relationships">
                                <svg class="slds-icon slds-icon_small slds-icon-text-error slds-m-right_x-small"
                                    aria-hidden="true">
                                    <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#user"></use>
                                </svg>
                                <span class="text-sm mt-1">Contact Relationships & Campaigns</span>
                            </span>
                        </NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped></style>
