<script lang="ts" setup>
import type { PropType } from "vue";
import type { BrokerSelectOption } from "~~/models/brokerSelectOption";

//all keyvault secrets are server side only
const { data, status, error } = await useFetch("/api/ai-search/broker");
const aiBrokerSearchUri = data.value.aiBrokerSearchUri;
const aiSearchApiKey = data.value.aiSearchApiKey;
const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
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
        default: "",
    },
    placeholder: {
        type: String,
        default: "",
    },
    modelValue: {
        type: Object as PropType<BrokerSelectOption>,
        default: null,
    },
    labelClass: {
        type: String,
        default: "",
    },
    dropdownTop: {
        type: Boolean,
        default: false,
    },
    hasError: {
        type: Boolean,
        default: false,
    }
});

const options = ref<Array<BrokerSelectOption>>([]);
const isOpen = ref(false);
const activeItemId = ref("");

const toggleOpen = () => {
    if (props.modelValue && options.value.length > 0 && !isOpen.value)
        isOpen.value = true;
    else isOpen.value = false;
};

onMounted(async () => {
    isOpen.value = false;
    window.addEventListener("click", (e) => {
        if (
            e.target.classList.contains("slds-combobox__input") ||
            e.target.classList.contains("slds-listbox__item")
        )
            return;
        // validateCompanySelection();
        isOpen.value = false;
    });
});

onBeforeUnmount(() => {
    window.removeEventListener("click", () => {
        isOpen.value = false;
    });
});

const searchShowSuggestions = async (event: any) => {
    const brokerQuery = event.target.value;
    emit("update:modelValue", {
        id: "searching",
        name: brokerQuery,
        title: "",
    });
    options.value = [];
    if (!brokerQuery || brokerQuery.length < 2) {
        return;
    }
    try {
        const suggestions: any = await $fetch(
            `${aiBrokerSearchUri}${brokerQuery}`,
            {
                method: "GET",
                headers: {
                    "api-key": aiSearchApiKey,
                },
            }
        );
        let brokerSuggestions: BrokerSelectOption[] = suggestions["value"]
        //only commission eligible are brokers
        options.value = brokerSuggestions.filter(br => br.commissionEligible === "true")
        if (options.value.length > 0) {
            isOpen.value = true;
        }
    } catch (error) {
        console.error("Error fetching AI search suggestions:", error);
    }
};

const onOptionSelected = (option: BrokerSelectOption) => {
    emit("update:modelValue", option);
    isOpen.value = false;
};

const onKeyUp = (event: KeyboardEvent) => {
    if (options.value.length > 0) {
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            const currentIndex = options.value.findIndex(
                (option) => option.id === activeItemId.value
            );
            if (event.key === "ArrowDown") {
                activeItemId.value =
                    options.value[(currentIndex + 1) % options.value.length].id;
            } else if (event.key === "ArrowUp") {
                activeItemId.value =
                    options.value[
                        (currentIndex - 1 + options.value.length) % options.value.length
                    ].id;
            }
            event.preventDefault();
            return;
        }
    }
};

const onKeyUpEnter = () => {
    const option = options.value.find(
        (option) => option.id === activeItemId.value
    );
    emit("update:modelValue", option);
    isOpen.value = false;
}
</script>

<template>
    <div class="slds-form-element">
        <label class="slds-form-element__label" :for="id" :id="`${id}-label`" :class="labelClass">
            <abbr class="slds-required" title="required" v-if="required">* </abbr>{{ label }}</label>
        <div class="slds-form-element__control">
            <div class="slds-combobox_container">
                <div class="slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click"
                    :class="{ 'slds-is-open': isOpen }" @click="toggleOpen()">
                    <div class="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_right" role="none"
                        :class="{ 'slds-has-error': hasError }">
                        <input type="text" class="slds-input slds-combobox__input slds-combobox__input-value" :id="id"
                            aria-autocomplete="list" :aria-controls="id" aria-expanded="true" aria-haspopup="listbox"
                            autoComplete="off" role="combobox" placeholder="Search People..." :value="modelValue?.name"
                            v-bind="$attrs" @input="searchShowSuggestions($event)" @keyup.prevent="onKeyUp($event)"
                            @keyup.enter.prevent="onKeyUpEnter()" />
                        <span
                            class="slds-icon_container slds-icon-utility-search slds-input__icon slds-input__icon_right">
                            <svg class="slds-icon slds-icon slds-icon_x-small slds-icon-text-default"
                                aria-hidden="true">
                                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#search"></use>
                            </svg>
                        </span>
                    </div>
                    <div :id="`listbox-id-${id}`" class="slds-dropdown slds-dropdown_length-5 slds-dropdown_fluid"
                        :class="{ 'slds-dropdown_bottom': dropdownTop }" role="listbox" style="z-index: 9999"
                        aria-label="{{Placeholder for Dropdown Items}}" tabindex="0" aria-busy="false">
                        <ul class="slds-listbox slds-listbox_vertical" role="presentation">
                            <li role="presentation" class="slds-listbox__item hover:bg-gray-400"
                                v-for="option in options" :key="option.id" @click="onOptionSelected(option)"
                                @keyup.prevent="onKeyUp($event)" :class="{ 'bg-gray-100': activeItemId === option.id }"
                                @mouseover.prevent="activeItemId = option.id">
                                <div :id="option.id"
                                    class="slds-media slds-listbox__option slds-listbox__option_entity slds-listbox__option_has-meta"
                                    role="option">
                                    <span class="slds-media__figure slds-listbox__option-icon">
                                        <span class="slds-icon_container slds-icon-standard-account">
                                            <svg class="slds-icon slds-icon_small" aria-hidden="true">
                                                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#user">
                                                </use>
                                            </svg>
                                        </span>
                                    </span>
                                    <span class="slds-media__body">
                                        <span class="slds-listbox__option-text slds-listbox__option-text_entity">
                                            {{ option.name }}
                                        </span>
                                        <span class="slds-listbox__option-meta slds-listbox__option-meta_entity">
                                            {{ `• ${option.title}` }}
                                        </span>
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="slds-form-element__help text-red-600" :id="`error-message-id-${id}`" v-if="hasError">
                Please search and select a valid company.
            </div>
        </div>
    </div>
</template>
