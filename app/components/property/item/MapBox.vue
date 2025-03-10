<template>
  <div class="slds-box map-box">
    <div ref="mapContainer" class="map-container"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

const { property } = defineProps(['property'])

const mapContainer = ref<HTMLElement | null>(null);

function toggleHighlight(markerView: any) {
  if (markerView.content.classList.contains("highlight")) {
    markerView.content.classList.remove("highlight");
    markerView.zIndex = null;
  } else {
    markerView.content.classList.add("highlight");
    markerView.zIndex = 1;
  }
}

function buildContent(property: any) {
  const content = document.createElement("div");

  content.classList.add("property");
  content.innerHTML = `
      <div class="icon">
         <img src="/images/location-100.png" class="location-img" />
      </div>
      <div class="details">
          <div class="address">${property.stdAddress1}</div>
          <div class="features">
          ${property.city}
          </div>
      </div>
      `;
  return content;
}

function addMarker(map: any, propetyCoordiates: any, property: any) {
  const AdvancedMarkerElement = new google.maps.marker.AdvancedMarkerElement({
    map,
    content: buildContent(property),
    position: propetyCoordiates,
  });

  AdvancedMarkerElement.addListener("gmp-click", () => {
    toggleHighlight(AdvancedMarkerElement);
  });
}

onMounted(async () => {
  if (mapContainer.value) {


    const center = { lat: 40.730610, lng: -73.935242 }; // Default center to New york
    const map = new google.maps.Map(mapContainer.value, {
      zoom: 16,
      center,
      mapTypeControlOptions: {
        mapTypeIds: [],
      },
      disableDefaultUI: true,
      mapTypeControl: true,
      scaleControl: true,
      zoomControl: true,
      mapId: "4504f8b37365c3d1",
    });

    let propetyCoordiates: any = { lat: null, lng: null };
    if (property.stdLatitude && property.stdLongitude) {
      propetyCoordiates.lat = property.stdLatitude;
      propetyCoordiates.lng = property.stdLongitude;
    }
    else {
      propetyCoordiates = await geocodeLocation(`${property.address.streetAddress},${property.city},${property.state}`);
    }
    addMarker(map, {
      lat: propetyCoordiates.lat,
      lng: propetyCoordiates.lng,
    }, property);

    const myLatlng: any = new google.maps.LatLng(
      propetyCoordiates.lat,
      propetyCoordiates.lng
    );
    map.panTo(myLatlng);


  }
});

const geocodeLocation = async (address: any) => {
  try {
    const geocoder = new google.maps.Geocoder();

    const location: any = await geocoder.geocode({ address });

    const lat = location.results[0].geometry.location.lat()
    const lng = location.results[0].geometry.location.lng()

    return { lat, lng }
  } catch (error) {
    console.error(error);
  }
};
</script>

<style>
.map-container {
  width: 100%;
  height: 350px;
}

.slds-box.map-box {
  padding: 0.35rem;
}

.map-box .slds-test-class {
  width: auto;
  height: 2.5rem;
  fill: #ed1d2e;
}

.map-box .property {
  align-items: center;
  border-radius: 5px;
  color: #263238;
  display: flex;
  font-size: 14px;
  gap: 15px;
  height: 30px;
  justify-content: center;
  padding: 4px;
  position: relative;
  transition: all 0.3s ease-out;
  width: 75px;
}

.map-box .property::after {
  border-left: 9px solid transparent;
  border-right: 9px solid transparent;
  /* border-top: 9px solid #f71c2d; */
  content: "";
  height: 0;
  left: 50%;
  position: absolute;
  top: 100%;
  transform: translate(-50%, 0);
  transition: all 0.3s ease-out;
  width: 0;
  z-index: 1;
}

.property .icon {
  /* align-items: center;
  display: flex;
  justify-content: center; */
  /* color: #ffffff; */
  /* width: 50px; */
}

.map-box .property .details {
  display: none;
  flex-direction: column;
  flex: 1;
}

.map-box .property .address {
  /* font-size: 10px; */
  margin-bottom: 10px;
  /* margin-top: 5px; */
}

.map-box .property .features {
  align-items: flex-end;
  display: flex;
  flex-direction: row;
  gap: 10px;
  color: #9e9e9e;

}

.map-box .property .features>div {
  align-items: center;
  background: #f5f5f5;
  border-radius: 5px;
  border: 1px solid #ccc;
  display: flex;
  font-size: 10px;
  gap: 5px;
  padding: 5px;
}

.map-box .location-img {
  height: 45px;
}

/*
 * Property styles in highlighted state.
 */
.map-box .property.highlight {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.2);
  height: 80px;
  padding: 8px 15px;
  width: 250px;
  display: flex;
  flex-direction: row;
}

.map-box .property.highlight::after {
  border-top: 9px solid #ffffff;
}

.map-box .property.highlight .details {
  display: flex;
}

.map-box .property.highlight .icon svg {
  width: 35px;
  /* height: 50px; */
}
</style>