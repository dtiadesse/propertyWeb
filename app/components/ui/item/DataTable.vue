<template>
  <div ref="tbl-container" :class="{ 'tableFixHead': enableScroll, 'limit-height': limitHeight }" :style="styleRef">
    <table v-if="data && data.length" aria-multiselectable="true"
      class="slds-table slds-table_bordered slds-table_fixed-layout slds-table_resizable-cols" role="grid"
      aria-label="Example advanced table of Opportunities in actionable mode">
      <thead>
        <tr class="slds-line-height_reset">
          <template v-for="col of columns">
            <th v-if="col.name === 'id' || col.type === 'key'" class="slds-text-align_right slds-cell_action-mode"
              scope="col" style="width:3.25rem">
              <span id="column-group-header" class="slds-assistive-text">Choose a row</span>
              <div class="slds-th__action slds-th__action_form">
                <div v-if="selectType === 'multiple'" class="slds-checkbox">
                  <input type="checkbox" name="options" id="checkbox-all" value="all" tabindex="0"
                    aria-labelledby="check-select-all-label column-group-header" v-model="selectAllRef"
                    @change="toggleSelectAll" />
                  <label class="slds-checkbox__label" for="checkbox-all" id="check-select-all-label">
                    <span class="slds-checkbox_faux" :class="{ 'select-all-partial': selectPartial }"></span>
                    <span class="slds-form-element__label slds-assistive-text">Select All</span>
                  </label>
                </div>
              </div>
            </th>
            <th v-else aria-sort="none" class="slds-is-resizable slds-is-sortable slds-cell_action-mode" scope="col"
              :class="{ 'slds-has-focus': col.name === sortKey }">
              <a class="slds-th__action slds-text-link_reset" @click.prevent="handleSort(col)" href="javascript;"
                role="button" tabindex="0">
                <span class="slds-assistive-text">Sort by: </span>
                <div class="slds-grid slds-grid_vertical-align-center slds-has-flexi-truncate" :class="col.class">
                  <span class="slds-truncate" title="Name">{{ col.label }}</span>
                  <span v-if="col.sort && sortOrder.toLowerCase() === 'asc'"
                    class="slds-icon_container slds-icon-utility-arrowdown">
                    <svg class="slds-icon slds-icon-text-default slds-is-sortable__icon" aria-hidden="true">
                      <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#arrowup"></use>
                    </svg>
                  </span>
                  <span v-else-if="col.sort && sortOrder.toLowerCase() === 'desc'"
                    class="slds-icon_container slds-icon-utility-arrowdown">
                    <svg class="slds-icon slds-icon-text-default slds-is-sortable__icon" aria-hidden="true">
                      <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#arrowdown"></use>
                    </svg>
                  </span>
                </div>
              </a>
              <div class="slds-resizable">
                <input type="range" aria-label="Name column width" class="slds-resizable__input slds-assistive-text"
                  id="cell-resize-handle-15" max="1000" min="20" tabindex="0" />
                <span class="slds-resizable__handle">
                  <!-- <span class="slds-resizable__divider"></span> -->
                </span>
              </div>
            </th>
          </template>
          <th v-if="showAction" class="slds-cell_action-mode" scope="col" style="width:3.25rem">
            <div class="slds-truncate slds-assistive-text" title="Actions">Actions</div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in data" aria-selected="false" class="slds-hint-parent">
          <template v-for="col of columns">
            <td v-if="col.name === 'id' || col.type === 'key'" class="slds-text-align_right slds-cell_action-mode"
              role="gridcell">
              <div v-if="selectType === 'single'" class="slds-checkbox radio-custom">
                <span class="slds-radio">
                  <input type="radio" :id="'radio' + row.id" :value="row.id" name="singleOption"
                    @change="handleItemSelect" tabindex="0" aria-labelledby="" />
                  <label class="slds-radio__label" :for="'radio' + row.id" :id="'radio-button' + row.id">
                    <span class="slds-radio_faux"></span>
                    <span class="slds-form-element__label slds-assistive-text">Select item</span>
                  </label>
                </span>
              </div>

              <div v-if="selectType === 'multiple'" class="slds-checkbox">
                <input type="checkbox" name="multipleOptions[]" :id="'checkbox' + row.id" :value="row.id"
                  v-model="row.checked" tabindex="0" :checked="row.checked"
                  aria-labelledby="check-button-label-01 column-group-header" @change="handleItemSelect" />

                <label class="slds-checkbox__label" :for="'checkbox' + row.id" id="check-button-label">
                  <span class="slds-checkbox_faux"></span>
                  <span class="slds-form-element__label slds-assistive-text">Select</span>
                </label>
              </div>

            </td>
            <td v-else class="slds-cell_action-mode" scope="row">
              <div class="slds-truncate" :class="col.class" :title="row[col]">
                <NuxtLink v-if="col.type === 'Url'" :to="{ name: 'property-id', params: { id: row['id'] } }">{{
                  row[col.name] }}</NuxtLink>
                <a href="javascript:;" @click.prevent="triggerAction(row, col)" v-else-if="col.triggerAction">{{
                  row[col.name] }}</a>
                <span v-else style="text-align: center;">{{ row[col.name] }}</span>
              </div>
            </td>
          </template>
          <td v-if="showAction" class="slds-cell_action-mode" role="gridcell">
            <div class="slds-dropdown-trigger slds-dropdown-trigger_click"
              :class="{ 'slds-is-open': row['show-menu'] === true }">
              <button class="slds-button slds-button_icon slds-button_icon-border-filled slds-button_icon-x-small"
                aria-haspopup="true" aria-expanded="true" title="Show More" @click.stop="showActionMenu(row, i)">
                <svg class="slds-button__icon" aria-hidden="true">
                  <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#down"></use>
                </svg>
                <span class="slds-assistive-text">Show More</span>
              </button>
              <div class="slds-dropdown slds-dropdown_right">
                <ul class="slds-dropdown__list" role="menu" aria-label="Show More">
                  <!-- <li class="slds-dropdown__item" role="presentation">
                    <a href="#" role="menuitem" tabindex="0">
                      <span class="slds-truncate" title="Menu Item One">View</span>
                    </a>
                  </li> -->
                  <li class="slds-dropdown__item" role="presentation">
                    <a href="#" role="menuitem" tabindex="-1" @click.prevent="triggerDelete(row, i)">
                      <span class="slds-truncate" title="Menu Item Two">Delete</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </td>
        </tr>

      </tbody>
    </table>
  </div>
  <UiItemLoader v-if="isLoading" />

