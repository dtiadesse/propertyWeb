<template>
  <div v-if="properties.length > 0" class="slds-grid slds-wrap page">
    <div class="slds-col slds-size_3-of-12 header">
      SALE COMPARABLES
    </div>
    <div class="slds-col slds-size_9-of-12 pname" style="text-align: right;">
      {{ subjectProperty[0].name }}
    </div>

    <div class="slds-col slds-size_12-of-12 property-name pname">
      SALE COMPARABLES SUMMARY
    </div>
    <div class="slds-col slds-size_12-of-12 mapbox">
      - INSERT MAP HERE -
    </div>
    <div class="slds-col slds-size_12-of-12 slds-p-left_small">
      <table class="unitMix">
        <thead>
          <tr>
            <th :colspan="config.showLocation ? 9 : 8" class="heading">SALE COMPARABLES</th>
          </tr>
          <tr class="heading-row">
            <th class="first-col col-heading" style="padding-left: 1.5rem;">PROPERTY</th>
            <th v-if="config.showLocation" class="col-heading">LOCATION</th>
            <th class="col-heading"># UNITS</th>
            <th class="col-heading">YEAR BUILT</th>
            <th class="col-heading">SALE PRICE</th>
            <th class="col-heading">PRICE PER UNIT</th>
            <th class="col-heading">PRICE PER SF</th>
            <th class="col-heading">CAP RATE</th>
            <th class="col-heading">SALE DATE</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(p, i) in properties"
            :class="{ 'subject-property': p.isSubjectProperty, 'no-border': i === properties.length - 1, 'inhouse': p.transactions[0]?.inHouse === 'Yes' }">
            <td class="first-col col-content">
              <div class="property-type" style="position: relative;padding-left: 1.35rem;">
                <span style="position: absolute; left: 0;" v-if="!p.isSubjectProperty" class="order">{{ comparableOrder
                }}</span>
                <svg style="position: absolute; left: 0;" v-else class="slds-icon slds-icon_large star-icon"
                  aria-hidden="true">
                  <use xlink:href="/assets/icons/custom-sprite/svg/symbols.svg#custom11"></use>
                </svg>
                {{ p.name }}
              </div>
            </td>
            <td v-if="config.showLocation" class="col-content">{{ p.stdCity }}, {{ p.stdStateCode }}</td>
            <td class="col-content">{{ p.numberOfUnits }}</td>
            <td class="col-content">{{ p.yearBuilt }}</td>
            <td class="col-content">{{ new Intl.NumberFormat('en-US',
              {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
                minimumFractionDigits: 0,
              }
            ).format(p.transactions[0]?.salePrice || 0) }}</td>
            <td class="col-content">{{ new Intl.NumberFormat('en-US',
              {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
                minimumFractionDigits: 0,
              }
            ).format((p.transactions[0]?.salePrice / p.numberOfUnits) || 0) }}</td>
            <td class="col-content">{{ new Intl.NumberFormat('en-US',
              {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
                minimumFractionDigits: 0,
              }
            ).format((p.transactions[0]?.salePrice / p.transactions[0]?.buildingSizeSqFt) || 0) }}</td>
            <td class="col-content">{{ p.transactions[0]?.capRate || 0 }}%</td>
            <td class="col-content">{{ p.transactions[0]?.closingDate ? extractMonthYear(p.transactions[0]?.closingDate)
              :
              '' }}
            </td>


          </tr>
          <tr class="footer-row">
            <td class="first-col col-content" style="padding-left: 1.5rem;">TOTAL / AVG</td>
            <td v-if="config.showLocation" class="first-col col-content"></td>
            <td class="col-content">{{
              config.unitsAggregate === "Total" ?
                new Intl.NumberFormat('en-US',
                  {
                    style: 'decimal',
                    maximumFractionDigits: 0,
                    minimumFractionDigits: 0,
                  }
                ).format(sumBy(properties, 'numberOfUnits')) :

                new Intl.NumberFormat('en-US',
                  {
                    style: 'decimal',
                    maximumFractionDigits: 0,
                    minimumFractionDigits: 0,
                  }
                ).format(meanBy(properties, 'numberOfUnits'))

            }}</td>
            <td class="col-content">{{ meanBy(properties, 'yearBuilt').toFixed(0) }}</td>
            <td class="col-content">{{new Intl.NumberFormat('en-US',
              {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
                minimumFractionDigits: 0,
              }
            ).format(meanBy(properties, (p: any) => p.transactions[0]?.salePrice || 0))}}</td>
            <td class="col-content">{{new Intl.NumberFormat('en-US',
              {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
                minimumFractionDigits: 0,
              }
            ).format(meanBy(properties, (p: any) => (p.transactions[0]?.salePrice / p.numberOfUnits) || 0))}}</td>
            <td class="last-col col-content">{{new Intl.NumberFormat('en-US',
              {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
                minimumFractionDigits: 0,
              }
            ).format(meanBy(properties, (p: any) => (p.transactions[0]?.salePrice /
              p.transactions[0]?.buildingSizeSqFt) || 0))}}</td>
            <td class="col-content">{{new Intl.NumberFormat('en-US',
              {
                style: 'decimal',
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              }
            ).format(meanBy(properties, (p: any) => +p.transactions[0]?.capRate) || 0)}}%</td>

            <td class="col-content"></td>


          </tr>
        </tbody>
      </table>
      <div class="sales footnote" v-if="config.footNote">{{ config.footNote }}</div>

      <div class="page-break"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Bar } from 'vue-chartjs'

import { meanBy, sumBy } from 'lodash-es';

const { propertyId } = defineProps(['config', 'propertyId'])

const propertyStore = useMyPropertyStore()

const properties: any = ref([])
const subjectProperty: any = ref({})
const charts: any = ref([])
const numbers = ref(0);

const comparableOrder = computed(() => ++numbers.value);


onMounted(async () => {
  if (propertyId) {
    const { comparableProperties, chartsArr } = await propertyStore.getComparablePropertiesSummary(propertyId, 'sale');
    subjectProperty.value = comparableProperties.splice(0, 1);
    properties.value = comparableProperties;
    charts.value = chartsArr;
  }
})
</script>

<style scoped>
@import '@/assets/css/report.css';

.mapbox {
  height: 30rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  color: var(--light-grey) !important;
}

.property-type {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.property-type .star-icon {
  width: 1.2rem;
  height: 1.2rem;
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