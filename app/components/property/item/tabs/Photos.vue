<template>
  <div v-if="!isLoading" class="slds-grid slds-wrap" style="background: #F5F5F5;">
    <div class="slds-col slds-size_6-of-12 slds-p-around_small full-preview-container" style="padding-bottom: 0;">

      <span class="slds-icon_container prop-main-image slds-icon__svg--default"
        :class="{ 'no-preview': propertyStore.property.images.length === 0 }">
        <img class="full-preview" v-if="previewImage" :src="previewImage" />
        <img class="full-preview no-photo" v-if="!previewImage" src="/images/no-photo.png" />

        <!-- <svg v-if="imageList.length === 0" class="slds-icon slds-icon-text-default test-class" aria-hidden="true">
          <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#image"></use>
        </svg> -->
      </span>
    </div>
    <div class="slds-col slds-size_6-of-12 slds-p-around_small" style="padding-left: 0;padding-bottom: 0;">

      <div class="image-picker-container">

        <div class="slds-form-element slds-m-bottom_medium">
          <div class="slds-form-element__control">
            <div class="slds-file-selector slds-file-selector_images">
              <div class="slds-file-selector__dropzone" @dragover.prevent="handleDragOver" @drop.prevent="handleDrop"
                @dragleave="handleDragLeave" :class="{ 'drag-over': isDragOver }">
                <input type="file" :multiple="true" class="slds-file-selector__input slds-assistive-text"
                  accept="image/*" @change="handleFileSelect" id="file-upload-input-59"
                  aria-labelledby="file-selector-primary-label-57 file-selector-secondary-label58" />
                <label class="slds-file-selector__body" for="file-upload-input-59" id="file-selector-secondary-label58">
                  <span class="slds-file-selector__button slds-button slds-button_neutral">
                    <svg class="slds-button__icon slds-button__icon_left" aria-hidden="true">
                      <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#add"></use>
                    </svg>Add Images</span>
                  <span class="slds-file-selector__text slds-medium-show">or Drop Images</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <ul class="img-list slds-has-dividers_bottom slds-has-block-links_space">
          <li v-for="(img1, index) in propertyStore.property.images" class="slds-item"
            :class="{ 'default-img': img1.defaultImage }">
            <div class="slds-grid prop-img-list">
              <div class="slds-col slds-size_2-of-12 slds-p-around_xx-small"
                style="display: flex;justify-content: center;align-items: center;">
                <fieldset class="slds-form-element" role="radiogroup">
                  <div class="slds-form-element__control">
                    <span class="slds-radio">
                      <input type="radio" :id="'radio-' + index" :value="index" name="default"
                        @click="previewIndex = index" :checked="index === previewIndex" />
                      <label class="slds-radio__label" :for="'radio-' + index">
                        <span class="slds-radio_faux"></span>
                      </label>
                    </span>

                  </div>
                </fieldset>
              </div>
              <div class="slds-col slds-size_8-of-12 slds-p-around_xx-small" @click="previewIndex = index"
                style="text-align: left;cursor: pointer;display: flex;align-items: center;">
                <img :src="buildImageUrl(`${img1.url}`, img1.isLocal)" class="preview-img">
                <span v-if="img1.defaultImage" style="width:100%;position: relative;padding-bottom: 1.2rem;">{{
                  img1.name }}
                  <span style="position: absolute;left: 3px; bottom: 0; font-size: 0.7rem;">(Default Image)</span>
                </span>
                <span v-else>{{ img1.name }}</span>


              </div>
              <div class="slds-col slds-size_2-of-12 slds-p-around_xx-small">
                <span @click="deleteFile(index)" style="cursor: pointer;"
                  class="slds-icon_container slds-icon-action-close slds-icon_container_circle">
                  <svg class="slds-icon slds-icon_small" aria-hidden="true">
                    <use xlink:href="/assets/icons/action-sprite/svg/symbols.svg#close"></use>
                  </svg>
                </span>
              </div>
            </div>
            <div v-if="img1.progress && img1.progress >= 0" class="slds-progress-bar" aria-valuemin="0"
              aria-valuemax="100" aria-valuenow="{{img1.progress}}" aria-label="" role="progressbar">
              <span class="slds-progress-bar__value" :style="`width:${img1.progress}%`"
                :class="{ 'slds-progress-bar__value_success': img1.progress >= 100 }">
                <span class="slds-assistive-text">Progress: {{ img1.progress }}%</span>
              </span>
            </div>
          </li>

          <li class="no-image-msg" v-if="propertyStore.property.images.length === 0">
            <div class="slds-box no-records">
              No photos uploaded.
            </div>
          </li>

        </ul>

        <div v-if="propertyStore.property.images.length > 0" class="footer-panel">
          <p style="margin-bottom: 0.5rem;">Choose a photo that you want to be set as a default</p>
          <button class="slds-button slds-button_brand" @click="setAsDefault">Make Default</button>
        </div>

        <div>

        </div>
      </div>
    </div>
  </div>
  <div v-if="isLoading">Loading. Please wait...</div>
