<script lang="ts" setup>
defineProps({
    id: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        default: '',
    },
    modelValue: {
        type: [String, Number],
        default: '',
    },
    value: {
        type: [String, Number],
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
})
</script>

<template>
    <span class="slds-radio my-2">
        <input type="radio" :id="id" :value="value" :checked="modelValue === value"
            @change="$emit('update:modelValue', value)" :name="name" v-bind="$attrs" />
        <label class="slds-radio__label" :for="id">
            <span class="slds-radio_faux"></span>
            <span class="slds-form-element__label">{{ label }}</span>
        </label>
    </span>
</template>
