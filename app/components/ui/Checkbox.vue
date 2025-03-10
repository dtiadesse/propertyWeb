<script lang="ts" setup>
defineProps({
    id: {
        type: String,
        required: true,
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
        type: Boolean,
        default: false,
    },
})
</script>

<template>
    <div class="slds-form-element">
        <div class="slds-form-element__control">
            <div class="slds-checkbox">
                <abbr class="slds-required" title="required" v-if="required">*</abbr>
                <input type="checkbox" :id="id" :checked="modelValue"
                    @change="$emit('update:modelValue', $event.target.checked)" />
                <label class="slds-checkbox__label" :for="id">
                    <span class="slds-checkbox_faux"></span>
                    <span class="slds-form-element__label">{{ label }}</span>
                </label>
            </div>
        </div>
    </div>
</template>