</template>

<script lang="ts" setup>
import { BlobServiceClient, BlockBlobClient, type ContainerListBlobsOptions, type ServiceListContainersOptions } from '@azure/storage-blob';
import axios from 'axios';
import { ref } from 'vue';

const config = useConfig();
const runtimeConfig = useRuntimeConfig();
const propertyStore = useMyPropertyStore();
const imageList: any = ref([]);
const previewIndex: Ref<number> = ref(0);
const isDragOver = ref(false);
let defaultImage: any = null;
const isLoading: any = ref(true)


let accountURL = null;
let sasToken = null;
let accountName = null;
let blobServiceClient = null;
let imageUrl = null;

let containerClient: any = null;
let blockBlobClient: any = null;

const buildImageUrl1 = (imgUrl: any, isLocal: false) => {
  let url = `${imageUrl}${imgUrl}?${sasToken}`;

  if (isLocal) {
    url = imgUrl;
  }
  return url;
}

const buildImageUrl = (imgUrl: any, isLocal: boolean) => {
  return isLocal ? imgUrl : `${imageUrl}${imgUrl}?${sasToken}`;
};

const previewImage1: any = computed(() => {
  let urlImg = propertyStore.property.images[previewIndex.value]?.url ? propertyStore.property.images[previewIndex.value].url : null;

  if (urlImg) {
    urlImg = buildImageUrl(urlImg, propertyStore.property.images[previewIndex.value]?.isLocal);
  }

  return urlImg;
});

const previewImage: any = computed(() => {
  let urlImg = propertyStore.property.images[previewIndex.value]?.url || null;
  if (urlImg) {
    urlImg = buildImageUrl(urlImg, propertyStore.property.images[previewIndex.value]?.isLocal);
  }
  return urlImg;
});

const handleDragOver = () => {
  isDragOver.value = true;
}
const handleDragLeave = () => {
  isDragOver.value = false;
}
const handleDrop = (event: any) => {
  isDragOver.value = false;
  const files = event.dataTransfer.files;
  addFiles(files);
}

const handleFileSelect = async (event: any) => {
  const files = event.target.files;
  addFiles(files);
}
const addFiles = async (files: any) => {
  if (defaultImage === null) {
    defaultImage = propertyStore.property.images.length === 0 ? true : false;
  }
  let createNew = propertyStore.property.createNewImage;
  const promiseArray = []
  for (const file of files) {
    const img = ref({
      name: file.name,
      url: '/images/ripple.svg',
      progress: 0,
      isLocal: true,
      file,
      defaultImage
    });

    propertyStore.property.images.push(img.value);
    defaultImage = false;
    promiseArray.push(uploadFileToAssets(img))
  }

  const propertyImages: any = [...propertyStore.property.images];

  Promise.all(promiseArray).then(async (values: any) => {
    await $fetch(`${runtimeConfig.public.apiUrl}properties/image-upload?propertyId=${propertyStore.property.id}&stdStateCode=${propertyStore.property.stdStateCode}&createNew=${createNew}`, {
      method: "POST",
      body: propertyImages
    });
    propertyStore.property.createNewImage = false;
  });
}

const addFiles1 = async (files: any) => {
  if (defaultImage === null) {
    defaultImage = propertyStore.property.images.length === 0 ? true : false;
  }

  let createNew = propertyStore.property.createNewImage;
  const promiseArray = [];

  for (const file of files) {
    const img = ref({
      name: file.name,
      url: '/images/ripple.svg', // Temporary loader
      progress: 0,
      isLocal: true,
      file,
      defaultImage,
    });

    propertyStore.property.images.push(img.value);
    defaultImage = false;
    promiseArray.push(uploadFileToAssets(img));
  }

  Promise.all(promiseArray).then(() => {
    propertyStore.property.createNewImage = false;
  });
};


const uploadFileToAssets = async (img: any) => {
  const folderPath = "/assets/property/"; // Path relative to the public folder
  const fileName = `${Date.now()}-${img.value.file.name.replace(/\s+/g, "-")}`;
  const filePath = `${folderPath}${fileName}`;

  try {
    // Create a local URL for the uploaded file
    img.value.url = filePath;
    img.value.isLocal = true;

    // Remove file from object to prevent unnecessary data
    delete img.value.file;

    return img;
  } catch (error) {
    console.error("Error saving file locally:", error);
  }
};


