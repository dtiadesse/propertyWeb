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
    options: {
        type: Array<string>,
        required: true
    },
    labelClass: {
        type: String,
        default: ''
    },
    labelId: {
        type: String,
        default: ''
    },
    listBoxId: {
        type: String,
        default: ''
    },
    selectedValueDefault: {
        type: String,
        default: '--None--'
    },
    dropdownTop: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    }
})
const isOpen = ref(false);
const toggleOpen = () => isOpen.value = !isOpen.value;

onMounted(async () => {
    isOpen.value = false;
    window.addEventListener("click", (e) => {
        if (e.target.classList.contains("slds-combobox__input")) return;
        isOpen.value = false;
    });
});

onBeforeUnmount(() => {
    window.removeEventListener("click", () => {
        isOpen.value = false;
    });
});
</script>

<template>
    <div class="slds-form-element">
        <label class="slds-form-element__label" :for="id" :id="labelId" :class="labelClass">
            <abbr class="slds-required" title="required" v-if="required">* </abbr>{{ label }}</label>
        <div class="slds-form-element__control">
            <div class="slds-combobox_container">
                <div class="slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click"
                    :class="{ 'slds-is-open': isOpen, 'bg-gray-400': disabled }" @click="toggleOpen()">
                    <div class="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_right" role="none">
                        <div role="combobox" tabindex="0" class="slds-input_faux slds-combobox__input"
                            :aria-labelledby="`${labelId}-130`" :id="`${id}-selected-value`"
                            aria-controls="listbox-id-28" aria-expanded="false" aria-haspopup="listbox">
                            <span class="slds-truncate" id="combobox-value-id-95">
                                {{ modelValue === '' ? selectedValueDefault : modelValue }}
                            </span>
                        </div>
                        <span
                            class="slds-icon_container slds-icon-utility-down slds-input__icon slds-input__icon_right">
                            <svg class="slds-icon slds-icon slds-icon_x-small slds-icon-text-default"
                                aria-hidden="true">
                                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#down"></use>
                            </svg>
                        </span>
                    </div>
                    <div id="listbox-id-28" class="slds-dropdown slds-dropdown_length-5 slds-dropdown_fluid"
                        :class="{ 'slds-dropdown_bottom': dropdownTop }" role="listbox"
                        aria-label="{{Placeholder for Dropdown Items}}" tabindex="0" aria-busy="false">
                        <ul class="slds-listbox slds-listbox_vertical" role="presentation">
                            <li role="presentation" class="slds-listbox__item" v-for="option in options" :key="option"
                                @click="$emit('update:modelValue', option)">
                                <div :id="option" role="option"
                                    class="slds-media slds-listbox__option slds-listbox__option_plain slds-media_small">
                                    <span class="slds-media__figure slds-listbox__option-icon">
                                        <span class="slds-icon_container slds-icon-utility-check slds-current-color">
                                            <svg v-if="option === modelValue" class="slds-icon slds-icon_x-small"
                                                aria-hidden="true">
                                                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#check">
                                                </use>
                                            </svg>
                                        </span>
                                    </span>
                                    <span class="slds-media__body">
                                        <span class="slds-truncate" :title="option">{{ option }}</span>
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
