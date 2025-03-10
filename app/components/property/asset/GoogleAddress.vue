<script lang="ts" setup>
import { GoogleMap, Marker } from 'vue3-google-map'

const center = { lat: 40.689247, lng: -74.044502 }
</script>

<template>
    <div class="not-prose">
        <div class="flex items-center justify-center p-5">
            <GoogleMap api-key="AIzaSyBV6ZXL_V7ntdq0P-rRauQQSR2cFbzyqpE" style="width: 100%; height: 500px" :center="center"
                :zoom="15">
                <Marker :options="{ position: center }" />
            </GoogleMap>
        </div>
    </div>
</template>
