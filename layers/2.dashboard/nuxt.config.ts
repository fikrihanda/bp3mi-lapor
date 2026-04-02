// https://nuxt.com/docs/api/configuration/nuxt-config
import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  pinia: {
    storesDirs: ['./stores/**'],
  },
  nitro: {
    imports: {
      dirs: [
        resolve('./server/middlewares'),
      ],
    },
  },
})
