// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  ssr: false,
  devtools: { enabled: true },
  css: [ '~/assets/css/global.scss', '~/assets/css/typography.scss' ],

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

  $production: {
    nitro: {
      preset: 'cloudflare-pages-static'
    },
    routeRules: {
      '/': { prerender: true }
    }
  },

  runtimeConfig: {
    public: {
      apiUrl: 'https://rfad-se-backend.rinisle.uk',
      discordOAuthUrl: 'https://discord.com/oauth2/authorize?client_id=1320082838951034910&response_type=code&redirect_uri=https%3A%2F%2Frfad-mods.rinisle.uk%2Foauth2%2F&scope=identify',
      cdnUrl: 'https://rfad-images-test.rinisle.uk/images/', // https://images.example.com/images/ОСТАВИТЬ_ПУСТЫМ, сюда будет писаться хеш
      boostyUrl: 'https://boosty.to/skyrim_rfad_chicken'
    }
  },

  image: {
    dir: 'assets/images'
  },

  modules: [ 'nuxt-lucide-icons', '@pinia/nuxt', '@nuxt/image' ]
});