<template>
  <div v-for="(p, i) in properties" class="slds-grid slds-wrap page">
    <div class="slds-col slds-size_3-of-12 header">
      RENT COMPARABLES
    </div>
    <div class="slds-col slds-size_9-of-12 pname" style="text-align: right;">
      {{ subjectProperty[0]?.name }}
    </div>
    <div class="slds-col slds-size_12-of-12 property-name pname">
      {{ p.label }}
    </div>


    <div class="slds-col slds-size_6-of-12">
      <table class="unitMix">
        <thead>
          <tr>
            <th :colspan="9" class="heading">RANKED BY RENT PER UNIT</th>
          </tr>
          <tr class="heading-row">
            <th class="first-col col-heading">PROPERTY</th>
            <th class="col-heading">UNIT TYPE</th>
            <th class="col-heading">SIZE (SF)</th>
            <th class="col-heading">EFF. RENT</th>
            <th class="col-heading">RENT /SF</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(u, i) in p.um"
            :class="{ 'subject-property-bg': u.id === subjectProperty[0].id, 'no-border': i === p.um.length - 1, 'vad-record': u.vadRecord }">
            <td class="first-col col-content">
              <div class="property-type">
                {{ u.name }}
              </div>
            </td>
            <td class="col-content">{{ u.Beds.value }}BR-{{ u.Bathrooms.value }}BA</td>
            <td class="col-content">{{ new Intl.NumberFormat('en-US',
              {
                style: 'decimal',
                maximumFractionDigits: 0,
                minimumFractionDigits: 0,
              }
            ).format(u.SF.value) }}</td>
            <td class="col-content bold">{{ new Intl.NumberFormat('en-US',
              {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
                minimumFractionDigits: 0,
              }
            ).format(u.EffectiveRent.value) }}</td>
            <td class="col-content">{{
              new Intl.NumberFormat('en-US',
                {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                }
              ).format(u.EffectiveRent.value / u.SF.value)
            }}</td>

          </tr>
          <tr class="footer-row">
            <td class="first-col col-content">TOTAL / AVG</td>
            <td class="col-content"></td>
            <td class="col-content">{{
              new Intl.NumberFormat('en-US',
                {
                  style: 'decimal',
                  currency: 'USD',
                  maximumFractionDigits: 0,
                  minimumFractionDigits: 0,
                }
              ).format(meanBy(p.um, (u: any) => u["SF"]["value"]))
            }}</td>
            <td class="col-content bold">{{
              new Intl.NumberFormat('en-US',
                {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 0,
                  minimumFractionDigits: 0,
                }
              ).format(meanBy(p.um, (u: any) => u["EffectiveRent"]["value"]))
            }}</td>
            <td class="col-content">{{
              new Intl.NumberFormat('en-US',
                {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                }
              ).format(meanBy(p.um, (u: any) => (u.EffectiveRent.value / u.SF.value)))
            }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="slds-col slds-size_6-of-12 slds-p-left_small">
      <table class="unitMix">
        <thead>
          <tr>
            <th :colspan="9" class="heading">RANKED BY RENT PER SQUARE FOOT</th>
          </tr>
          <tr class="heading-row">
            <th class="first-col col-heading">PROPERTY</th>
            <th class="col-heading">UNIT TYPE</th>
            <th class="col-heading">SIZE (SF)</th>
            <th class="col-heading">EFF. RENT</th>
            <th class="col-heading">RENT /SF</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(u, i) in p.umsf"
            :class="{ 'subject-property-bg': u.id === subjectProperty[0].id, 'no-border': i === p.um.length - 1, 'vad-record': u.vadRecord }">
            <td class="first-col col-content">
              <div class="property-type">
                {{ u.name }}
              </div>
            </td>
            <td class="col-content">{{ u.Beds.value }}BR-{{ u.Bathrooms.value }}BA</td>
            <td class="col-content">{{ new Intl.NumberFormat('en-US',
              {
                style: 'decimal',
                maximumFractionDigits: 0,
                minimumFractionDigits: 0,
              }
            ).format(u.SF.value) }}</td>
            <td class="col-content">{{ new Intl.NumberFormat('en-US',
              {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
                minimumFractionDigits: 0,
              }
            ).format(u.EffectiveRent.value) }}</td>
            <td class="col-content bold">{{ new Intl.NumberFormat('en-US',
              {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              }
            ).format(u.EffectiveRent.value / u.SF.value) }}</td>

          </tr>
          <tr class="footer-row">
            <td class="first-col col-content">TOTAL / AVG</td>
            <td class="col-content"></td>
            <td class="col-content">{{
              new Intl.NumberFormat('en-US',
                {
                  style: 'decimal',
                  currency: 'USD',
                  maximumFractionDigits: 0,
                  minimumFractionDigits: 0,
                }
              ).format(meanBy(p.um, (u: any) => u["SF"]["value"]))
            }}</td>
            <td class="col-content">{{
              new Intl.NumberFormat('en-US',
                {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 0,
                  minimumFractionDigits: 0,
                }
              ).format(meanBy(p.um, (u: any) => u["EffectiveRent"]["value"]))
            }}</td>
            <td class="col-content bold">{{
              new Intl.NumberFormat('en-US',
                {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                }
              ).format(meanBy(p.um, (u: any) => (u.EffectiveRent.value / u.SF.value)))
            }}</td>

          </tr>
        </tbody>
      </table>
    </div>
    <div class="page-break"></div>
  </div>
</template>

<script lang="ts" setup>
import { flatMap, flatten, groupBy, map, orderBy, sortBy, values, meanBy } from 'lodash-es';

const { propertyId } = defineProps(['config', 'propertyId'])

const propertyStore = useMyPropertyStore()

const properties: any = ref([])
const subjectProperty: any = ref({})
const charts: any = ref([])
const numbers = ref(0);

const comparableOrder = computed(() => ++numbers.value);


onMounted(async () => {
  if (propertyId) {
    const { comparableProperties } = await propertyStore.getComparablePropertiesSummary(propertyId);
    subjectProperty.value = comparableProperties.splice(0, 1);
    // properties.value = comparableProperties;

    let rentSurveys = flatMap(comparableProperties, ({ name, id, rs }) =>
      map(rs.unitMix, um => ({ name, id, ...um }))
    );

    rentSurveys = flatMap(rentSurveys, (rs: any) => {
      rs.RentPerUnit = rs.EffectiveRent.value / rs.Units.value;
      rs.RentPerSF = rs.EffectiveRent.value / rs.SF.value;

      if (rs.VADRent.value) {
        return [rs, { ...rs, vadRecord: true, EffectiveRent: { value: rs.VADRent.value }, RentPerUnit: rs.VADRent.value / rs.Units.value, RentPerSF: rs.VADRent.value / rs.Units.value }]
      }

      return rs
    })


    // rentSurveys = orderBy(rentSurveys, 'RentPerUnit', 'desc')
    rentSurveys = orderBy(rentSurveys, (a: any) => a.EffectiveRent.value, 'desc')

    const grouped = groupBy(rentSurveys, (rs: any) => rs.Beds.value);

    const groupMapped = map(grouped, (um, i) => {

      // const umsf = orderBy(um, 'RentPerSF', 'desc')
      const umsf = orderBy(um, (a: any) => a.EffectiveRent.value / a.SF.value, 'desc')

      let label: any = ""

      if (i === '0') {
        label = "STUDIO";
      }
      else if (i === '1') {
        label = "ONE BEDROOM";
      } else if (i === '2') {
        label = "TWO BEDROOM";
      } else if (i === '3') {
        label = "THREE BEDROOM";
      } else if (i === '4') {
        label = "FOUR BEDROOM";
      } else if (i === '5') {
        label = "FIVE BEDROOM";
      }
      else {
        label = "MULTI BEDROOM";
      }
      return { label, um, umsf }
    })

    properties.value = groupMapped;

  }
})
</script>

<style scoped>
@import '@/assets/css/report.css';

.property-type {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.property-name {
  margin-bottom: 0.3rem;
}

.property-type .star-icon {
  width: 1.3rem;
  height: 1.3rem;
}

.property-type .order {
  background-color: transparent !important;
  color: var(--grey) !important;
}

.subject-property {
  color: var(--dark-blue) !important;
}

.unitMix,
.unitMix td {
  color: var(--grey) !important;
}

.subject-property td,
.subject-property .property-type {
  color: var(--dark-blue) !important;
}
</style>