<script lang="ts" setup>
//all keyvault secrets are server side only
const { data, status, error } = await useFetch('/api/kv/companyaisearch');
const aiCompanySearchUri = data.value.aiCompanySearchUri;
const aiSearchApiKey = data.value.aiSearchApiKey;
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
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
        type: String,
        default: '',
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
    }
})

const options = ref<Array<string>>([]);
const isOpen = ref(false);
const toggleOpen = () => {
    if (props.modelValue.length > 1 && options.value.length > 0 && !isOpen.value)
        isOpen.value = true;
    else
        isOpen.value = false;
}

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

const searchShowSuggestions = async (event: any) => {
    const companyQuery = event.target.value;
    emit('update:modelValue', companyQuery);
    options.value = []
    if (!companyQuery || companyQuery.length < 2) {
        return;
    }
    try {
        const suggestions: any = await $fetch(`${aiCompanySearchUri}${companyQuery}`, {
            method: 'GET',
            headers: {
                'api-key': aiSearchApiKey
            }
        });
        options.value = suggestions["value"].map(option => option.name);
        if (options.value.length > 0) {
            isOpen.value = true;
        }
    } catch (error) {
        console.error('Error fetching AI search suggestions:', error);
    }
}

const onOptionSelected = (option: string) => {
    emit('update:modelValue', option);
    isOpen.value = false;
}


</script>

<template>
    <div class="slds-form-element">
        <label class="slds-form-element__label" :for="id" :id="labelId" :class="labelClass">
            <abbr class="slds-required" title="required" v-if="required">* </abbr>{{ label }}</label>
        <div class="slds-form-element__control">
            <div class="slds-combobox_container">
                <div class="slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click"
                    :class="{ 'slds-is-open': isOpen }" @click="toggleOpen()">
                    <div class="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_right" role="none">
                        <input type="text"
                            class="slds-input slds-combobox__input slds-has-focus slds-combobox__input-value" :id="id"
                            aria-autocomplete="list" aria-controls="listbox-id-11" aria-expanded="true"
                            aria-haspopup="listbox" autoComplete="off" role="combobox" :placeholder="placeholder"
                            :value="modelValue" v-bind="$attrs" @input="searchShowSuggestions($event);" />
                        <span
                            class="slds-icon_container slds-icon-utility-search slds-input__icon slds-input__icon_right">
                            <svg class="slds-icon slds-icon slds-icon_x-small slds-icon-text-default"
                                aria-hidden="true">
                                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#search"></use>
                            </svg>
                        </span>
                    </div>
                    <div id="listbox-id-28" class="slds-dropdown slds-dropdown_length-5 slds-dropdown_fluid"
                        :class="{ 'slds-dropdown_bottom': dropdownTop }" role="listbox"
                        aria-label="{{Placeholder for Dropdown Items}}" tabindex="0" aria-busy="false">
                        <ul class="slds-listbox slds-listbox_vertical" role="presentation">
                            <li role="presentation" class="slds-listbox__item" v-for="option in options" :key="option"
                                @click="onOptionSelected(option)">
                                <div :id="option" role="option"
                                    class="slds-media slds-listbox__option slds-listbox__option_plain slds-media_small">
                                    <span class="slds-media__figure slds-listbox__option-icon">
                                        <span class="slds-icon_container slds-icon-utility-check slds-current-color">
                                            <svg v-if="option === modelValue" class="slds-icon slds-icon_x-small"
                                                aria-hidden="true">
                                                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#check">
                                                </use>
                                            </svg>
                                            <span class="slds-media__figure slds-listbox__option-icon" v-else>
                                                <span class="slds-icon_container slds-icon-standard-account">
                                                    <svg class="slds-icon slds-icon_small bg-white" aria-hidden="true">
                                                        <use
                                                            xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#account">
                                                        </use>
                                                    </svg>
                                                </span>
                                            </span>
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
