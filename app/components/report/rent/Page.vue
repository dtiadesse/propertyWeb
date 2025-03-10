<template>
  <div v-if="properties.length > 0" v-for="(p, i) in properties" class="slds-grid slds-wrap page">
    <template v-if="!config.condensed || (config.condensed && (i % 2 === 0))">
      <div class="slds-col slds-size_3-of-12 header">
        RENT COMPARABLES
      </div>
      <div class="slds-col slds-size_9-of-12 pname" style="text-align: right;">
        {{ subjectProperty[0].name }}
      </div>
    </template>
    <div class="slds-col slds-size_12-of-12 property-name pname" :class="{ 'main-property': i === 0 }">
      <span v-if="!p.isSubjectProperty" class="order">{{ comparableOrder }}</span>
      <svg v-else class="slds-icon slds-icon_large star-icon" aria-hidden="true">
        <use xlink:href="/assets/icons/custom-sprite/svg/symbols.svg#custom11"></use>
      </svg>
      {{ p.name }}
    </div>
    <div class="slds-col slds-size_6-of-12 left-col">
      <div class="slds-grid slds-wrap property-info">
        <div class="slds-col slds-size_6-of-12 ">
          <div class="slds-media slds-media_responsive">
            <div class="slds-media__figure">
              <span class="slds-avatar slds-avatar_large property-image-container">
                <img v-if="p.defaultImage && config.showPhotos" alt="" :src="p.defaultImage" title=""
                  class="property-image" />
              </span>
            </div>
          </div>
        </div>
        <div class="slds-col slds-size_6-of-12">
          <div class="address">
            {{ p.stdAddress1 }}<br />{{ p.stdCity }}, {{ p.stdStateCode }} {{ p.stdPostalCode }}<br /> {{ p.stdCounty
            }}
          </div>
          <table class="stat-table">
            <tbody>
              <tr>
                <td>Total Units:</td>
                <td class="right-align">{{ p.numberOfUnits }}</td>
              </tr>
              <tr>
                <td>Year Built:</td>
                <td class="right-align">{{ p.yearBuilt }}</td>
              </tr>
              <tr v-if="p.buildingSizeSqFt">
                <td>Rentable Area (SF):</td>
                <td class="right-align">{{ p.buildingSizeSqFt }}</td>
              </tr>
              <tr v-if="p.rentSurveys[0]?.occupancy">
                <td>Occupancy:</td>
                <td class="right-align">{{ p.rentSurveys[0]?.occupancy }}%</td>
              </tr>
            </tbody>
          </table>
          <div v-if="p.manager" class="managed-by">Managed by {{ p.manager }}</div>
        </div>

      </div>
      <div v-if="!config.condensed" class="slds-grid slds-wrap specifics">
        <div v-if="p.features && p.features.length > 0" class="slds-col slds-size_6-of-12 unit-features">
          <span class="spec-title unit">UNIT FEATURES</span>
          <ul>
            <li v-for="f in p.features"><span class="unit-feature" :class="{ 'asterisk': f.selectUnits }">{{ f.name
            }}</span><span style="padding-left: 4px;" v-if="f.description">({{ f.description }})</span></li>
          </ul>
          <span class="asterisk-legend">* Select Units </span>
        </div>
        <div v-if="p.amenities && p.amenities.length > 0" class="slds-col slds-size_6-of-12"
          style="padding-left: 0.75rem;">
          <span class="spec-title">COMMUNITY
            AMENITIES</span>
          <ul>
            <li v-for="a in p.amenities">{{ a.name }} <span style="padding-left: 4px;" v-if="a.description">({{
              a.description }})</span></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="slds-col slds-size_6-of-12 slds-p-left_small">
      <table class="unitMix">
        <thead>
          <tr>
            <th :colspan="config.marketRentOnly ? 5 : 6" class="heading">UNIT MIX</th>
          </tr>
          <tr class="heading-row">
            <th class="first-col col-heading">UNIT TYPE</th>
            <th class="col-heading"># UNITS</th>
            <th class="col-heading">SIZE (SF)</th>
            <th class="col-heading">MKT. RENT</th>
            <th v-if="!config.marketRentOnly" class="col-heading">EFF. RENT</th>
            <th v-if="!config.marketRentOnly" class="last-col col-heading">EFF. RENT/SF</th>
            <th v-if="config.marketRentOnly" class="last-col col-heading">MKT. RENT/SF</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(um, i) in p.rentSurveys[0]?.unitMix"
            :class="{ 'no-border': i === p.rentSurveys[0]?.unitMix.length - 1 }">
            <td class="first-col col-content unit">{{ um["Beds"]["value"] }}BR-{{ um["Bathrooms"]["value"] }}BA<template
                v-if="um['Description']['value']">, {{ um["Description"]["value"] }}</template>
            </td>
            <td class="col-content">{{ um["Units"]["value"] }}</td>
            <td class="col-content">{{ new Intl.NumberFormat('en-US',
              {
                style: 'decimal',
                currency: 'USD',
                maximumFractionDigits: 0,
                minimumFractionDigits: 0,
              }
            ).format(um["SF"]["value"]) }}</td>
            <td class="col-content">{{ new Intl.NumberFormat('en-US',
              {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
                minimumFractionDigits: 0,
              }
            ).format(um["Rent"]["value"]) }}</td>
            <td v-if="!config.marketRentOnly" class="col-content">{{ new Intl.NumberFormat('en-US',
              {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
                minimumFractionDigits: 0,
              }
            ).format(um["EffectiveRent"]["value"]) }}</td>
            <td v-if="!config.marketRentOnly" class="last-col col-content">{{ new Intl.NumberFormat('en-US',
              {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              }
            ).format((um["EffectiveRent"]["value"] / um["SF"]["value"])) }}</td>
            <td v-if="config.marketRentOnly" class="last-col col-content">{{ new Intl.NumberFormat('en-US',
              {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              }
            ).format((um["Rent"]["value"] / um["SF"]["value"])) }}</td>
          </tr>
          <tr class="footer-row">
            <td class="first-col col-content">TOTAL / AVG</td>
            <td class="col-content">{{ totalUnits(p) }}</td>
            <td class="col-content">{{ avgSF(p) }}</td>
            <td class="col-content">{{ avgRent(p) }}</td>
            <td v-if="!config.marketRentOnly" class="col-content">{{ avgEffRent(p) }}</td>
            <td v-if="!config.marketRentOnly" class="last-col col-content">{{ avgEffRentPerSF(p) }}</td>
            <td v-if="config.marketRentOnly" class="last-col col-content">{{ avgRentPerSF(p) }}</td>
          </tr>
        </tbody>
      </table>

      <div class="unitmix-footnote" v-if="p.rentSurveys[0]?.unitMixFootnote">
        <span>{{ p.rentSurveys[0]?.unitMixFootnote }}</span>
      </div>

      <div class="section light" v-if="p.rentSurveys[0]?.rentReportComments && !config.condensed">
        <label>COMMENTS</label>
        <span>{{ p.rentSurveys[0]?.rentReportComments }}</span>
      </div>

      <div class="section" v-if="!config.condensed">
        <div class="slds-grid slds-wrap">
          <div v-if="p?.chartData" class="slds-col slds-size_7-of-12">
            <label>UNIT MIX BREAKDOWN</label>
            <Pie :data="p.chartData" :options="options" style="width: 155px; height: 155px;"
              :plugins="[customLabelPlugin]" />
          </div>
          <div class="slds-col slds-size_5-of-12">
            <table class="unitMix monthly-fee" v-if="p.rentSurveys[0]?.fees && p.rentSurveys[0]?.fees.length > 0">
              <thead>
                <tr>
                  <th colspan="2" class="heading">MONTHLY FEES</th>
                </tr>
                <tr class="heading-row">
                  <th class="first-col col-heading">FEE</th>
                  <th class="last-col col-heading" style="text-align: center;">AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="f in p.rentSurveys[0]?.fees">
                  <tr v-if="f.amount">
                    <td class="colored-col" style="padding-left: 5px;">{{ f.type }}</td>
                    <td style="text-align: center;">${{ f.amount }}</td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="page-break" v-if="i < (properties.length - 1) && !config.condensed"></div>
    <div class="page-break" v-if="i < (properties.length - 1) && config.condensed && i > 0 && i % 2 === 1">
    </div>

  </div>
