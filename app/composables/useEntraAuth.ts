import type { AuthenticationRequiredError } from "@azure/identity";
import { BrowserCacheLocation, InteractionRequiredAuthError, PublicClientApplication, type AccountInfo, type AuthenticationResult } from "@azure/msal-browser";
import type { LoggedInUserData } from "~~/models/loggedInUserData.model";
export const useEntraAuth = async () => {
    const config = useRuntimeConfig();
    const msalConfig = {
        auth: {
            clientId: config.public.clientId,
            authority: config.public.authority,
            redirectUri: config.public.redirectUri,
            // postLogoutRedirectUri: config.pubilc.postLogoutRedirectUri,
            navigateToLoginRequestUrl: true,
        },
        cache: {
            cacheLocation: BrowserCacheLocation.LocalStorage,
            storeAuthStateInCookie: true,
        }
    };
    //@ts-ignore
    const msalInstance = new PublicClientApplication(msalConfig)
    await msalInstance.initialize();

    // Check if the user is logged in and from our tenant (cushwake.com)
    const getLocalUserInfo = (): any => {
        return msalInstance.getAllAccounts().find(account => account.username.includes("cushwake.com"));

        // const allAccounts = msalInstance.getAllAccounts();
        // allAccounts.forEach(account => {
        //     if (account.username.includes("cushwake.com")) {
        //         return account
        //     }
        // });
        // return undefined;
    }

    const getUserData = (loginResponse: AuthenticationResult): LoggedInUserData => {
        const accessToken = loginResponse.accessToken;
        const userAccount = loginResponse.account;
        return {
            isLoggedIn: true,
            accessToken,
            userInfo: userAccount
        }
    }

    // SSO login with silent authentication if possible, otherwise prompt the user to login
    const ssoLogin = async (): Promise<LoggedInUserData | undefined> => {

        const userAccount = getLocalUserInfo();

        const request = {
            scopes: [
                "918e884a-afaa-485f-b7ef-31453233aecb/.default"
            ]
        };
        if (userAccount) {
            msalInstance.setActiveAccount(userAccount)
            const loginResponse = await msalInstance.acquireTokenSilent({ ...request, account: userAccount })
            if (loginResponse) {
                return getUserData(loginResponse)
            }
        }

        console.log('Sso login starting...');

        let loggedInUserData: LoggedInUserData = undefined;
        try {
            try {
                const loginResponse = await msalInstance.ssoSilent(request);
                console.log("This from silent");
                loggedInUserData = getUserData(loginResponse);
            } catch (err) {
                if (err instanceof InteractionRequiredAuthError) {
                    try {
                        console.log('Login popup try')
                        const loginResponse = await msalInstance.loginPopup(request);
                        console.log("This from popup");
                        loggedInUserData = getUserData(loginResponse);
                    } catch (popupErr: any) {
                        if (popupErr.message.includes('Error opening popup window')) {
                            alert("We were unable to log you in due to popup error. Please ensure " +
                                "that the popup is not blocked for the site.");
                        }
                    }
                } else {
                    // handle error
                    // const loginResponse = await msalInstance.loginPopup(request);
                    console.error(err);
                }
            }
        } catch (err) {
            alert(err);
            console.error(err);
        }
        return loggedInUserData;
    }

    return { ssoLogin }
}

