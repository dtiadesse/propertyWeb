<template>
  <div v-if="properties.length > 0" class="slds-grid slds-wrap page">
    <div class="slds-col slds-size_3-of-12 header">
      RENT COMPARABLES
    </div>
    <div class="slds-col slds-size_9-of-12 pname" style="text-align: right;">
      {{ subjectProperty[0].name }}
    </div>

    <div class="slds-col slds-size_12-of-12 property-name pname">
      RENT COMPARABLES SUMMARY
    </div>
    <div class="slds-col slds-size_12-of-12 mapbox">
      - INSERT MAP HERE -
    </div>

    <div class="slds-col slds-size_12-of-12 slds-p-left_small">
      <table class="unitMix">
        <thead>
          <tr>
            <th :colspan="9" class="heading">RENT COMPARABLES</th>
          </tr>
          <tr class="heading-row">
            <th class="first-col col-heading" style="padding-left: 1.5rem;">PROPERTY</th>
            <th class="col-heading"># UNITS</th>
            <th class="col-heading">YEAR BUILT</th>
            <th class="col-heading">OCCUPANCY</th>
            <th class="col-heading">AVG. SF</th>
            <th class="col-heading">MKT. RENT</th>
            <th class="col-heading">MKT. RENT/SF</th>
            <th class="col-heading">EFF. RENT</th>
            <th class="last-col col-heading">EFF. RENT/SF</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(p, i) in properties"
            :class="{ 'subject-property': p.isSubjectProperty, 'no-border': i === properties.length - 1 }">
            <td class="first-col col-content">
              <div class="property-type" style="padding-left: 1.35rem;position: relative;">
                <span style="position: absolute;left: 0;" v-if="!p.isSubjectProperty" class="order">{{ comparableOrder
                }}</span>
                <svg style="position: absolute;left: 0;" v-else class="slds-icon slds-icon_large star-icon"
                  aria-hidden="true">
                  <use xlink:href="/assets/icons/custom-sprite/svg/symbols.svg#custom11"></use>
                </svg>
                {{ p.name }}
              </div>
            </td>
            <td class="col-content">{{ p.numberOfUnits }}</td>
            <td class="col-content">{{ p.yearBuilt }}</td>
            <td class="col-content">{{ p.occupancy }}%</td>
            <td class="col-content">{{ p.avgSF }}</td>
            <td class="col-content">{{ p.mktRent }}</td>
            <td class="col-content">{{ p.mktRentSF }}</td>
            <td class="col-content">{{ p.effRent }}</td>
            <td class="col-content">{{ p.effRentSF }}</td>
          </tr>
          <tr class="footer-row">
            <td class="first-col col-content" style="padding-left: 1.5rem;">TOTAL / AVG</td>
            <td class="col-content">{{
              config.unitsAggregate === "Total" ?
                new Intl.NumberFormat('en-US',
                  {
                    style: 'decimal',
                    maximumFractionDigits: 0,
                    minimumFractionDigits: 0,
                  }
                ).format(sumBy(properties, 'numberOfUnits') || 0)
                :
                new Intl.NumberFormat('en-US',
                  {
                    style: 'decimal',
                    maximumFractionDigits: 0,
                    minimumFractionDigits: 0,
                  }
                ).format(meanBy(properties, 'numberOfUnits') || 0)

            }}</td>
            <td class="col-content">{{ meanBy(properties, 'yearBuilt').toFixed(0) }}</td>
            <td class="col-content">{{ meanBy(properties, 'occupancy').toFixed(0) }}%</td>
            <td class="col-content">{{new Intl.NumberFormat('en-US',
              {
                style: 'decimal',
                maximumFractionDigits: 0,
                minimumFractionDigits: 0,
              }
            ).format(meanBy(properties, (p: any) => +(p.avgSF ? p.avgSF.replace(/[^0-9.-]+/g, '') : 0)))}}</td>
            <td class="last-col col-content">{{new Intl.NumberFormat('en-US',
              {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
                minimumFractionDigits: 0,
              }
            ).format(meanBy(properties, (p: any) => +(p.mktRent ? p.mktRent.replace(/[^0-9.-]+/g, '') : 0)))}}</td>
            <td class="last-col col-content">{{new Intl.NumberFormat('en-US',
              {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              }
            ).format(meanBy(properties, (p: any) => +(p.mktRentSF ? p.mktRentSF.replace(/[^0-9.-]+/g, '') : 0)))}}
            </td>
            <td class="last-col col-content">{{new Intl.NumberFormat('en-US',
              {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
                minimumFractionDigits: 0,
              }
            ).format(meanBy(properties, (p: any) => +(p.effRent ? p.effRent.replace(/[^0-9.-]+/g, '') : 0)))}}</td>
            <td class="last-col col-content">{{new Intl.NumberFormat('en-US',
              {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              }
            ).format(meanBy(properties, (p: any) => +(p.effRentSF ? p.effRentSF.replace(/[^0-9.-]+/g, '') : 0)))}}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="footnote" v-if="config.footNote">{{ config.footNote }}</div>

      <div class="page-break"></div>

      <div v-if="loadCharts" class="section summary" style="margin-top: 25%;">
        <label>SUBJECT PROPERTY VS. COMPETITOR ANALYSIS</label>
        <div class="slds-grid slds-wrap">
          <div class="slds-col slds-size_6-of-12">
            <Bar :data="charts[0]" :options="optionsSF" style="width: 90%; height: 330px;" />
          </div>
          <div class="slds-col slds-size_6-of-12">
            <Bar :data="charts[1]" :options="optionsRent" style="width: 90%; height: 330px;" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Bar, Chart } from 'vue-chartjs'

