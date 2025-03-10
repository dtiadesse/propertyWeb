<template>
  <div v-if="config.config.value.editMode" class="form-footer slds-docked-form-footer stickyFooter">
    <button class="slds-button slds-button_neutral" @click="cancel">Cancel</button>
    <button class="slds-button slds-button_brand" @click="save">Save</button>
  </div>
</template>

<script lang="ts" setup>
declare var Sfdc: any;
const config = useConfig();
const propertyStore = useMyPropertyStore();
const top = ref("0px");

const cancel = () => {
  config.setConfig({ editMode: false })
  propertyStore.cancelChanges()
}

const save = () => {
  // config.setConfig({ editMode: false })
  propertyStore.saveChanges()
}

// const globalState = useMyGlobalStateStore()
// const sr = JSON.parse(globalState.signedRequest);

// onMounted(() => {
//   Sfdc.canvas.client.subscribe(sr.client,
//     {
//       name: 'canvas.scroll', onData: function (event: any) {
//         // console.log(event)
//         // console.log("Parent's contentHeight; " + event.heights.contentHeight);
//         // console.log("Parent's pageHeight; " + event.heights.pageHeight);
//         // console.log("Parent's scrollTop; " + event.heights.scrollTop);
//         // top.value = event.heights.scrollTop - event.heights.pageHeight + 100 + 'px'
//         // console.log("Parent's contentWidth; " + event.widths.contentWidth);
//         // console.log("Parent's pageWidth; " + event.widths.pageWidth);
//         // console.log("Parent's scrollLeft; " + event.widths.scrollLeft);
//       }
//     }
//   );
// })

// onUnmounted(() => {
//   Sfdc.canvas.client.unsubscribe(sr.client,
//     {
//       name: 'canvas.scroll', onData: function (event: any) {
//         console.log("Parent's contentHeight; " + event.heights.contentHeight);
//         console.log("Parent's pageHeight; " + event.heights.pageHeight);
//         console.log("Parent's scrollTop; " + event.heights.scrollTop);
//         console.log("Parent's contentWidth; " + event.widths.contentWidth);
//         console.log("Parent's pageWidth; " + event.widths.pageWidth);
//         console.log("Parent's scrollLeft; " + event.widths.scrollLeft);
//       }
//     }
//   );
// })



</script>

<style scoped>
.slds-docked-form-footer {
  position: sticky;
  bottom: 0rem;
  padding: 1.25rem 0;
  box-shadow: 0px -2px 4px 0px rgb(0 0 0 / 25%);
  z-index: 8000;
}
</style>