<template>
  <div v-if="config.config.value.editMode || props.editMode" class="slds-form-element"
    :class="{ 'slds-has-error': props.hasError }">
    <label v-if="label" class="slds-form-element__label" :for="inputUID" :id="'combobox-label-id' + inputUID">
      <abbr v-if="props.required" class="slds-required" title="required">* </abbr>
      {{ label
      }}</label>
    <div class="slds-form-element__control">
      <div class="slds-combobox_container">
        <div class="slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click"
          :class="{ 'slds-is-open': opened, 'disabled': props.values.length === 0 }" @click.stop="toggle">
          <div class="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_right" role="none">
            <div role="combobox" tabindex="0" class="slds-input slds-combobox__input slds-combobox__input-value">
              <span class="slds-truncate" id="combobox-value-id-29">{{ selected_value ? selected_value
                : placeholder }}</span>
            </div>
            <span class="slds-icon_container slds-icon-utility-down slds-input__icon slds-input__icon_right">
              <svg class="slds-icon slds-icon slds-icon_x-small slds-icon-text-default" aria-hidden="true">
                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#down"></use>
              </svg>
            </span>
          </div>
          <div :id="'listbox-' + inputUID" class="slds-dropdown slds-dropdown_length-5 slds-dropdown_fluid"
            role="listbox" aria-label="" tabindex="0" aria-busy="false">
            <ul class="slds-listbox slds-listbox_vertical" role="presentation">
              <li :key="value" v-for="value in props.values" role="presentation" class="slds-listbox__item"
                @click="selectValue(value.value)">
                <div aria-selected="true" aria-checked="true"
                  class="slds-media slds-listbox__option slds-listbox__option_plain slds-media_small"
                  :class="{ 'slds-is-selected': (value?.value === selected_value) }" role="option">
                  <span class="slds-media__figure slds-listbox__option-icon">
                    <span class="slds-icon_container slds-icon-utility-check slds-current-color">
                      <svg v-if="value?.value === selected_value" class="slds-icon slds-icon_x-small"
                        aria-hidden="true">
                        <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#check"></use>
                      </svg>
                    </span>
                  </span>
                  <span class="slds-media__body">
                    <span class="slds-truncate" :title="value?.value">{{ value?.value }}</span>
                  </span>
                </div>
              </li>
              <li v-if="values.length === 0" class="slds-listbox__item empty"><span
                  class="slds-media__body">--None--</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="slds-form-element__help" :id="'error-message-' + inputUID">{{ props.hasError }}</div>
    </div>
  </div>
  <div v-else>
    <UiItemValueBox :label="props.label" :required="props.required" :value="props.selected" />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(['required', 'editable', 'label', 'name', 'selected', 'values', 'editMode', 'hasError', 'placeholder'])
const { placeholder = '-Select-' } = props;

const inputUID = computed(() => props.name ? props.name.trim().toLowerCase() : "combo_" + Math.floor(Math.random() * 985900))

const opened = ref(false)
const emit = defineEmits(['selected'])
const updated_value = ref("");
const selected_value = computed(() => {
  return updated_value.value ? updated_value.value : props.selected;
})

watch(() => props.values, () => {
  updated_value.value = "";
});

watch(() => props.selected, () => {
  updated_value.value = "";
});

const propertyStore = useMyPropertyStore();


const config = useConfig();


const toggle = () => {
  if (props.values.length > 0) {
    opened.value = !opened.value;
  }
}

const closeMenu = () => {
  opened.value = false
}

const selectValue = (value: any) => {

  if (typeof value === 'object')
    value = value.target.value

  updated_value.value = value;
  if (props.name) {
    propertyStore.captureChanges(props.name, value)
  }
  emit('selected', value);
}



onMounted(async () => {
  window.addEventListener('click', closeMenu)
});

onBeforeUnmount(() => {
  window.removeEventListener('click', closeMenu)
})
</script>

<style scoped>
.slds-combobox__input:focus,
.slds-combobox__input.slds-has-focus {
  box-shadow: none;
  outline: 0;
}

.editable-input {
  border: 0;
  text-align: left;
  padding: 0;
}

.slds-combobox__input {
  cursor: pointer;
}

.slds-dropdown_fluid {
  min-width: auto;
  z-index: 99991;
}


.slds-listbox__item.empty {
  padding: 0.2rem 0.75rem;
}

.disabled {
  cursor: not-allowed;
  pointer-events: none;
}

.disabled .slds-combobox__input {
  background: #e0e0e0;
}
</style>