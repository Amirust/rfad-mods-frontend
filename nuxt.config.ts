// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  ssr: false,
  devtools: { enabled: true },
  css: [ '~/assets/css/global.scss' ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  app: {
    pageTransition: { name: 'transition-page', mode: 'out-in' },
    layoutTransition: { name: 'transition-page', mode: 'out-in' }
  },

  // $production: {
  //   nitro: {
  //     preset: 'cloudflare-pages-static'
  //   },
  //   routeRules: {
  //     '/': { prerender: true }
  //   }
  // },

  runtimeConfig: {
    public: {
      apiUrl: 'http://localhost:7000',
      discordOAuthUrl: '' // TODO: Remove before push
    }
  },

  image: {
    dir: 'assets/images'
  },

  modules: [ 'nuxt-lucide-icons', '@pinia/nuxt', '@nuxt/image' ]
});