</template>

<script lang="ts" setup>

const { columns, data, isLoading, enableScroll = false, limitHeight = false, showAction = true, selectType = 'multiple' } = defineProps(['columns', 'data', 'isLoading', 'enableScroll', 'limitHeight', 'showAction', 'selectType'])

const emit = defineEmits(['itemSelected', 'sort', 'delete', 'triggerAction']);

const selectAllRef = ref(false)
const selectPartial = ref(false);

const tbl = useTemplateRef('tbl-container')
const styleRef = ref({})
let containerHeight = 0;
const sortKey = ref("name")
const sortOrder = ref("desc")

const handleAllSelected = () => {
  let checked = 0;
  selectPartial.value = false;
  data.forEach((a: any) => a.checked ? checked++ : checked);

  if (checked === data.length) {
    selectAllRef.value = true
  }
  else if (checked === 0) {
    selectAllRef.value = false
  }
  else {
    selectPartial.value = true;
  }
}

watch(() => data, () => {
  if (data.length > 0) handleAllSelected()
})

const handleItemSelect = (event: any) => {
  emit('itemSelected', { id: event.target.value, selected: event.target.checked });
  handleAllSelected()
}


const toggleSelectAll = () => {
  if (selectAllRef.value) {
    data.forEach((element: any) => {
      element.checked = true;
      emit('itemSelected', { id: element.id, selected: true })
    });
    selectPartial.value = false;
  }
  else {
    data.forEach((element: any) => {
      element.checked = false;
      emit('itemSelected', { id: element.id, selected: false })
    });
    selectPartial.value = false;
  }
}

const handleSort = (col: any) => {
  if (col.sort) {
    sortKey.value = col.name;

    if (sortKey.value === col.name) {
      sortOrder.value = sortOrder.value === 'ASC' ? 'DESC' : 'ASC'
    }

    emit('sort', { sortKey: sortKey.value, sortOrder: sortOrder.value })
  }
}

const showActionMenu = (row: any, idx: any) => {

  const activeRow = data.filter((d: any) => d['show-menu'] === true);
  if (activeRow && activeRow.length > 0 && row?.id !== activeRow[0]?.id) {
    activeRow[0]['show-menu'] = false;
  }

  row['show-menu'] = !row['show-menu']
  if (containerHeight === 0) {
    containerHeight = tbl.value!.clientHeight;
  }
  if (idx >= (data.length - 2)) {
    if (row['show-menu'] === true) {
      const height = containerHeight + 45;
      styleRef.value = { 'height': height + 'px' }
    }
    else {
      styleRef.value = { 'height': 'auto' }
    }
  }

}

const closeActionMenu = ($event: any) => {
  styleRef.value = { 'height': 'auto' }
  const elm = data.find((d: any) => d['show-menu'] === true);
  if (elm) {
    elm['show-menu'] = false;
  }
}

const triggerDelete = (row: any, index: any) => {
  emit('delete', { record: row, index });
}

const triggerAction = (row: any, col: any) => {
  emit("triggerAction", { row, col });
}

onMounted(() => {
  window.addEventListener('click', closeActionMenu)
});

onBeforeUnmount(() => {
  window.removeEventListener('click', closeActionMenu)
})


</script>

<style scoped>
.tableFixHead {
  overflow-y: auto;
  min-height: 7rem;
}

.limit-height {
  max-height: 9.5rem !important;
}

.radio-custom {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.select-all-partial::after {
  height: 0rem !important;
  width: 0.5rem !important;
  transform: translate3d(-50%, -50%, 0) rotate(0deg) !important;
  display: block;
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  border-bottom: 2px solid var(--slds-c-checkbox-mark-color-foreground, var(--sds-c-checkbox-mark-color-foreground, #0176d3));
  border-left: 2px solid var(--slds-c-checkbox-mark-color-foreground, var(--sds-c-checkbox-mark-color-foreground, #0176d3));
}

.align-center {
  text-align: center;
  justify-content: center;
}

.slds-table th.slds-has-focus,
.slds-table th:focus {
  border-bottom: none;
  box-shadow: none;
}

.slds-table th.slds-has-focus a,
.slds-table th.slds-has-focus a:focus,
.slds-table th.slds-has-focus a:active:focus,
.slds-table th a:active:focus,
.slds-table th a:hover,
.slds-table th.slds-has-focus a:hover,
.slds-table th.slds-has-focus a:focus:hover {
  box-shadow: none;
  background-color: initial;
  outline: 0;
}
</style>