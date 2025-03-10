<template>
  <div v-if="config.config.value.editMode || editMode" class="slds-form-element"
    :class="{ 'slds-has-error': props.hasError }">
    <label v-if="props.label" class="slds-form-element__label" for="combobox-id-21" id="combobox-label-id-56">
      <abbr v-if="props.required" class="slds-required" title="required">* </abbr>
      {{ props.label
      }}</label>
    <div class="slds-form-element__control">
      <div class="slds-combobox_container">
        <div class="slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click"
          :class="{ 'slds-is-open': showResults }">
          <div v-if="!valueSelected" class="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_right"
            role="none">
            <input type="text" class="slds-input slds-combobox__input" id="combobox-id-21" autocomplete="off"
              aria-autocomplete="none" autocorrect="off" autocapitalize="off" spellcheck="false"
              aria-controls="listbox-id-14" aria-expanded="false" aria-haspopup="listbox" v-model="query"
              @input="onInput" role="combobox" :placeholder="props.placeholder" @focus="showResults = true"
              @click.stop="false" style="box-shadow: none;" />
            <span :class="{ 'hide-search': props.hideSearch === true }"
              class="slds-icon_container slds-icon-utility-search slds-input__icon slds-input__icon_right">
              <svg class="slds-icon slds-icon slds-icon_x-small slds-icon-text-default" aria-hidden="true">
                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#search"></use>
              </svg>
            </span>

          </div>
          <div v-else class="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_left-right"
            role="none">
            <span class="slds-icon_container slds-combobox__input-entity-icon"
              :class="{ 'slds-icon-standard-account': props.model === 'company', 'slds-icon-standard-contact': props.model === 'contact' }"
              title="">
              <svg v-if="props.model === 'company'" class="slds-icon slds-icon_small" aria-hidden="true">
                <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#account"></use>
              </svg>
              <svg v-else-if="props.model === 'contact'" class="slds-icon slds-icon_small" aria-hidden="true">
                <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#account"></use>
              </svg>
              <span class="slds-assistive-text">Account</span>
            </span>
            <div role="combobox" tabindex="0" class="slds-input_faux slds-combobox__input slds-combobox__input-value"
              :class="{ 'reset-left-padding': props.model !== 'company' && props.model !== 'contact' }"
              aria-labelledby="combobox-label-id-130" id="combobox-id-18-selected-value" aria-controls="listbox-id-18"
              aria-expanded="false" aria-haspopup="listbox">
              <span class="slds-truncate" id="combobox-value-id-93">{{ selected }}</span>
            </div>
            <button class="slds-button slds-button_icon slds-input__icon slds-input__icon_right"
              title="Remove selected option" @click="removeSelected">
              <svg class="slds-button__icon" aria-hidden="true">
                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#close"></use>
              </svg>
              <span class="slds-assistive-text">Remove selected option</span>
            </button>
          </div>
          <div v-if="results.length > 0 || isSearching" id="listbox-id-14" style="max-height: 10rem;"
            class="slds-dropdown slds-dropdown_length-with-icon-7 slds-dropdown_fluid" role="listbox" aria-label=""
            tabindex="0" aria-busy="false">
            <ul class="slds-listbox slds-listbox_vertical" role="presentation">
              <li v-for="item in results" role="presentation" class="slds-listbox__item" @click="selectValue(item)">
                <div id="option345"
                  class="slds-media slds-listbox__option slds-listbox__option_entity slds-listbox__option_has-meta"
                  role="option">
                  <span v-if="props.model === 'company' || props.model === 'contact'"
                    class="slds-media__figure slds-listbox__option-icon">
                    <span class="slds-icon_container"
                      :class="{ 'slds-icon-standard-account': props.model === 'company', 'slds-icon-standard-contact': props.model === 'contact' }">
                      <svg v-if="props.model === 'company'" class="slds-icon slds-icon_small" aria-hidden="true">
                        <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#account"></use>
                      </svg>
                      <svg v-else-if="props.model === 'contact'" class="slds-icon slds-icon_small" aria-hidden="true">
                        <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#contact"></use>
                      </svg>
                    </span>
                  </span>
                  <span :title="item.Name" class="slds-media__body" style="align-self: center;">
                    <span class="slds-listbox__option-text slds-listbox__option-text_entity">{{ item.Name }}</span>

                  </span>
                </div>
              </li>

              <li v-if="isSearching" role="presentation" class="slds-listbox__item">
                <div id="option345"
                  class="slds-media slds-listbox__option slds-listbox__option_entity slds-listbox__option_has-meta"
                  role="option">

                  <span class="slds-media__body">
                    <span class="slds-listbox__option-text slds-listbox__option-text_entity"
                      :class="{ 'error-msg': waitMsg !== 'Searching ...' }">{{ waitMsg }}</span>
                  </span>
                </div>
              </li>

            </ul>
          </div>
        </div>
        <div class="slds-form-element__help" id="error-message-id">{{ props.hasError }}</div>
      </div>
    </div>
  </div>
  <div v-else>

    <UiItemValueBox :sf-object="props.sfObject" :label="props.label" :required="props.required" :value="props.selected"
      :model="props.model" />
  </div>
