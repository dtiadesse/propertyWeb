<script lang="ts" setup>
import type { SelectOption } from '~~/models/selectOption';

defineProps({
    id: {
        type: String,
        default: '',
    },
    required: {
        type: Boolean,
        default: false,
    },
    label: {
        type: String,
        default: '',
    },
    placeholder: {
        type: String,
        default: '',
    },
    modelValue: {
        type: [String, Number],
        default: '',
    },
    options: {
        type: Array<SelectOption>,
        required: true
    },
})
</script>

<template>
    <div class="slds-form-element">
        <label class="slds-form-element__label" :for="id">
            <abbr class="slds-required" title="required" v-if="required">* </abbr>{{ label }}</label>
        <div class="slds-form-element__control">
            <div class="slds-select_container">
                <select class="slds-select" :id="id" :required="required" :value="modelValue" v-bind="{
                    ...$attrs,
                    onChange: (event) => {
                        $emit('update:modelValue', event.target.value);
                    }
                }">
                    <option value="" class="my-1">--None--</option>
                    <option v-for="option in options" :key="option.value" :value="option.value"
                        :selected="option.value === modelValue" class="my-1">
                        {{ option.label }}
                    </option>
                </select>
            </div>
        </div>
    </div>
</template>
