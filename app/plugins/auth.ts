export default defineNuxtPlugin((nuxt: any) => {
    // The pinia or vuex instant is needed in order to access the store instance outside setup()
    addRouteMiddleware('propertyplus-auth-middleware', async (to, from) => {
        if (import.meta.client && to.path !== "/report" && to.path !== "/login-failed") {
            const { isLoggedIn, setLoggedInUserData } = useAuthStore(nuxt.$pinia);
            const { ssoLogin } = await useEntraAuth();
            const userLoggedIn = isLoggedIn();
            if (!userLoggedIn) {
                const loggedInUserData = await ssoLogin()
                if (loggedInUserData && loggedInUserData.isLoggedIn) {
                    setLoggedInUserData(loggedInUserData);
                } else {
                    alert('Login failed! Please retry later or contact the administrator.')
                    return navigateTo('/login-failed');
                }
            }
        }
    }, { global: true });
});

