<template>
  <div class="slds-tabs_default">
    <ul class="slds-tabs_default__nav" v-if="activeTabs.length > 0" role="tablist">
      <li :key="tab.name" v-for="tab in activeTabs" class="slds-tabs_default__item"
        :class="{ 'slds-is-active': tab.is_active }" :title="tab.name" role="presentation" @click="toggleTab(tab)">
        <a class="slds-tabs_default__link" href="javascript:" role="tab" tabindex="0" aria-selected="true"
          aria-controls="tab-default-1" id="tab-default-1__item">{{ tab.label }}</a>
      </li>

      <li v-if="hiddenTabs.length > 0" class="slds-tabs_default__item slds-tabs_default__overflow-button" title="More"
        role="presentation">
        <div class="slds-dropdown-trigger slds-dropdown-trigger_click" :class="{ 'slds-is-open': showMore }">
          <button class="slds-button" @click.stop="toggleMore" aria-haspopup="true">More
            <svg class="slds-button__icon slds-button__icon_x-small slds-button__icon_right" aria-hidden="true">
              <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#down"></use>
            </svg>
          </button>
          <div class="slds-dropdown slds-dropdown_right">
            <ul class="slds-dropdown__list slds-dropdown_length-with-icon-10" role="menu">
              <li :key="tab.name" v-for="tab in hiddenTabs" class="slds-dropdown__item" role="presentation"
                @click="toggleInactiveTab(tab)">
                <a href="javascript:" role="menuitem" tabindex="-1">
                  <span class="slds-truncate" :title="tab.label">{{ tab.label }}</span>
                </a>
              </li>

            </ul>
          </div>
        </div>
      </li>
    </ul>
    <!-- <FormFooter /> -->
    <!-- <slot name="actionbar"></slot> -->

    <div id="tab-default" class="slds-tabs_default__content slds-show" role="tabpanel"
      aria-labelledby="tab-default-1__item">
      <div v-if="activeComponent?.component">
        <keep-alive>
          <component :is="activeComponent?.component" />
        </keep-alive>
      </div>
      <h2 v-else>{{ activeComponent?.name }}</h2>


    </div>
    <!-- <FormFooter /> -->

  </div>
</template>

<script lang="ts" setup>

const { tabs } = defineProps(['tabs'])

const allTabs = ref(tabs)

const showMore = ref(false)
const activeTabs = computed(() => allTabs.value.filter((tab: any) => tab.is_visible))
const hiddenTabs = computed(() => allTabs.value.filter((tab: any) => !tab.is_visible))
const activeComponent = computed(() => allTabs.value.find((tab: any) => tab.is_active))

const toggleTab = (tab: any) => {
  allTabs.value = allTabs.value.map((c_tab: any) => {
    (tab.name === c_tab.name) ? c_tab.is_active = true : c_tab.is_active = false;
    return c_tab;
  })
}

const toggleInactiveTab = (tab: any) => {
  activeComponent.value.is_active = false;
  activeTabs.value[activeTabs.value.length - 1].is_active = false;
  activeTabs.value[activeTabs.value.length - 1].is_visible = false;
  tab.is_active = true;
  tab.is_visible = true;
}

const toggleMore = () => {
  showMore.value = !showMore.value;
}

const closeMenu = () => {
  showMore.value = false
}

onMounted(async () => {
  window.addEventListener('click', closeMenu)
});

onBeforeUnmount(() => {
  window.removeEventListener('click', closeMenu)
})





</script>

<style></style>