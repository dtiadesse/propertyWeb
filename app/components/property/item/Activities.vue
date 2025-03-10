<template>
  <article class="slds-card">
    <div class="slds-card__body slds-card__body_inner">
      <UiItemTabs :tabs="leftTabs" />
    </div>
  </article>
</template>

<script lang="ts" setup>
const leftTabs: any = [
  { "label": "Activities", "name": "Activities", "component": shallowRef(resolveComponent("property/item/Timeline")), "is_active": true, "is_visible": true },
]
</script>

<style scoped>
.slds-card {
  margin-top: 1rem;
}

.slds-card__body_inner {
  margin: 0;
  padding: 0.75rem;
}
</style>
