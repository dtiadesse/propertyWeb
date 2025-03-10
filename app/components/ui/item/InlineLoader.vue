<template>
  <div v-if="globalState.serverAction" class="container">
    <span class="loader"></span>
    {{ message }}
  </div>
</template>

<script lang="ts" setup>
const globalState = useMyGlobalStateStore()
const { message = 'Please wait...' } = defineProps(['message'])
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: inline;
}

.loader {
  width: 1.35rem;
  height: 1.35rem;
  border: 3px dotted #737373;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  animation: rotation 3s linear infinite;
  padding-top: 1rem;
  position: relative;
  top: 0.5rem;
  left: -0.5rem;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>