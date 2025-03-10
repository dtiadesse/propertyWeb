<template>
  <div class="infobox-container">
    <!-- <div class="back-btn">
      <svg class="slds-icon slds-icon-text-default" aria-hidden="true">
        <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#back"></use>
      </svg>
      <a href="#" @click.prevent="$router.back()">Back to list of Properties</a>
    </div> -->

    <div class="info-box">
      <div class="info">
        <svg class="slds-icon slds-icon-text-default" aria-hidden="true">
          <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#checkin"></use>
        </svg>
        <h3>{{ property.stdAddress1 }}</h3>
        <h3>{{ property.stdCity }}, {{ property.stdState }}</h3>
        <h3>{{ property.stdPostalCode }}</h3>
      </div>
    </div>

  </div>

</template>

<script lang="ts" setup>

const { property } = defineProps(['property'])

</script>

<style scoped>
.back-btn {
  padding: 0.6rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: var(--primary-color);

  svg {
    margin-right: 0.55rem;
    fill: var(--primary-color);
    ;
  }

  .slds-icon {
    width: 1.5rem;
    height: 1.5rem;
  }
}

.infobox-container {
  background-color: white;
  border: 1px solid #C9C9C9;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 1rem;

}

.info-box {
  height: 14rem;
  background: url('/assets/images/bg.jpg');
  background-size: 110%;
  position: relative;
  background-repeat: no-repeat;
  background-position: bottom;
}

.info-box:after {
  background: rgb(0 56 101 / 94%);
  /* background-color: rgb(31 100 119 / 94%); */
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
}

.info {
  color: white;
  z-index: 99;
  position: relative;
  align-items: center;
  display: flex;
  flex-direction: column;
  padding-top: 3.5rem;

  svg {
    fill: white;
    margin-bottom: 0.65rem;
  }

  h3 {
    font-size: 0.9rem;
    font-weight: 700;
    /* margin-bottom: 0.15rem; */
  }
}
</style>