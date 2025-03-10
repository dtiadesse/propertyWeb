import type { Campaign } from "~~/models/campaign.model";
import type { CreateResponse } from "~~/models/createResponse.model";

export const useCampaignStore = defineStore('campaignStore', () => {
    const addCampaignMbrsMode = ref(false)
    const campaignSelectionMode = ref(false)
    const campaigns: Ref<Campaign[]> = ref([]);
    const selectedCampaign: Ref<Campaign> = ref(undefined)
    const mbrsCreateResponse = ref<CreateResponse>();

    function toggleCampaignMode(): void {
        addCampaignMbrsMode.value = !addCampaignMbrsMode.value;
        campaignSelectionMode.value = false;
    }

    function toggleCampaignSelectionMode(): void {
        campaignSelectionMode.value = !campaignSelectionMode.value;
    }

    function setSelectedCampaign(newCampaign: Campaign): void {
        selectedCampaign.value = newCampaign;
    }

    function clearSelectedCampaign(): void {
        selectedCampaign.value = undefined;
    }

    async function addCampaignMembers(contactIds: string[]) {
        mbrsCreateResponse.value = null;
        const campaign: Campaign = {
            id: selectedCampaign.value.id,
            contacts: contactIds
        } as Campaign;
        mbrsCreateResponse.value = await $fetch('/api/onecap/campaign', {
            method: 'POST',
            body: JSON.stringify(campaign),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (mbrsCreateResponse.value.message === 'Campaign member(s) added successfully.') {
            toggleCampaignSelectionMode();
            toggleCampaignMode();
            alert(mbrsCreateResponse.value.message);
        }
    }

    return {
        addCampaignMbrsMode,
        campaignSelectionMode,
        toggleCampaignMode,
        toggleCampaignSelectionMode,
        campaigns,
        selectedCampaign,
        setSelectedCampaign,
        clearSelectedCampaign,
        addCampaignMembers,
        mbrsCreateResponse,
    }
});