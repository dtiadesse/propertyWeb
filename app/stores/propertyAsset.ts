export const usePropertyAssetStore = defineStore('propertyAssetStore', () => {
    const propertyAsset: Ref<Property> = ref({} as Property)
    const propertyPageHeader = ref('')

    function setPropertyPageHeader(newProperty: Property) {
        if (newProperty) {
            let pageHeader = newProperty.name;
            if (pageHeader === '') {
                pageHeader = newProperty.stdAddress1;
            } else {
                pageHeader += ', ' + newProperty.stdAddress1
            }
            pageHeader += ', ' + newProperty.stdCity + ' ' + newProperty.stdState
            propertyPageHeader.value = pageHeader;
        }
    }

    function setPropertyAsset(newProperty: Property) {
        if (newProperty) {
            propertyAsset.value = newProperty;
            setPropertyPageHeader(newProperty);
        }
    }


    return {
        propertyAsset,
        setPropertyAsset,
        propertyPageHeader,
    }
})