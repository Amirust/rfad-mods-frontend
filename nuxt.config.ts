// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: [ '~/assets/css/global.scss' ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  // $production: {
  //   nitro: {
  //     preset: 'cloudflare-pages-static'
  //   },
  //   routeRules: {
  //     '/': { prerender: true }
  //   }
  // },

  modules: [ 'nuxt-lucide-icons' ]
});