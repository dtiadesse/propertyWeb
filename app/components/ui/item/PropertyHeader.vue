<template>
  <Modal :is-visible="globalStore.modalName === 'Delete_Property'" :size="'small'" @close="closeModal">
    <template #header>
      You are deleting this Property
    </template>
    <div class="alert-content">
      <svg class="slds-icon slds-icon_x-small" aria-hidden="true">
        <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#warning"></use>
      </svg>
      Are you sure you want to delete this property?
    </div>
    <template #footer>
      <div style="display: flex;justify-content: flex-end;align-items: center;">
        <button class="slds-button slds-button_neutral" @click="closeModal">Cancel</button>
        <button class="slds-button slds-button_brand" @click="deleteProperty">Delete Property</button>
      </div>
    </template>
  </Modal>
  <div class="slds-page-header">
    <div class="slds-page-header__row">
      <div class="slds-page-header__col-title">
        <div class="slds-media">
          <div class="slds-media__figure">
            <span class="slds-icon_container slds-icon-standard-location_1 property-menuitem">
              <svg class="slds-icon slds-page-header__icon" aria-hidden="true">
                <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#location"></use>
              </svg>
            </span>
          </div>
          <div class="slds-media__body">
            <div class="slds-page-header__name">
              <div class="slds-page-header__name-title">
                <h1>
                  <span>Property</span>
                  <span class="slds-page-header__title slds-truncate" :title="title">{{ title }}</span>
                </h1>
              </div>

            </div>
          </div>
        </div>
      </div>
      <OpportunityCreateOpportunityModal />

      <ReportOverview />

      <div class="slds-page-header__col-actions" style="position: relative;">
        <div style="position: absolute;top: 0px;right: 45%;width: 100%;">
          <!-- <InlineReportLoader :message="'Please wait. Generating report...'" :show-loader="showLoader" /> -->
        </div>
        <div class="slds-page-header__controls">
          <div class="slds-page-header__control">
            <div class="slds-button-group mr-3" role="group">
              <button class="slds-button slds-button_brand" @click="createOpportunityPopup">Create an
                Opportunity</button>
            </div>
            <div class="slds-button-group" role="group">
              <button class="slds-button slds-button_neutral" :disabled="reportBtnStatus" @click="reportPopup">Generate
                a Report</button>
              <button class="slds-button slds-button_neutral" disabled>Generate a Map</button>

              <div class="slds-dropdown-trigger slds-dropdown-trigger_click slds-button_last"
                :class="{ 'slds-is-open': showMoreFlag }">
                <button class="slds-button slds-button_icon slds-button_icon-border-filled" aria-haspopup="true"
                  aria-expanded="false" title="Show More" @click.stop="showMore">
                  <svg class="slds-button__icon" aria-hidden="true">
                    <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#down"></use>
                  </svg>
                  <span class="slds-assistive-text">Show More</span>
                </button>
                <div class="slds-dropdown slds-dropdown_right slds-dropdown_actions">
                  <ul class="slds-dropdown__list" role="menu">
                    <li class="slds-dropdown__item" role="presentation">
                      <a href="#" @click.prevent role="menuitem" tabindex="0">
                        <span class="slds-truncate" title="Overflow Item One">Add to my List</span>
                      </a>
                    </li>
                    <li class="slds-dropdown__item" role="presentation">
                      <a href="#" role="menuitem" @click.prevent="confirmPropertyDeletion" tabindex="-1">
                        <span class="slds-truncate" title="Overflow Item Two">Delete</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { useMyOpportunityStore } from '~/stores/Opportunity';


const { title } = defineProps(['title'])
const propertyStore = useMyPropertyStore()
const opportunityStore = useMyOpportunityStore()
const globalStore = useMyGlobalStateStore()
const toastStore = useToastStore()
const route = useRoute()

const showMoreFlag = ref(false)

const showLoader = ref(false)

const reportBtnStatus = ref(false)

const showMore = () => {
  showMoreFlag.value = !showMoreFlag.value;
}

const closeModal = () => {
  globalStore.closeModal();
}

const closeMenu = () => {
  showMoreFlag.value = false;
}

const confirmPropertyDeletion = () => {
  globalStore.openModal('Delete_Property')
}

const deleteProperty = async () => {
  closeModal()
  try {
    const result: any = await propertyStore.deleteProperty();

    if (result === 'success') {
      toastStore.addToast({
        type: "success",
        "message": "Property deleted successfully",
        id: 1
      })
      navigateTo("/");
    }
  }
  catch (e: any) {
    toastStore.addToast({
      type: "error",
      "message": e.message,
      id: 1
    })
  }
}

const createOpportunityPopup = () => {
  opportunityStore.step = 1;
  opportunityStore.type = 'single';
  opportunityStore.propertySelected = true;
  opportunityStore.selectedValues = +route.params.id!;
  opportunityStore.selectedItems.push({
    Id: propertyStore.property.id,
    PropertyName: propertyStore.property.name,
    Units: propertyStore.property.numberOfUnits,
    YearBuilt: propertyStore.property.yearBuilt,
    Street: propertyStore.property.stdAddress1,
    City: propertyStore.property.city,
    State: propertyStore.property.state,
  })
  // opportunityStore.properties = [
  //   {
  //     Id: propertyStore.property.id,
  //     PropertyName: propertyStore.property.propertyName,
  //     Units: propertyStore.property.units,
  //     YearBuilt: propertyStore.property.yearBuilt,
  //     Street: propertyStore.property.street,
  //     City: propertyStore.property.city,
  //     State: propertyStore.property.state,
  //   },
  // ];
  globalStore.openModal('Opportunity');
}

const reportPopup = async () => {
  globalStore.openModal('Report');
}

onMounted(async () => {
  window.addEventListener('click', closeMenu)
});

onBeforeUnmount(() => {
  window.removeEventListener('click', closeMenu)
})


</script>

<style scoped>
.property-menuitem {
  background: #5A95DD;
}

.slds-dropdown {
  width: 10rem;
}

.alert-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.alert-content .slds-icon {
  fill: #DD7A01;
  width: 2rem;
  height: 2rem;
  margin-bottom: 1rem;
}
</style>