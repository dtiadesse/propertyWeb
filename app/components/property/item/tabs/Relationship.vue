<template>
  <article class="slds-card custom-card">
    <div class="slds-card__header slds-grid">
      <header class="slds-media slds-media_center slds-has-flexi-truncate">
        <div class="slds-media__figure">
          <span class="slds-icon_container slds-icon-standard-account" title="account">
            <svg class="slds-icon slds-icon_small" aria-hidden="true">
              <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#account"></use>
            </svg>
            <span class="slds-assistive-text">account</span>
          </span>
        </div>
        <div class="slds-media__body">
          <h2 class="slds-card__header-title">
            <a href="#" class="slds-card__header-link slds-truncate" title="Property Relationships">
              <span>Property Relationships</span>
            </a>
          </h2>
        </div>
        <div class="slds-no-flex">
          <UiItemModal :is-visible="globalState.modalName === 'Add_Relationship'" :size="'large'" @close="closePopup">
            <template #header>Add New Property Relationship</template>
            <PropertyItemDetailsAddPropertyRelationship @added="handleAddRelationship" :has-errors="hasErrors" />
            <template #footer>
              <UiItemInlineLoader />
              <button class="slds-button slds-button_neutral" @click="closePopup"
                aria-label="Cancel and close">Cancel</button>
              <button class="slds-button slds-button_brand" @click="saveRelationships">Save</button>

            </template>
          </UiItemModal>
          <div class="slds-button-group" role="group">
            <button class="slds-button slds-button_neutral" @click="globalState.openModal('Add_Relationship')">Add New
              Relationship</button>
            <!-- <button class="slds-button slds-button_neutral">Add to Campaign</button> -->
          </div>
        </div>
      </header>
    </div>
    <div class="slds-card__body slds-card__body_inner relationship-container">

      <div class="slds-box no-records" v-if="propertyStore.property.propertyRelationship.length === 0">
        No relationships found. Click on "Add New Relationship" button to add new relationships.</div>
      <UiItemDataTable v-else :columns="columns" :data="propertyStore.property.propertyRelationship" :isLoading="false"
        :enable-scroll="true" @delete="deleteRelationship" @trigger-action="loadPage" />
    </div>
  </article>
</template>

<script lang="ts" setup>
// import AddPropertyRelationship from '../details/AddPropertyRelationship.vue';

const propertyStore = useMyPropertyStore();
const relationships: any = ref([])
const hasErrors: any = ref(null);

const runtimeConfig = useRuntimeConfig()

const columns = [
  { name: "company", label: 'Company', type: "String", triggerAction: true },
  { name: "name", label: 'Contact', type: "String", triggerAction: true },
  { name: "role", label: 'Role', type: "String" },
  { name: "source", label: 'Source', type: "String" }
]

const globalState = useMyGlobalStateStore()

const handleAddRelationship = (item: any) => {

  relationships.value = [...item]
}

const closePopup = () => {
  relationships.value = [];
  globalState.closeModal();
}

const saveRelationships = () => {
  hasErrors.value = null;
  if (relationships.value.length > 0) {
    const validated = relationships.value.filter((r: any) => r.Role);
    if (validated.length === relationships.value.length) {
      propertyStore.updateRelationship(relationships.value);
      globalState.serverAction = true;
      relationships.value = [];
    }
    else {
      hasErrors.value = new Date();
    }
  }
}

const deleteRelationship = (event: any) => {
  propertyStore.deleteRelationship(event.record, event.index);
}

const loadPage = (event: any) => {
  let url = '';
  if (event.col.label === 'Company') {
    url = getOneCapAccountLink(runtimeConfig.public.oneCapEnvironment, event.row.companyId);
    // url = `${runtimeConfig.public.salesforceDomain}lightning/r/Account/${event.row.companyId}/view`
  }
  else if (event.col.label === 'Contact') {
    url = getOneCapContactLink(runtimeConfig.public.oneCapEnvironment, event.row.contactId);
    // url = `${runtimeConfig.public.salesforceDomain}lightning/r/Contact/${event.row.contactId}/view`
  }
  if (url) {
    window.open(url, 'salesforcePopup');
  }
}

</script>

<style scoped>
.custom-card {
  border: 1px solid rgb(201, 201, 201) !important;
  background-color: #f3f3f3;
  border-radius: 4px;
}

.slds-card__body.slds-card__body_inner {
  padding: 0;
}

/* .no-records {
  padding: 1rem;
  text-align: center;
  width: 96%;
  margin: 1rem auto;
  background: white;
} */

.relationship-container {
  margin-bottom: 0;
}
</style>