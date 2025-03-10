import type { NewProperty } from "~~/models/newProperty.model";

export const useNewPropertyStore = defineStore('newPropertyStore', () => {
    const newProperty: Ref<NewProperty> = ref({} as NewProperty);
    const createNewPropertyMode = ref(false)

    function toggleCreateNewPropertyMode(): void {
        createNewPropertyMode.value = !createNewPropertyMode.value;
    }

    return {
        newProperty,
        createNewPropertyMode,
        toggleCreateNewPropertyMode,
    }
});