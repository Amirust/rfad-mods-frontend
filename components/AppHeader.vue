<script setup lang="ts">
import {useAuthStore} from '~/store/useAuthStore';

const user = computed(() => useAuthStore().user);
const img = useImage()
</script>

<template>
  <div class="pt-5 w-full flex flex-row">
    <NuxtLink to="/" class="text-primary text-4xl font-medium min-w-fit hover:text-secondary transition-colors">RFAD SE</NuxtLink>
    <div class="flex flex-row w-full items-center justify-end gap-12">
      <NuxtLink to="/mods" class="nuxt-link text-3xl font-light uppercase hover:text-primary transition-colors" active-class="active">Опциональные</NuxtLink>
      <NuxtLink class="nuxt-link text-3xl font-light uppercase hover:text-primary transition-colors" active-class="active">Пресеты</NuxtLink>
      <NuxtLink class="nuxt-link text-3xl font-light uppercase hover:text-primary transition-colors" active-class="active">Бусти</NuxtLink>
    </div>
    <div class="ml-6 text-secondary flex flex-row items-center gap-6 min-w-fit">
      <div class="line"/>
      <div class="relative">
        <transition name="fade">
          <template v-if="useAuthStore().authenticated && user">
            <div class="flex flex-row gap-2 items-center">
              <NuxtImg
                :src="resolveDiscordAvatarUtil(user.id, user.avatarHash)"
                class="w-9 h-9 rounded-md"
                :placeholder="img(resolveDiscordAvatarUtil(user.id, user.avatarHash, 32), { h: 36, w: 36, f: 'webp', blur: 5, q: 50 })"
              />
              <NuxtLink class="text-secondary text-3xl font-light uppercase">{{ user.globalName }}</NuxtLink>
            </div>
          </template>
          <template v-else>
            <NuxtLink to="/oauth2" class="text-secondary text-3xl font-light uppercase">Войти</NuxtLink>
          </template>
        </transition>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.line {
  border-left: 1px solid;
  @apply border-secondary h-7;
}

.active {
  @apply text-primary;
}

.nuxt-link:not(.active) {
  @apply text-secondary;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.fade-move {
  transition: transform 0.3s;
}
.fade-leave-active {
  position: absolute;
  top: 0;
  transform: translateY(0);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(0);
}
</style>