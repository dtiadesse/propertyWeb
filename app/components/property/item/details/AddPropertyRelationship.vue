<template>
  <div class="add-prop-container">
    <div class="slds-grid slds-p-around_medium slds-wrap">
      <template v-if="propertyStore.property.propertyRelationship.length + result.length < 5">
        <div class="slds-col slds-size_12-of-12">
          <h3 class="slds-text-heading_small">Search for Companies to add to your list</h3>
        </div>
        <div class="slds-col slds-size_6-of-12">
          <UiItemAutoComplete v-model="myModel" @item-selected="handleCompanySelected" :model="'company'"
            ref="company-control" :reset="reset" />
        </div>
        <div class="slds-col slds-size_3-of_12 px-4">
          <button class="slds-button slds-button_neutral" @click="addToList">Add to the list
            <svg class="slds-button__icon slds-button__icon_add" aria-hidden="true">
              <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#add"></use>
            </svg>
          </button>
        </div>
      </template>
      <div class="slds-col slds-size_12-of-12" style="padding: 1.5rem 0 0.5rem 0;position: relative;">

        <UiItemTooltip />

        In the table below you can see what property relationships will be displayed in your property record. You can
        add max <b>5 roles</b>.
        <span class="required-legend"><span class="required">*</span>required</span>
      </div>
      <div class="slds-col slds-size_12-of-12">
        <table class="slds-table slds-table_bordered">
          <thead>
            <tr>
              <th style="width: 24%;"><span class="required">*</span>Company</th>
              <th style="width: 24%;">Contact Person</th>
              <th style="width: 24%;"><span class="required">*</span>Role</th>
              <th style="width: 24%;">Source</th>
              <th style="width: 4%;"></th>
            </tr>
          </thead>
          <tbody v-if="result.length > 0">
            <tr v-for="(item, index) in result">
              <td>{{ item.Company.Name }}</td>
              <td>
                <UiItemAutoComplete :options="item" model="contact"
                  @item-selected="handleContactSelected($event, index)" />
              </td>
              <td>
                <UiItemComboBox :edit-mode="true" :has-error="item.error" :values="roles"
                  @selected="handleRoleSelected($event, index)" :placeholder="'Pick a role'" />
              </td>
              <td>{{ item.Source }}</td>
              <td class="slds-text-align_right" scope="cole">
                <button class="slds-button slds-button_neutral" @click="removeFromList(item, index)">Delete
                  <svg class="slds-button__icon slds-button__icon_delete" aria-hidden="true">
                    <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#delete"></use>
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="5" style="text-align: center;">
                Nothing was added. Start adding Companies to display the
                results here.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

</template>

<script lang="ts" setup>
const result: any = ref([])
const propertyStore = useMyPropertyStore()
const emit = defineEmits(['added'])
const companies: any = ref([])
const contacts: any = ref([])
const isSearching: any = ref(false)
const myModel = ref('')
const reset: any = ref(null)

const props = defineProps(['hasErrors']);

const roles: any = [
  { label: 'Owner', value: 'Owner' },
  { label: 'Co-Owner', value: 'Co-Owner' },
  { label: 'Developer', value: 'Developer' },
  { label: 'Manager', value: 'Manager' },
  { label: 'Lender', value: 'Lender' }
];

const computedRoles = computed(() => {
  const selectedRoles = result.value.map((r: any) => r.Role ? r.Role.Id : "");
  let existingRoles = propertyStore.property.propertyRelationship.map((r: any) => r.role ? r.role : "");
  existingRoles = [...selectedRoles, ...existingRoles];

  return existingRoles;
})


let itemAdded: any = null;

watch(() => props.hasErrors, (rp: any) => {
  validateFields();
});

const validateFields = () => {
  const mapped = result.value.map((r: any) => {
    if (r.Role) {
      delete r.error;
      return ({ ...r });
    }
    else {
      return ({ ...r, ...{ error: 'Pick a role to continue' } })
    }
  });
  result.value = [...mapped];
}


const addToList = () => {
  result.value.push({ Company: itemAdded });
  myModel.value = "";
  reset.value = new Date();
  emit('added', result.value)
}

const removeFromList = (item: any, index: any) => {
  result.value.splice(index, 1);
}

const handleCompanySelected = (item: any) => {
  itemAdded = item;
}

const handleContactSelected = (item: any, index: number) => {
  result.value[index]['Contact'] = item;
  emit('added', result.value)
}

const handleRoleSelected = (item: any, index: number) => {
  if (computedRoles.value.indexOf(item) < 0) {
    result.value[index]['Role'] = { Id: item, Name: item };
    result.value[index]['Source'] = 'Property+';
    validateFields();
    emit('added', result.value)
  }
  else {
    // result.value[index]['Role'] = { Id: item, Name: item };
    result.value[index]['error'] = 'Role already exists';
    result.value[index]['Role'] = null;
    emit('added', result.value)
  }
}

</script>

<style scoped>
.add-prop-container {
  height: 20rem;
}

.slds-text-heading_small {
  padding-bottom: 8px;
  font-weight: 700;
  font-size: 12px;
}

.slds-button__icon {
  margin-left: 0.5rem;
}

.required {
  color: #BA0517;
}

.required-legend {
  position: absolute;
  right: 0;
}
</style>