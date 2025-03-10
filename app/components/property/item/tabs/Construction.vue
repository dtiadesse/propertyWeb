<template>
  <UiItemExpandableSection :component="section.land" label="Land" />
  <UiItemExpandableSection :component="section.structure" label="Structure" />
  <UiItemExpandableSection :component="section.roofing" label="Roofing" />
  <UiItemExpandableSection :component="section.parking" label="Parking" />
</template>

<script lang="ts" setup>
const section = {
  "land": shallowRef(resolveComponent('property/item/construction/Land')),
  "structure": shallowRef(resolveComponent('property/item/construction/Structure')),
  "roofing": shallowRef(resolveComponent('property/item/construction/Roofing')),
  "parking": shallowRef(resolveComponent('property/item/construction/Parking'))
}
</script>

<style></style>