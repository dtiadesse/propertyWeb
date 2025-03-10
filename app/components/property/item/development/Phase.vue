<template>
  <div class="slds-grid slds-wrap" style="margin-bottom: 1rem;align-items: flex-end;">
    <div class="slds-col slds-size_5-of-12 slds-p-around_xx-small">
      <UiItemComboBox edit-mode="true" label="Select a Phase to display" :values='developmentPhases'
        :selected="developmentPhaseSelected" @selected="handleSelected" />
    </div>
    <div class="slds-col slds-size_4-of-12 slds-p-around_xx-small"></div>
    <div class="slds-col slds-size_3-of-12 slds-p-around_xx-small" style="text-align: right;">
      <div class="slds-button-group" role="group">
        <button class="slds-button slds-button_neutral" @click="createDevelopmentPhase">Create</button>
        <button class="slds-button slds-button_text-destructive" @click="deletePhase">Delete</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const propertyStore = useMyPropertyStore()
const config = useConfig()
const idx = ref(0)

const deletePhase = () => {
  propertyStore.deleteDevelopmentPhase();
}

const developmentPhases = computed(() => {
  return propertyStore.property.developmentPhases.map((dp: any) => {
    const value = dp?.phaseNumber && dp?.phaseNumber != dp?.id ? `${dp?.value}  (${dp?.phaseNumber})` : dp?.value;
    return { id: dp.id, value };
  });
})

const developmentPhaseSelected = computed(() => {
  const dp: any = propertyStore.property.developmentPhases[propertyStore.phaseSelected];
  const value = dp?.phaseNumber && dp?.phaseNumber != dp?.id ? `${dp?.value}  (${dp?.phaseNumber})` : dp?.value;
  return value
})


const createDevelopmentPhase = () => {
  let rand = 1;
  if (propertyStore.property.developmentPhases && propertyStore.property.developmentPhases.length > 0) {
    const lastPhase: any = propertyStore.property.developmentPhases[propertyStore.property.developmentPhases.length - 1]?.value;
    const lastIndex = lastPhase.match(/\d+/);

    if (lastIndex) {
      rand = +lastIndex[0] + 1
    }
  }

  propertyStore.property.developmentPhases.push({ id: rand, value: "Phase - " + rand, phaseNumber: rand + "" })
  propertyStore.updatedDevelopmentPhases = [...propertyStore.property.developmentPhases]
  idx.value = propertyStore.property.developmentPhases.length - 1;
  propertyStore.selectDevelopmentPhase(idx.value);
  config.config.value.editMode = true;
}

const handleSelected = (event: any) => {
  const index = developmentPhases.value?.findIndex(p => p.value === event);
  propertyStore.selectDevelopmentPhase(index);
  propertyStore.updatedDevelopmentPhases = [...propertyStore.property.developmentPhases]
  idx.value = index
}
</script>

<style scoped>
:root {
  --slds-c-button-text-color: blue;
}
</style>