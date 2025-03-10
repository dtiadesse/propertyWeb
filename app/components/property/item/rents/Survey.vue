<template>
  <div class="slds-grid slds-wrap" style="margin-bottom: 1rem;align-items: flex-end;">
    <div class="slds-col slds-size_5-of-12 slds-p-around_xx-small">
      <UiItemComboBox edit-mode="true" label="Select a survey to display" :values='surveyValues'
        :selected="surveySelected" @selected="handleSelected" />
    </div>
    <div class="slds-col slds-size_3-of-12 slds-p-around_xx-small"></div>
    <div class="slds-col slds-size_4-of-12 slds-p-around_xx-small" style="text-align: right;">
      <div class="slds-button-group" role="group">
        <button class="slds-button slds-button_neutral" @click="createSurvey">Create a Survey</button>
        <button class="slds-button slds-button_text-destructive"
          @click="propertyStore.deleteRentSurvey()">Delete</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

const propertyStore = useMyPropertyStore()

const auth = useAuthStore()

const surveyValues = computed(() => {
  return propertyStore.property.rentSurveys.map((rs: any) => {
    if (rs.creator && rs.date) {
      const surveyVal = new Date(rs.date).toLocaleDateString('en-US') + " | " + rs.creator;
      return ({ label: surveyVal, value: surveyVal })
    }
    else {
      return ({ label: rs.value, value: rs.value })
    }
  })
})

const surveySelected = computed(() => {
  const selectedSurvey = propertyStore.property.rentSurveys[propertyStore.surveySelected];
  if (selectedSurvey) {
    const surveyVal = selectedSurvey?.date && selectedSurvey?.creator ? new Date(selectedSurvey.date).toLocaleDateString('en-US') + " | " + selectedSurvey?.creator : selectedSurvey?.value
    return surveyVal
  }
})


const createSurvey = () => {
  // const rand = propertyStore.property.rentSurveys.length + 1;

  let rand = 1;
  if (propertyStore.property.rentSurveys && propertyStore.property.rentSurveys.length > 0) {
    const lastPhase: any = propertyStore.property.rentSurveys[propertyStore.property.rentSurveys.length - 1]?.value;
    const lastIndex = lastPhase.match(/\d+/);

    if (lastIndex) {
      rand = +lastIndex[0] + 1
    }
  }

  const creator = auth.getUserName()?.split("/")[0]

  propertyStore.property.rentSurveys.push({ id: rand, value: "Survey - " + rand, utilities: [] as Utility[], creator })
  propertyStore.updatedRentSurveys = [...propertyStore.property.rentSurveys]
  propertyStore.selectRentSurvey(propertyStore.property.rentSurveys.length - 1);
}

const handleSelected = (event: any) => {
  const index = propertyStore.property.rentSurveys.findIndex(p => {
    const surveyVal = p?.date && p?.creator ? new Date(p.date).toLocaleDateString('en-US') + " | " + p?.creator : p?.value;
    return surveyVal === event;
  });
  propertyStore.selectRentSurvey(index);
  propertyStore.updatedRentSurveys = [...propertyStore.property.rentSurveys]
}
</script>

<style scoped></style>