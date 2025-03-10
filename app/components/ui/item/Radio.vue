<template>
  <fieldset v-if="config.config.value.editMode" class="slds-form-element" role="radiogroup">
    <legend class="slds-form-element__label">{{ label }}</legend>
    <div class="slds-form-element__control flexbox">
      <span v-for="option in options" class="slds-radio">
        <input @change="updateStore" type="radio" :id="'radio-' + option.key" :value="option.label"
          :checked="option.label === selected" name="radio" />
        <label class="slds-radio__label" :for="'radio-' + option.key">
          <span class="slds-radio_faux"></span>
          <span class="slds-form-element__label">{{ option.label }}</span>
        </label>
      </span>
    </div>
  </fieldset>
  <div v-else>
    <UiItemValueBox :label="label" :required="required" :value="selected" />
  </div>

</template>

<script lang="ts" setup>
const { label, options, selected, required, name } = defineProps(['label', 'options', 'selected', 'required', 'name'])

const config = useConfig();
const propertyStore = useMyPropertyStore();
const emit = defineEmits(['valueChanged'])

const updateStore = (e: any) => {
  if (name) {
    propertyStore.captureChanges(name, e.target.value)
  }
  emit('valueChanged', e.target.value)

}
</script>

<style scoped>
.flexbox {
  display: flex;
}
</style>