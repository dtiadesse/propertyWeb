<script lang="ts" setup>
import type { SelectOption } from '~~/models/selectOption';

defineProps({
    options: {
        type: Array<SelectOption>,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    required: {
        type: Boolean,
        default: false
    },
    label: {
        type: String,
        default: ''
    },
    modelValue: {
        type: [String, Number],
        required: true
    },
})
</script>

<template>
    <fieldset class="slds-form-element" role="radiogroup" aria-required="true">
        <legend class="slds-form-element__legend slds-form-element__label">
            <abbr class="slds-required" title="required" v-if="required">*</abbr> {{ label }}
        </legend>
        <div class="slds-form-element__control mt-8">
            <UiRadio v-for="option in options" :key="option.value" :label="option.label" :value="option.value"
                :name="name" :id="option.value" :model-value="modelValue"
                @update:modelValue="$emit('update:modelValue', $event)" />
        </div>
    </fieldset>
</template>
