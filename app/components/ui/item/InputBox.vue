<template>
  <div v-if="config.config.value.editMode || editMode" class="slds-form-element"
    :class="{ 'slds-has-error': hasError }">
    <label v-if="label" class="slds-form-element__label" :for="inputUID">
      <abbr v-if="required" class="slds-required" title="required">* </abbr>{{ label }}</label>
    <div class="slds-form-element__control">
      <input :type="type" @change="updateStore" :value="value" :id="inputUID" :placeholder="placeholder"
        :required="required" class="slds-input" autocomplete="off" aria-autocomplete="none" autocorrect="off"
        autocapitalize="off" spellcheck="false" :readonly="readOnly" />
      <div class="slds-form-element__help" :id="'error-message-' + inputUID">{{ hasError }}</div>
    </div>
  </div>
  <UiItemValueBox v-else :label="label" :required="required" :value="selected_value" />
</template>

<script lang="ts" setup>

const { required, label, name, value, editMode, placeholder, hasError, readOnly = false, type = 'text' } = defineProps(['required', 'label', 'name', 'value', 'editMode', 'placeholder', 'hasError', 'readOnly', 'type'])

const inputUID = computed(() => name ? name.trim().toLowerCase() : "input_" + Math.floor(Math.random() * 985900))

const config = useConfig();
const updated_value = ref("");

const selected_value = computed(() => {
  return updated_value.value ? updated_value.value : value;
})

const propertyStore = useMyPropertyStore();
const $inputChanged = defineEmits(['inputChanged'])

const updateStore = (e: any) => {
  if (name) {
    propertyStore.captureChanges(name, e.target.value)
  }

  $inputChanged('inputChanged', e.target.value)

}

</script>

<style scoped>
.slds-input:focus,
.slds-input:active {
  box-shadow: none;
  outline: none;
}

.slds-form-element__label {
  /* margin-bottom: 0.35rem; */
}

.slds-input[readonly] {
  --slds-c-input-spacing-horizontal-start: 1rem;
  --slds-c-input-color-border: #c9c9c9;
  --slds-c-input-color-background: white;
  font-size: 0.875rem;
  font-weight: 400;
}
</style>