<template>
  <div class="slds-form-element" :class="{ 'slds-has-error': hasError }">
    <label v-if="label" class="slds-form-element__label" :for="inputUID">
      <abbr v-if="is_required" class="slds-required" title="required">* </abbr>{{ label }}</label>
    <div class="slds-form-element__control">
      <a style="border-top: none;border-left: none; border-right: none; padding-left: 0; color: #1f6477;"
        class="slds-input readonly" v-if="sfObject && sfObject.Id" href="javascript:;" @click="openUrl">{{ value }}</a>
      <input v-else readonly type="text" id="text-input-id-46" placeholder="" :value="value"
        class="slds-input readonly" />
      <svg v-if="showEditIcon" class="slds-icon slds-icon-text-default" aria-hidden="true" @click="toggleEditMode">
        <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#edit"></use>
      </svg>
    </div>
    <div class="slds-form-element__help" :id="'error-message-' + inputUID">{{ hasError }}</div>
  </div>
</template>

<script lang="ts" setup>
import { getOneCapAccountLink, getOneCapContactLink } from '~/utils/oneCapLinkHelper';
const runtimeConfig = useRuntimeConfig()

const { required, label, name, value, showEditIcon = true, hasError, sfObject, model } = defineProps(['required', 'label', 'name', 'value', 'showEditIcon', 'hasError', 'sfObject', 'model'])

const inputUID = computed(() => name ? name.trim().toLowerCase() : "input_" + Math.floor(Math.random() * 985900))

const is_required = ref(required)

const config = useConfig();


const toggleEditMode = () => {
  config.setConfig({ editMode: true })
}


const openUrl = () => {

  let url = '';
  if (model === 'company') {
    url = getOneCapAccountLink(runtimeConfig.public.oneCapEnvironment, sfObject.Id);
    // url = `${runtimeConfig.public.salesforceDomain}lightning/r/Account/${sfObject.Id}/view`
  }
  else if (model === 'contact') {
    // url = `${runtimeConfig.public.salesforceDomain}lightning/r/Contact/${sfObject.Id}/view`
    url = getOneCapContactLink(runtimeConfig.public.oneCapEnvironment, sfObject.Id);
  }
  if (url) {
    window.open(url, 'salesforcePopup');
  }
}

</script>

<style scoped>
.slds-input.readonly {
  border-bottom: 1px solid #00000066;
  border-radius: 0;
  padding-right: 1.1rem;
  text-overflow: ellipsis;
}

.slds-form-element__control {
  display: flex;
  position: relative;
}

.slds-icon {
  position: absolute;
  right: 0.4rem;
  width: 0.8rem;
  cursor: pointer;
}

.slds-has-error .slds-input.readonly {
  border: 0;
  border-radius: 0;
  box-shadow: none;
  border-bottom: 1px solid #ea001e;

}
</style>