</template>

<script lang="ts" setup>
import { Pie } from 'vue-chartjs'

import { meanBy, reduce, sumBy } from 'lodash-es';

const { config, propertyId } = defineProps(['config', 'propertyId'])


const propertyStore = useMyPropertyStore()




const properties: any = ref([])
const subjectProperty: any = ref({})


const numbers = ref(0);

const comparableOrder = computed(() => ++numbers.value);




const customLabelPlugin = {
  id: 'customLabels',
  afterDraw(chart: any) {
    const ctx = chart.ctx;
    ctx.font = '9px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';

    const total = chart.data.datasets[0].data.reduce((a: any, b: any) => a + b, 0);

    chart.data.datasets[0].data.forEach((value: any, i: any) => {
      const meta = chart.getDatasetMeta(0);
      const arc = meta.data[i];
      if (!arc) return;

      const center = arc.getCenterPoint();
      const percentage = ((value / total) * 100).toFixed(0) + '%';

      ctx.fillText(percentage, center.x, center.y - 5);
      ctx.fillText(chart.data.labels[i], center.x, center.y + 5);
    });
  },
};

const options = {
  responsive: false,
  maintainAspectRatio: false,
  devicePixelRatio: 1.5,
  animation: {
    duration: 0
  },
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      enabled: false,
    },
  }
}

onMounted(async () => {
  if (propertyId) {
    const comparableProperties: any = await propertyStore.getComparableProperties(propertyId, config.theme, 'rent');
    subjectProperty.value = comparableProperties.splice(0, 1);
    properties.value = comparableProperties
  }
})

</script>

<style scoped>
@import '@/assets/css/report.css';
</style>