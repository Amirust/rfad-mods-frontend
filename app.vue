<template>
  <div>
    <Html lang="ru">
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
      <Body class="bg-black">
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

const brand = 'RFAD SE'
const title = `${brand} Mods`
const themeColorBrowser = '#0D0C0A'
const themeColorServer = '#0D0C0A'

const themeColor = computed(() => {
  return isBrowser() ? themeColorBrowser : themeColorServer
})
</script>

<style scoped></style>
