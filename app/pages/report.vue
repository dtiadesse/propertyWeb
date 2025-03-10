<template>
  <div :class="setReportTheme">
    <ReportRentPage v-if="report === 'Rent Comparables Pages'" :propertyId="propertyId" :config="config" />
    <ReportSalePage v-else-if="report === 'Sale Comparables Pages'" :property-id="propertyId" :config="config" />
    <ReportRentSummary v-else-if="report === 'Rent Comparables Summary'" :property-id="propertyId" :config="config" />
    <ReportSaleSummary v-else-if="report === 'Sale Comparables Summary'" :property-id="propertyId" :config="config" />
    <ReportRentRank v-else-if="report === 'Rent Comparables Ranking'" :property-id="propertyId" :config="config" />
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
let { config = "" as any, propertyId, report, access_token } = route.query;
const auth = useAuthStore()

if (access_token) {
  auth.setLoggedInUserData({ accessToken: access_token, isLoggedIn: true, userInfo: {} as any } as LoggedInUserData)
}
try {
  config = atob(config)
  config = JSON.parse(config);
  // config.theme = "Dark Red";
  // config.showPhotos = true;
  // config.marketRentOnly = true;
  // config.condensed = true;
  // config.unitsAggregate = "Total";
  // config.showLocation = true;
  // config.footNote = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";
}
catch (e) { }

useHead({
  title: report.toString(),
  meta: [
    { name: 'description', content: report }
  ]
})


import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Title } from 'chart.js'
import type { LoggedInUserData } from '~~/models/loggedInUserData.model';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Title)

ChartJS.defaults.color = '#000';

const setReportTheme = computed(() => {

  let theme = 'red'

  if (config.theme == "Dark Red") {
    theme = 'darkred';
  }
  else if (config.theme == "Red") {
    theme = 'red';
  }
  if (config.condensed == true) {
    theme += ' condensed';
  }
  else {
    theme += '';
  }

  return theme;

})

const options = {
  responsive: false,
  maintainAspectRatio: false,
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
      const percentage = ((value / total) * 100).toFixed(1) + '%';

      ctx.fillText(percentage, center.x, center.y - 5);
      ctx.fillText(chart.data.labels[i], center.x, center.y + 5);
    });
  },
};

</script>

<style scoped>
@import '@/assets/css/report.css';
</style>