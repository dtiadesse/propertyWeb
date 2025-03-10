import type { LoggedInUserData } from "~~/models/loggedInUserData.model";

export const useAuthStore = defineStore('loggedInUserAuthStore', () => {
    const loggedInUserData: Ref<LoggedInUserData> = ref({} as LoggedInUserData);

    function setLoggedInUserData(newUserData: LoggedInUserData) {
        loggedInUserData.value = newUserData;
    }

    function getAccessToken(): string {
        return loggedInUserData?.value?.accessToken;
    }

    function isLoggedIn(): boolean {
        return loggedInUserData?.value?.isLoggedIn;
    }

    function getUserEmail(): string {
        return loggedInUserData.value?.userInfo?.username;
    }

    function getUserName(): string {
        return loggedInUserData.value?.userInfo?.name.split("/")[0] || "System";
    }


    return {
        loggedInUserData,
        setLoggedInUserData,
        getAccessToken,
        isLoggedIn,
        getUserEmail,
        getUserName,
    }
});