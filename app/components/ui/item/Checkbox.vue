<template>
  <div class="slds-form-element" v-if="config.config.value.editMode || editMode">
    <label class="slds-form-element__label" for="checkbox-unique-id-80">{{ label }}</label>
    <div class="slds-form-element__control">
      <span class="slds-checkbox slds-checkbox_standalone">
        <input type="checkbox" id="checkbox-unique-id-80" name="label" :value="value" @change="updateStore"
          :checked="selected === value" />
        <span class="slds-checkbox_faux"></span>
      </span>
    </div>
  </div>
  <div v-else>
    <UiItemValueBox :label="label" :required="required" :value="selected" />
  </div>

</template>

<script lang="ts" setup>
const { label, selected, required, name, value = 'Yes', editMode = false } = defineProps(['label', 'options', 'selected', 'required', 'name', 'value', 'editMode'])

const config = useConfig();
const propertyStore = useMyPropertyStore();
const emit = defineEmits(['valueChanged'])

const updateStore = (e: any) => {
  if (name) {
    const val = e.target.checked ? e.target.value : "";
    propertyStore.captureChanges(name, val)
  }
  emit('valueChanged', e.target.checked)

}
</script>

<style scoped>
.flexbox {
  display: flex;
}

.slds-form-element.padding {
  padding-top: 0.85rem;
}
</style>