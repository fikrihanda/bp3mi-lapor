// https://nuxt.com/docs/api/configuration/nuxt-config
import process from 'node:process'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,
  css: ['~/assets/css/globals.scss'],
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'vuetify-nuxt-module',
    '@nuxtjs/emotion',
  ],
  vuetify: {
    moduleOptions: {
      enableRules: true,
      rulesConfiguration: {
        fromLabs: true,
      },
    },
  },
  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL,
    jwtKey: process.env.JWT_KEY,
  },
})
