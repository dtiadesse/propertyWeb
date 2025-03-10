<template>
  <div v-if="config.config.value.editMode || editMode" class="slds-form-element">
    <label v-if="label" class="slds-form-element__label" for="text-area-id-46">
      <abbr v-if="is_required" class="slds-required" title="required">* </abbr>{{ label }}</label>
    <div class="slds-form-element__control">

      <textarea id="text-area-id-46" @change="updateStore" :value="value" class="text-area slds-input" placeholder=""
        :required="is_required" autocomplete="off" aria-autocomplete="none" autocorrect="off" autocapitalize="off"
        spellcheck="false"></textarea>
    </div>
  </div>
  <UiItemValueBox v-else :label="label" :required="required" :value="selected_value" />
</template>

<script lang="ts" setup>

const { required, label, name, value, editMode } = defineProps(['required', 'label', 'name', 'value', 'editMode'])

const is_required = ref(required)

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
  margin-bottom: 0.35rem;
}
</style>