<script setup lang="ts">
import {useAuthStore} from '~/store/useAuthStore';

const user = computed(() => useAuthStore().user);
</script>

<template>
  <div class="pt-5 w-full flex flex-row">
    <NuxtLink to="/" class="text-primary text-4xl font-medium min-w-fit hover:text-secondary transition-colors">RFAD SE</NuxtLink>
    <div class="flex flex-row w-full items-center justify-end gap-12">
      <NuxtLink class="text-secondary text-3xl font-light uppercase">Опциональные</NuxtLink>
      <NuxtLink class="text-secondary text-3xl font-light uppercase">Пресеты</NuxtLink>
      <NuxtLink class="text-secondary text-3xl font-light uppercase">Бусти</NuxtLink>
    </div>
    <div class="ml-6 text-secondary flex flex-row items-center gap-6 min-w-fit">
      <div class="line"/>
      <transition name="fade">
        <template v-if="useAuthStore().authenticated && user">
          <div class="flex flex-row gap-2 items-center">
            <img alt="pfp" :src="resolveDiscordAvatarUtil(user.id, user.avatarHash)" class="w-9 h-9 rounded-md">
            <NuxtLink class="text-secondary text-3xl font-light uppercase">{{ user.globalName }}</NuxtLink>
          </div>
        </template>
        <template v-else>
          <NuxtLink to="/oauth2" class="text-secondary text-3xl font-light uppercase">Войти</NuxtLink>
        </template>
      </transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
.line {
  border-left: 1px solid;
  @apply border-secondary h-7;
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