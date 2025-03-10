<template>
  <div class="slds-form-element">
    <label class="slds-form-element__label" for="date-input-id-day_selected">
      <abbr v-if="required" class="slds-required" title="required">* </abbr>
      {{ label }}</label>
    <div class="slds-form-element__control">
      <div class="slds-combobox_container">
        <div class="slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click" :class="{ 'slds-is-open': isOpen }"
          @click.stop="toggleTimePicker">
          <div class="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_right" role="none">
            <input type="text" class="slds-input slds-combobox__input" id="example-unique-id" aria-activedescendant=""
              aria-autocomplete="list" aria-controls="" aria-expanded="false" aria-haspopup="listbox" autoComplete="off"
              role="combobox" placeholder="Select a time…" :value="formattedTime" />
            <span class="slds-icon_container slds-icon-utility-clock slds-input__icon slds-input__icon_right">
              <svg class="slds-icon slds-icon slds-icon_x-small slds-icon-text-default" aria-hidden="true">
                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#clock"></use>
              </svg>
            </span>
          </div>
          <div id="example-unique-id-45"
            class="slds-dropdown slds-dropdown_length-5 slds-dropdown_fluid slds-dropdown_left" role="listbox"
            aria-label="" tabindex="0" aria-busy="false" style="min-width: 9rem;">
            <ul class="slds-listbox slds-listbox_vertical" role="presentation">
              <li v-for="time in timeArray" role="presentation" class="slds-listbox__item">
                <div id="option85" class="slds-media slds-listbox__option slds-listbox__option_plain slds-media_small"
                  role="option" @click.stop="selectTime(time)">
                  <span class="slds-media__figure slds-listbox__option-icon"></span>
                  <span class="slds-media__body">
                    <span class="slds-truncate" :title="time">{{ time }}</span>
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

<script lang="ts" setup>
const isOpen = ref(false)


const { required, label, name, value, editMode, hasError, placeholder = "" } = defineProps(['required', 'label', 'name', 'value', 'editMode', 'hasError', 'placeholder'])

const emit = defineEmits(['timeSelected'])

function generateFullDayTimeArray(): string[] {
  const times: string[] = [];
  const padZero = (num: number) => num.toString().padStart(2, '0');

  for (let hour = 0; hour < 24; hour++) { // Loop from 0 to 23 (24-hour format)
    for (let minute = 0; minute < 60; minute += 30) { // 15-minute intervals
      const formattedTime = `${padZero(hour)}:${padZero(minute)}`;
      times.push(formattedTime);
    }
  }

  return times;
}

const selectedTime = ref(null)

const formattedTime = computed(() => {
  return selectedTime.value
    ? selectedTime.value
    : value ? value : '';
});

const timeArray: any = ref([])


timeArray.value = generateFullDayTimeArray()

const toggleTimePicker = () => {
  isOpen.value = !isOpen.value;
}

const closeTimePicker = () => {
  isOpen.value = false;
}

const selectTime = (value: any) => {
  selectedTime.value = value;
  emit('timeSelected', selectedTime.value)
  closeTimePicker()
}
onMounted(async () => {
  window.addEventListener('click', closeTimePicker)
});

onBeforeUnmount(() => {
  window.removeEventListener('click', closeTimePicker)
})


</script>

<style scoped></style>