import { meanBy, sumBy } from 'lodash-es';

const { propertyId } = defineProps(['config', 'propertyId'])

const loadCharts = ref(false);

const optionsSF: any = {
  responsive: false,
  maintainAspectRatio: false,
  animation: {
    duration: 0
  },
  scales: {
    x: {
      ticks: {
        maxRotation: 45, // Angle of the labels
        minRotation: 45,
        font: {
          size: 12,
          family: "Gotham",
          weight: 'normal'
        },
      },
      grid: {
        display: false, // Grid lines enabled for the x-axis
      },
      border: {
        display: false
      },

    },
    y: {
      ticks: {
        display: true,
        font: {
          size: 11,
          family: "Gotham",
          weight: 'normal'
        },
      },
      grid: {
        display: true,
      },
      border: {
        display: false
      },
      title: {
        display: false // Removes Y-axis title
      },
      beginAtZero: true
    }
  },
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: 'AVERAGE UNIT SIZE (SF)',
      font: {
        size: 12,
        family: "Gotham",
        weight: 'normal'
      },
      padding: {
        bottom: 20
      }
    }
  }
};

const optionsRent: any = {
  responsive: false,
  maintainAspectRatio: false,
  animation: {
    duration: 0
  },
  scales: {
    x: {
      ticks: {
        maxRotation: 45, // Angle of the labels
        minRotation: 45,
        font: {
          size: 12,
          family: "Gotham",
          weight: 'normal'
        },
      },
      grid: {
        display: false // Grid lines enabled for the x-axis
      },
      border: {
        display: false
      },
    },
    y: {
      ticks: {
        display: true,
        callback: function (value: any, index: any, ticks: any) {
          return new Intl.NumberFormat('en-US',
            {
              style: 'currency',
              currency: 'USD',
              maximumFractionDigits: 0,
              minimumFractionDigits: 0,
            }
          ).format(value);
        },
        font: {
          size: 11,
          family: "Gotham",
          weight: 'normal'
        },
      },
      grid: {
        display: true // Disables grid lines on the Y-axis
      },
      border: {
        display: false
      },
      title: {
        display: false // Removes Y-axis title
      },
      beginAtZero: true
    }
  },
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: 'AVERAGE EFFECTIVE RENT',
      font: {
        family: 'Gotham',
        size: 12,
        weight: 'normal'
      },
      padding: {
        bottom: 20
      }
    }
  }
};

const propertyStore = useMyPropertyStore()

const properties: any = ref([])
const subjectProperty: any = ref({})
const charts: any = ref([])
const numbers = ref(0);

const comparableOrder = computed(() => ++numbers.value);


onMounted(async () => {
  const font = new FontFace('Gotham', 'url(/assets/fonts/GothamSSm-Light_Web.woff2)');
  // document.fonts.add(font);
  await document.fonts.load("12px 'Gotham'");
  loadCharts.value = true;

  if (propertyId) {
    const { comparableProperties, chartsArr } = await propertyStore.getComparablePropertiesSummary(propertyId);
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