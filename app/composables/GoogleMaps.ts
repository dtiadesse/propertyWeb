// composables/useGoogleMaps.ts
import { ref } from "vue";

export const useGoogleMaps = () => {
  const map = ref<google.maps.Map | null>(null);
  const geocoder = ref<google.maps.Geocoder | null>(null);

  // Function to load Google Maps script dynamically
  const loadGoogleMapsScript = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (typeof window.google !== "undefined") {
        resolve(); // Already loaded
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${useRuntimeConfig().public.googleMapsApiKey
        }&libraries=places,marker`;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = (error) =>
        reject(new Error("Failed to load Google Maps script."));
      document.head.appendChild(script);
    });
  };

  const initMap = async (
    element: HTMLElement,
    center: { lat: number; lng: number },
    zoom: number = 12
  ): Promise<any> => {
    await loadGoogleMapsScript(); // Wait for the script to load

    // map.value = new google.maps.Map(element, {
    //   center,
    //   zoom,
    //   mapTypeControlOptions: {
    //     mapTypeIds: [],
    //   }, // here´s the array of controls
    //   // disableDefaultUI: true, // a way to quickly hide all controls
    //   // mapTypeControl: true,
    //   // scaleControl: true,
    //   // zoomControl: true,
    //   mapId: "4504f8b37365c3d0",
    // });

    // Initialize the geocoder once the map is available
    // geocoder.value = new google.maps.Geocoder();

    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    // const center = { lat: 37.43238031167444, lng: -122.16795397128632 };
    const map = new Map(element, {
      zoom: 11,
      center,
      mapId: "4504f8b37365c3d0",
    });

    return map;
  };

  const geocodeAddress = async (
    address: string
  ): Promise<google.maps.LatLng | null> => {
    await loadGoogleMapsScript(); // Ensure API is loaded before geocoding

    return new Promise((resolve, reject) => {
      if (!geocoder.value) {
        reject(new Error("Geocoder is not initialized."));
        return;
      }

      geocoder.value.geocode({ address }, (results: any, status) => {
        if (status === "OK" && results[0]) {
          resolve(results[0].geometry.location);
        } else {
          reject(new Error(`Geocode failed: ${status}`));
        }
      });
    });
  };

  const toggleHighlight = (markerView: any, property: any) => {
    if (markerView.content.classList.contains("highlight")) {
      markerView.content.classList.remove("highlight");
      markerView.zIndex = null;
    } else {
      markerView.content.classList.add("highlight");
      markerView.zIndex = 1;
    }
  };

  const buildContent = (property: any) => {
    const content = document.createElement("div");
    content.classList.add("property");
    content.classList.add("property_test");
    content.innerHTML = `
      <div class="icon">
          <i aria-hidden="true" class="fa fa-icon fa-${property.type}" title="${property.type}"></i>
      </div>
      <div class="details">
          <div class="price">${property.price}</div>
          <div class="address">${property.address}</div>
          <div class="features">
          <div>
              <i aria-hidden="true" class="fa fa-bed fa-lg bed" title="bedroom"></i>
              <span class="fa-sr-only">bedroom</span>
              <span>${property.bed}</span>
          </div>
          <div>
              <i aria-hidden="true" class="fa fa-bath fa-lg bath" title="bathroom"></i>
              <span class="fa-sr-only">bathroom</span>
              <span>${property.bath}</span>
          </div>
          <div>
              <i aria-hidden="true" class="fa fa-ruler fa-lg size" title="size"></i>
              <span class="fa-sr-only">size</span>
              <span>${property.size} ft<sup>2</sup></span>
          </div>
          </div>
      </div>
      `;
    return content;
  };

  const addMarker = async (propetyCoordiates: any, property: any) => {
    const myLatlng: any = new google.maps.LatLng(
      propetyCoordiates.lat,
      propetyCoordiates.lng
    );
    map.value?.panTo(myLatlng);

    const AdvancedMarkerElement = new google.maps.marker.AdvancedMarkerElement({
      map: map.value,
      content: buildContent(property),
      position: { lat: propetyCoordiates.lat, lng: propetyCoordiates.lng },
      title: property.name,
    });

    AdvancedMarkerElement.addListener("click", () => {
      toggleHighlight(AdvancedMarkerElement, property);
    });

  };

  return {
    loadGoogleMapsScript,
    initMap,
    geocodeAddress,
    addMarker,
  };
};
