<template>
  <div v-if="config.config.value.editMode || editMode" @click.stop
    class="slds-form-element slds-dropdown-trigger slds-dropdown-trigger_click"
    :class="{ 'slds-is-open': isOpen, 'slds-has-error': hasError }">
    <label class="slds-form-element__label" for="date-input-id-day_selected">
      <abbr v-if="required" class="slds-required" title="required">* </abbr>
      {{ label }}</label>
    <div class="slds-form-element__control slds-input-has-icon slds-input-has-icon_right">
      <input type="text" id="date-input-id-day_selected" :placeholder="placeholder" class="slds-input"
        :value="formattedDate" autocomplete="off" aria-autocomplete="none" autocorrect="off" autocapitalize="off"
        spellcheck="false" @change="handleInputChange" />
      <button class="slds-button slds-button_icon slds-input__icon slds-input__icon_right" title="Select a date"
        @click.stop="toggleDatePicker">
        <svg class="slds-button__icon" aria-hidden="true">
          <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#event"></use>
        </svg>
        <span class="slds-assistive-text">Select a date</span>
      </button>

    </div>


    <div aria-hidden="false" aria-label="Date picker: June" class="slds-datepicker slds-dropdown slds-dropdown_left"
      role="dialog">
      <div class="slds-datepicker__filter slds-grid">
        <div class="slds-datepicker__filter_month slds-grid slds-grid_align-spread slds-grow">
          <div class="slds-align-middle">
            <button class="slds-button slds-button_icon slds-button_icon-container" title="Previous Month"
              @click="prevMonth">
              <svg class="slds-button__icon" aria-hidden="true">
                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#left"></use>
              </svg>
              <span class="slds-assistive-text">Previous Month</span>
            </button>
          </div>
          <h2 aria-atomic="false" aria-live="polite" class="slds-align-middle" id="pickerDaySelected-month">{{ monthYear
          }}</h2>
          <div class="slds-align-middle">
            <button class="slds-button slds-button_icon slds-button_icon-container" title="Next Month"
              @click="nextMonth">
              <svg class="slds-button__icon" aria-hidden="true">
                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#right"></use>
              </svg>
              <span class="slds-assistive-text">Next Month</span>
            </button>
          </div>
        </div>

      </div>
      <table aria-multiselectable="true" class="slds-datepicker__month" role="grid">
        <thead>
          <tr id="pickerDaySelected-weekdays">
            <th v-for="day in daysOfWeek" :key="day" id="pickerDaySelected-Sunday" scope="col">
              <abbr :title="day"> {{ day }}</abbr>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="week in calendar">
            <td v-for="day in week" :class="{
              'slds-is-today': day.isToday,
              'slds-is-selected': day.isSelected,
              'slds-disabled-text': day.isDisabled
            }" aria-selected="false" class="slds-day_adjacent-month" role="gridcell" aria-label="31 May 2020">
              <span class="slds-day" @click="selectDate(day.date)">{{ day.label }}</span>
            </td>

          </tr>

        </tbody>
      </table>
      <button class="slds-button slds-align_absolute-center slds-text-link" @click="selectToday">Today</button>
    </div>
    <div class="slds-form-element__help" id="error-message-id">{{ hasError }}</div>

  </div>
  <div v-else>
    <UiItemValueBox :label="label" :required="required" :value="formattedDate" />
  </div>
</template>

<script lang="ts" setup>

const isOpen = ref(false)

const config = useConfig();

const { required, label, name, value, editMode, hasError, placeholder = "" } = defineProps(['required', 'label', 'name', 'value', 'editMode', 'hasError', 'placeholder'])


const emit = defineEmits(['dateSelected'])

const toggleDatePicker = () => {
  isOpen.value = !isOpen.value;
}

const closeDatePicker = () => {
  isOpen.value = false;
}
onMounted(async () => {
  window.addEventListener('click', closeDatePicker)
});

onBeforeUnmount(() => {
  window.removeEventListener('click', closeDatePicker)
})

const today = new Date();
const showCalendar = ref(false);
const currentMonth = ref(today.getMonth());
const currentYear = ref(today.getFullYear());
const selectedDate = ref();

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const toggleCalendar = () => {
  showCalendar.value = !showCalendar.value;
};

const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value -= 1;
  } else {
    currentMonth.value -= 1;
  }
};

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value += 1;
  } else {
    currentMonth.value += 1;
  }
};

const selectToday = () => {
  const today = new Date();
  selectedDate.value = today;
  currentMonth.value = today.getMonth();
  currentYear.value = today.getFullYear();
  showCalendar.value = false;
  updateStore(selectedDate.value);
};

const monthYear = computed(() => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return `${monthNames[currentMonth.value]} ${currentYear.value}`;
});


const formattedDate = computed(() => {
  let localDate = selectedDate.value
    ? selectedDate.value.toLocaleDateString('en-US')
    : value ? new Date(value).toLocaleDateString('en-US') : '';

  return localDate;
});
const propertyStore = useMyPropertyStore();

const handleInputChange = (event: any) => {
  try {
    const dt = event.target.value.trim();

    if (!dt) {
      emit('dateSelected', null)
    }
    else {
      if (dt && dt.toString() !== 'Invalid Date') {
        updateStore(dt)
      }
    }
  }
  catch (e) {

  }

}

const updateStore = (value: any) => {
  if (name) {
    propertyStore.captureChanges(name, value.toLocaleDateString('en-US'))
  }
  emit('dateSelected', value.toLocaleDateString('en-US'))
  closeDatePicker();
}
const selectDate = (date: any) => {
  selectedDate.value = date;
  showCalendar.value = false;
  updateStore(selectedDate.value);
};

watch(() => value, (v) => {
  selectedDate.value = null
})

const calendar = computed(() => {
  const daysInMonth = new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
  const firstDay = new Date(currentYear.value, currentMonth.value, 1).getDay();
  const rows = [];
  let cells = [];
  for (let i = 0; i < firstDay; i++) {
    cells.push({ label: '', isDisabled: true });
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear.value, currentMonth.value, day);
    cells.push({
      label: day,
      date,
      isToday: date.toDateString() === today.toDateString(),
      isSelected: date.toDateString() === selectedDate.value?.toDateString(),
      isDisabled: false,
    });
    if (cells.length === 7) {
      rows.push(cells);
      cells = [];
    }
  }
  if (cells.length > 0) {
    while (cells.length < 7) {
      cells.push({ label: '', isDisabled: true });
    }
    rows.push(cells);
  }
  return rows;
});
</script>

<style scoped></style>