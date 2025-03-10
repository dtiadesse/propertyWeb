import type { AccountInfo } from "@azure/msal-browser";

export interface LoggedInUserData {
    isLoggedIn: boolean;
    accessToken: string;
    userInfo: AccountInfo
}