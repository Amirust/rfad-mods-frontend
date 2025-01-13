<script setup lang="ts">
import { useAuthStore } from '~/store/useAuthStore';
import HeaderUserDropdown from '~/components/HeaderUserDropdown.vue';
import AnimateHeight from 'vue-animate-height';

const user = computed(() => useAuthStore().user);
const img = useImage()

const isCollapsibleOpen = ref(false)

const toggleCollapsible = () => {
  isCollapsibleOpen.value = !isCollapsibleOpen.value
}
</script>

<template>
  <div class="w-full">
    <div class="pt-5 hidden xl:flex w-full flex-row">
      <NuxtLink to="/" class="text-primary text-3xl font-medium min-w-fit hover:text-secondary transition-colors">RFAD SE</NuxtLink>
      <div class="flex flex-row w-full items-center justify-end gap-12">
        <NuxtLink to="/mods" class="nuxt-link text-2xl font-light uppercase hover:text-primary transition-colors" active-class="active">Опциональные</NuxtLink>
        <NuxtLink to="/presets" class="nuxt-link text-2xl font-light uppercase hover:text-primary transition-colors" active-class="active">Пресеты</NuxtLink>
        <NuxtLink to="/boosty" class="nuxt-link text-2xl font-light uppercase hover:text-primary transition-colors" active-class="active">Бусти</NuxtLink>
      </div>
      <div class="ml-6 text-secondary flex flex-row items-center gap-6 min-w-fit">
        <div class="line"/>
        <div class="relative">
          <transition name="fade">
            <template v-if="useAuthStore().authenticated && user">
              <HeaderUserDropdown :user-id="user.id">
                <template #trigger>
                  <div class="flex flex-row gap-2 items-center">
                    <NuxtImg
                      :src="resolveDiscordAvatarUtil(user.id, user.avatarHash)"
                      class="w-9 h-9 rounded-md"
                      :placeholder="img(resolveDiscordAvatarUtil(user.id, user.avatarHash, 32), { h: 36, w: 36, f: 'webp', blur: 5, q: 50 })"
                    />
                    <NuxtLink class="text-secondary text-2xl font-light uppercase transition-colors hover:text-primary">{{ user.globalName }}</NuxtLink>
                  </div>
                </template>
              </HeaderUserDropdown>
            </template>
            <template v-else>
              <NuxtLink to="/oauth2" class="text-secondary text-2xl font-light uppercase">Войти</NuxtLink>
            </template>
          </transition>
        </div>
      </div>
    </div>
    <div class="xl:hidden pt-5">
      <div class="flex flex-row xl:hidden items-center justify-between">
        <NuxtLink @click="isCollapsibleOpen = false" to="/" class="text-primary text-3xl font-medium min-w-fit hover:text-secondary transition-colors">RFAD SE</NuxtLink>
        <div class="flex flex-row items-center gap-6">
          <LucideMenu @click="toggleCollapsible" class="w-8 h-8 text-secondary"/>
        </div>
      </div>
      <AnimateHeight
        :duration="300"
        :easing="'ease'"
        :height="isCollapsibleOpen ? 'auto' : 0"
      >
        <div class="flex flex-col gap-2 mt-4">
          <NuxtLink @click="isCollapsibleOpen = false" to="/mods" class="nuxt-link text-2xl font-light uppercase hover:text-primary transition-colors" active-class="active">Опциональные</NuxtLink>
          <NuxtLink @click="isCollapsibleOpen = false" class="nuxt-link text-2xl font-light uppercase hover:text-primary transition-colors" active-class="active">Пресеты</NuxtLink>
          <NuxtLink @click="isCollapsibleOpen = false" class="nuxt-link text-2xl font-light uppercase hover:text-primary transition-colors" active-class="active">Бусти</NuxtLink>
          <div class="horiz-line"/>
          <div class="w-full flex flex-row items-center gap-6 mt-1">
            <transition name="fade">
              <template v-if="useAuthStore().authenticated && user">
                <NuxtLink @click="isCollapsibleOpen = false" :to="`/users/${user.id}`" class="w-full items-center flex flex-row justify-between">
                  <div class="flex flex-row gap-2 items-center">
                    <NuxtImg
                      :src="resolveDiscordAvatarUtil(user.id, user.avatarHash)"
                      class="w-9 h-9 rounded-md"
                      :placeholder="img(resolveDiscordAvatarUtil(user.id, user.avatarHash, 32), { h: 36, w: 36, f: 'webp', blur: 5, q: 50 })"
                    />
                    <NuxtLink class="text-secondary text-2xl font-light uppercase transition-colors hover:text-primary">{{ user.globalName }}</NuxtLink>
                  </div>
                </NuxtLink>
              </template>
              <template v-else>
                <NuxtLink to="/oauth2" class="text-secondary text-2xl font-light uppercase">Войти</NuxtLink>
              </template>
            </transition>
          </div>
        </div>
      </AnimateHeight>
    </div>
  </div>
</template>

<style scoped lang="scss">
.line {
  border-left: 1px solid;
  @apply border-secondary h-6;
}

.horiz-line {
  border-top: 1px solid;
  @apply border-secondary w-full;
}

.active {
  @apply text-primary;
}

.nuxt-link:not(.active) {
  @apply text-secondary;
}

</style>