</template>

<script lang="ts" setup>

const config = useConfig();
const runtimeConfig = useRuntimeConfig()

const props = defineProps(['required', 'label', 'name', 'model', 'placeholder', 'hasError', 'editMode', 'options', 'selected', 'reset', 'sfObject', 'hideSearch'])

const { editMode = true } = props;
const showResults = ref(false);

// const selected = ref('');
const waitMsg = ref("Searching ...")

const query = ref('');
const results: any = ref([]);
const valueSelected = ref(false)
const isSearching = ref(false);
const propertyStore = useMyPropertyStore();

let subMarket: any = null;
let market: any = null;
let amenity: any = null;
let feature: any = null;
let fees: any = null;


const emit = defineEmits(["itemSelected", "inputChanged"])
const selected = defineModel()

const selectValue = (item: any) => {
  selected.value = item.Name;
  showResults.value = false;


  if (props.name) {
    propertyStore.captureChanges(props.name, item.Name);
  }

  query.value = item.Name;
  valueSelected.value = true;

  emit("itemSelected", item);
}

const removeSelected = () => {
  selected.value = '';
  valueSelected.value = false;
  emit("itemSelected", '');
}

const onInput = () => {
  if (query.value.length >= 1) {
    isSearching.value = true;
    fetchResults(query.value);
  } else {
    results.value = [];
    isSearching.value = false;
    // showResults.value = false;
  }

  emit("inputChanged", query.value);

}

const closeMenu = () => {
  showResults.value = false;
}

watch(() => props.reset, (s) => {
  selected.value = "";
  query.value = "";
  valueSelected.value = false;
});

watch(() => props.selected, (s) => {
  selected.value = props.selected;
  query.value = props.selected;
}, { immediate: true });

watch(() => selected.value, (s) => {
  if (!s) {
    query.value = '';
  }
});
onMounted(() => {
  window.addEventListener('click', closeMenu)
});

onBeforeUnmount(() => {
  window.removeEventListener('click', closeMenu)
})

const fetchResults = async (sKey: string) => {

  if (props.model === 'company') {
    const companyStore = useMyCompanyStore()

    const data = await companyStore.getCompanies({ search: sKey, returnResult: true, clientMode: false });

    if (data && data.length > 0) {
      results.value = data.map((item: any) => ({ Id: item.id, Name: item.name }))

    }
    else {
      results.value = []
    }
  }
  else if (props.model === 'contact') {
    const companyStore = useMyContactStore()
    const payload: any = { search: sKey, clientMode: false, returnResult: true };

    if (props.options && props.options.Company) {
      payload["companyId"] = props.options.Company.Id
    }

    const data = await companyStore.getContacts(payload);

    if (data && data.length > 0) {
      results.value = data.map((item: any) => ({ Id: item.id, Name: item.name }))

    }
    else {
      results.value = []
    }
  }
  else if (props.model === 'sub-market') {
    if (!subMarket) {
      subMarket = await $fetch('/data/sub-market.json');
    }

    const filteredResult = subMarket.filter((sm: any) => sm.toLowerCase().startsWith(sKey.toLowerCase()));

    results.value = filteredResult.map((fr: any) => ({ Id: fr, Name: fr }))
  }
  else if (props.model === 'market') {
    if (!market) {
      market = await $fetch('/data/market.json');
    }

    const filteredResult = market.filter((m: any) => m.toLowerCase().startsWith(sKey.toLowerCase()));

    results.value = filteredResult.map((fr: any) => ({ Id: fr, Name: fr }))

  }
  else if (props.model === 'amenity') {
    amenity = await $fetch(`${runtimeConfig.public.apiBaseUrl}/amenity-feature?searchKey=${sKey}&type=amenity`);
    results.value = amenity;
  }
  else if (props.model === 'feature') {
    feature = await $fetch(`${runtimeConfig.public.apiBaseUrl}/amenity-feature?searchKey=${sKey}&type=feature`);
    results.value = feature
  }
  else if (props.model === 'fees') {
    if (!fees) {
      fees = await $fetch('/data/fee.json');
    }

    const filteredResult = fees.filter((m: any) => m.toLowerCase().startsWith(sKey.toLowerCase()));

    results.value = filteredResult.map((fr: any) => ({ Id: fr, Name: fr }))

  }
  isSearching.value = false;

}

</script>

<style scoped>
.slds-dropdown_fluid {
  min-width: auto;
}

.error-msg {
  color: red;
}

.reset-left-padding {
  padding-left: 0.75rem !important;
}

.hide-search {
  display: none;
}
</style>