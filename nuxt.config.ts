// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['@picocss/pico'],
    build: {
        transpile: ['@picocss/pico'],

    },
    devtools: { enabled: false },
    runtimeConfig: {
        apiKey: process.env.YANDEX_API_KEY,
    },
    
});