const uploadFileToAzure = async (img: any) => {

  let folderName = propertyStore.property.name.trim();

  folderName = (!folderName || folderName.length < 2) ? propertyStore.property.stdAddress1 : folderName

  folderName = folderName.replace(/[^a-zA-Z0-9]/g, '-')

  const fileName = `${folderName}/${img.value.file.name}`;
  containerClient = await blobServiceClient.getContainerClient('property-images');
  blockBlobClient = await containerClient.getBlockBlobClient(fileName);
  await blockBlobClient.upload(img.value.file, img.value.file.size, {
    blobHTTPHeaders: {
      blobContentType: img.value.file.type,
    },
    onProgress: (progress: any) => {
      const percentage = ((progress.loadedBytes / img.value.file.size) * 100);
      img.value.progress = percentage;
    },
  });

  // img.value.fileName = fileName;
  delete img.value.file;
  img.value.url = fileName;
  img.value.isLocal = false;
  return img;
}


const deleteFile = async (index: number) => {

  const propertyImages = [...propertyStore.property.images];

  const deleted: any = propertyImages.splice(index, 1);

  if (deleted[0].defaultImage === true) {
    propertyImages[0].defaultImage = true;
  }

  await $fetch(`${runtimeConfig.public.apiUrl}properties/image-upload?propertyId=${propertyStore.property.id}&stdStateCode=${propertyStore.property.stdStateCode}&createNew=false`, {
    method: "POST",
    body: propertyImages
  }).then(r => {
    propertyStore.property.images = [...propertyImages];
  });
}

const setAsDefault = async () => {
  let propertyImages = [...propertyStore.property.images];
  propertyImages = propertyImages.map((pi: any, i: any) => {
    pi.defaultImage = (i === previewIndex.value) ? true : false
    return pi;
  }).sort((a, b) => {
    return b.defaultImage - a.defaultImage;
  });

  await $fetch(`${runtimeConfig.public.apiUrl}properties/image-upload?propertyId=${propertyStore.property.id}&stdStateCode=${propertyStore.property.stdStateCode}&createNew=false`, {
    method: "POST",
    body: propertyImages
  });

  propertyStore.property.images = [...propertyImages];
  previewIndex.value = 0;

}

onMounted(async () => {
  const defaultImage = propertyStore.property.images.findIndex(i => i.defaultImage);
  previewIndex.value = defaultImage >= 0 ? defaultImage : 0;

  let { accountURL: aUrl, sasToken: sToken, accountName: accName } = await $fetch("/api/photo?permission=WRITE");
  accountURL = aUrl;
  sasToken = sToken;
  accountName = accName;
  imageUrl = `https://${accountName}.blob.core.windows.net/property-images/`;
  blobServiceClient = new BlobServiceClient(accountURL);
  isLoading.value = false;
})

</script>

<style scoped>
.slds-file-selector__body {
  display: flex;
  justify-content: center;
  align-items: center;
}

.slds-file-selector__text {
  margin: 0;
  margin-left: 1rem;
}

.preview-img {
  height: 2rem;
  float: left;
  margin-right: 0.25rem;
}

.slds-icon-action-close {
  background-color: var(--primary-color);
}

.slds-icon_small {
  width: 0.85rem;
  height: 0.85rem;
}

.prop-img-list .slds-col {
  align-content: center;
  text-align: center
}

.slds-icon_container {
  padding: 0.25rem;
}

.image-picker-container {
  background: white;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  height: 22rem;
}

.img-list {
  height: 10rem;
  overflow-y: auto;
  margin-bottom: 1.5rem;
}

.img-list .slds-item {
  padding: 0.2rem 0;
  border-bottom: 1px solid #E5E5E5;
}

.prop-main-image {
  display: flex;
  /* background: white; */
  justify-content: center;
  align-items: flex-start;
  padding: 0;
  width: 100%;
}

.prop-main-image.no-preview {
  height: 22rem;
  align-items: center;
  border: 1px solid #C9C9C9;
}

.prop-main-image svg {
  height: 10rem;
  width: 10rem;
  fill: #9E9E9E;
}

.full-preview-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.no-image-msg {
  text-align: left;
}

.full-preview {
  max-height: 22rem;
}

.full-preview.no-photo {
  opacity: 20%;
}

.slds-file-selector__dropzone.drag-over {
  border-color: #007bff;
  background-color: #f0f8ff;
}

.no-records {
  width: 100%;
  margin: 0;
  background: #f5f5f5;
}

.slds-progress-bar {
  height: 0.15rem;
  margin-bottom: -0.2rem;
}

.default-img {
  background-color: #EAF5FE;
  ;
}
</style>
