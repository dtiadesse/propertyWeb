<template>
  <article class="slds-card custom-card">
    <div class="slds-card__header slds-grid">
      <header class="slds-media slds-media_center slds-has-flexi-truncate">
        <div class="slds-media__figure">
          <span style="padding: 0.35rem;"
            class="slds-icon_container slds-icon-action-freeze-user slds-icon_container_circle">
            <svg style="width: 1.5rem; height: 1.5rem;" class="slds-icon slds-icon_small" aria-hidden="true">
              <use xlink:href="/assets/icons/action-sprite/svg/symbols.svg#freeze_user"></use>
            </svg>
          </span>
        </div>
        <div class="slds-media__body">
          <h2 class="slds-card__header-title">
            <a href="#" class="slds-card__header-link slds-truncate" title="Historical Roles">
              <span>Historical Roles</span>
            </a>
          </h2>
        </div>

      </header>
    </div>
    <div class="slds-card__body slds-card__body_inner relationship-container">
      <UiItemDataTable select-type="none" :show-action="false" :columns="columns" :data="data" :isLoading="false" />
      <div class="slds-box no-records" v-if="data.length === 0"> No roles found.</div>
    </div>
  </article>
</template>

<script lang="ts" setup>

const columns = [
  { name: "Company.Name", label: 'Company', type: "Url" },
  { name: "Contact.Name", label: 'Contact', type: "Url" },
  { name: "Role.Name", label: 'Role', type: "Url" },
  { name: "Source", label: 'Source', type: "String" },
  { name: "RoleEndDate", label: 'Role End Date', type: "String" }
]

const data: any = ref([])
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

.no-records {
  padding: 1rem;
  text-align: center;
  width: 96%;
  margin: 1rem auto;
  background: white;
}

.relationship-container {
  margin-bottom: 0;
}
</style>