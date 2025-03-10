<template>
  <div v-if="config.config.value.editMode || editMode" class="slds-form-element"
    :class="{ 'slds-has-error': props.hasError }">
    <label v-if="props.label" class="slds-form-element__label" for="combobox-id-21" id="combobox-label-id-56"> <abbr
        v-if="props.required" class="slds-required" title="required">* </abbr>
      {{ props.label
      }}</label>
    <div class="slds-form-element__control">
      <div class="slds-combobox_container">
        <div class="slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click"
          :class="{ 'slds-is-open': showResults }">
          <div v-if="!selected" class="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_right"
            role="none">
            <input type="text" class="slds-input slds-combobox__input" id="google-address-box" autocomplete="off"
              aria-autocomplete="none" autocorrect="off" autocapitalize="off" spellcheck="false"
              aria-controls="listbox-id-14" aria-expanded="false" aria-haspopup="listbox" v-model="query"
              @input="onInput" role="combobox" :placeholder="props.placeholder" @focus="showResults = true"
              @click.stop="false" />
            <span class="slds-icon_container slds-icon-utility-search slds-input__icon slds-input__icon_right">
              <svg class="slds-icon slds-icon slds-icon_x-small slds-icon-text-default" aria-hidden="true">
                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#search"></use>
              </svg>
            </span>

          </div>


          <div v-else class="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_left-right"
            role="none">
            <span class="slds-icon_container slds-icon-standard-address slds-combobox__input-entity-icon"
              title="Address">
              <svg class="slds-icon slds-icon_small" aria-hidden="true">
                <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#address"></use>
              </svg>
              <span class="slds-assistive-text">Address</span>
            </span>
            <div role="combobox" tabindex="0" class="slds-input_faux slds-combobox__input slds-combobox__input-value"
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
                  <span class="slds-media__figure slds-listbox__option-icon">
                    <span class="slds-icon_container slds-icon-standard-address">
                      <svg class="slds-icon slds-icon_small" aria-hidden="true">
                        <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#address"></use>
                      </svg>
                    </span>
                  </span>
                  <span class="slds-media__body" style="align-self: center;">
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
        <div class="slds-form-element__help" id="error-message-id">Search for address to autofill information in this
          section</div>
      </div>
    </div>
  </div>
  <div v-else>
    <UiItemValueBox :label="props.label" :required="props.required" :value="selected" />
  </div>
</template>

<script lang="ts" setup>

declare var google: any;

const config = useConfig();


const props = defineProps(['required', 'label', 'name', 'model', 'placeholder', 'hasError', 'editMode', 'options'])

const { editMode = true } = props;
const showResults = ref(false);

let autocompleteService: any = null;
let placesService: any = null;


// const selected = ref('');
const waitMsg = ref("Searching ...")

const query = ref('');
const results: any = ref([]);
const isSearching = ref(false);

const emit = defineEmits(["itemSelected", "inputChanged"])
const selected = defineModel()

const selectValue = (item: any) => {
  selected.value = item.Name;
  showResults.value = false;
  fetchPlaceDetails(item.Value);
}

const removeSelected = () => {
  selected.value = '';
  emit("itemSelected", '');
}

const parsePlaceDetails = (place: any) => {
  const components = place.address_components || [];
  const getComponent = (type: any) =>
    components.find((component: any) => component.types.includes(type));

  const coordinates: any = {}

  if (place.geometry.location) {
    coordinates['latitude'] = place.geometry.location.lat()
    coordinates['longitude'] = place.geometry.location.lng()
  }



  const item = {
    street: `${getComponent('street_number')?.long_name || ''} ${getComponent('route')?.long_name}`.trim(),
    city: getComponent('locality')?.long_name || '',
    state: getComponent('administrative_area_level_1')?.long_name || '',
    stateCode: getComponent('administrative_area_level_1')?.short_name || '',
    county: getComponent('administrative_area_level_2')?.long_name || '',
    stdCounty: getComponent('administrative_area_level_2')?.long_name || '',
    country: getComponent('country')?.long_name,
    countryCode: getComponent('country')?.short_name,
    postal_code: getComponent('postal_code')?.long_name || '',
    full_address: place.formatted_address,
    ...coordinates
  };

  return item;
};

const fetchPlaceDetails = (placeId: any) => {
  if (placesService) {
    placesService.getDetails(
      { placeId: placeId },
      (place: any, status: any) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          // Parse the place details
          const place_details = parsePlaceDetails(place);
          emit("itemSelected", place_details)
        } else {
          console.error('Failed to fetch place details:', status);
        }
      }
    );
  }
};

const onInput = () => {
  autocompleteService.getPlacePredictions(
    {
      input: query.value,
      componentRestrictions: { country: 'us' }, // Optional: Restrict to a country
      types: ['address'], // Optional: Restrict to address types
    },
    (predictions: any, status: any) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
        results.value = predictions.map((p: any) => ({ Name: p.description, Value: p.place_id }))
      } else {
        results.value = [];
      }
      isSearching.value = false;
    }
  );




  if (query.value.length >= 1) {
    isSearching.value = true;
    // fetchResults(query.value);
  } else {
    results.value = [];
    isSearching.value = false;
    // showResults.value = false;
  }

}

const closeMenu = () => {
  showResults.value = false;
}

watch(() => selected.value, (s) => {
  if (!s) {
    query.value = '';
  }
});
onMounted(() => {
  window.addEventListener('click', closeMenu);
  autocompleteService = new google.maps.places.AutocompleteService();
  placesService = new google.maps.places.PlacesService(document.createElement('div'));
});

onBeforeUnmount(() => {
  window.removeEventListener('click', closeMenu)
})

const fetchResults = async (sKey: string) => {
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
</style>