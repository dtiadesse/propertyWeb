<script lang="ts" setup>
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
    labelClass: {
        type: String,
        default: ''
    }
})
</script>

<template>
    <div class="slds-form-element">
        <label class="slds-form-element__label" :for="id" :class="labelClass">
            <abbr class="slds-required" title="required" v-if="required">* </abbr>{{ label }}</label>
        <div class="slds-form-element__control" :id="id">
            <input :placeholder="placeholder" class="slds-input p-2" :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)" v-bind="$attrs" :required="required" />
        </div>
    </div>
</template>
