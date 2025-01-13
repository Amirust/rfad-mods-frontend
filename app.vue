<template>
  <div>
    <Html lang="ru-RU">
      <Head>
        <Title>{{ title }}</Title>
        <Meta property="og:title" :content="title" />
        <Meta name="twitter:card" content="summary_large_image" />
        <Meta name="theme-color" :content="themeColor" />
        <Meta property="og:site_name" :content="brand" />
        <Meta property="og:type" content="website" />

        <Meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

        <Link rel="shortcut icon" type="image/x-icon" href="/favicon.png" />
        <Link
          rel="apple-touch-icon"
          type="image/svg+xml"
          sizes="any"
          href="/apple-touch-icon.svg"
        />
      </Head>
      <Body class="bg-black w-full h-full min-h-svh">
        <NuxtLayout>
          <div class="z-10">
            <NuxtPage />
          </div>
        </NuxtLayout>
      </Body>
    </Html>
  </div>
</template>

<script setup lang="ts">
import { isBrowser } from '~/utils/isBrowser.util'
import { useAuthStore } from '~/store/useAuthStore';

const brand = 'RFAD SE'
const title = `${brand} Mods`
const themeColorBrowser = '#0D0C0A'
const themeColorServer = '#0D0C0A'

const themeColor = computed(() => {
  return isBrowser() ? themeColorBrowser : themeColorServer
})

onMounted(async () => {
  await useAuthStore().authenticateUser(false)

  if (useAuthStore().authenticated && (!(useAuthStore().getLastUpdate) || !useAuthStore().getUser))
    await useAuthStore().authenticateUser(true)

  if (useAuthStore().getLastUpdate!.getTime() + 1000 * 60 * 60 * 24 < new Date().getTime())
    await useAuthStore().authenticateUser(true)

})
</script>


<style scoped>
@media (prefers-reduced-motion: reduce) {
  .transition-page-enter-active,
  .transition-page-leave-active {
    transition: none;
  }
  .transition-page-enter-from,
  .transition-page-leave-to {
    opacity: 1;
    transform: none;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .transition-page-enter-active,
  .transition-page-leave-active {
    transition: 0.25s;
    transform-origin: center 96px;
  }
  .transition-page-leave-active {
    position: relative;
  }
  .transition-page-enter-from {
    opacity: 0;
    transform: scale(0.99);
  }
  .transition-page-leave-to {
    opacity: 0;
  }
}
</style>
