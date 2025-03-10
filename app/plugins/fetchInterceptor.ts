export default defineNuxtPlugin((nuxtApp) => {
    globalThis.$fetch = $fetch.create({
        async onRequest({ options }: any) {
            // console.log("Request send:", options);
            const auth = useAuthStore();
            const token = auth.getAccessToken(); // Get the latest MSAL token
            if (token) {
                options.headers = {
                    ...options.headers,
                    Authorization: `Bearer ${token}`,
                };
            }
        },
        // onResponse({ response }) {
        //     console.log("Response received:", response);
        // },
        // onResponseError({ response }) {
        //     console.error("Fetch Error:", response);
        // },
    });
})
