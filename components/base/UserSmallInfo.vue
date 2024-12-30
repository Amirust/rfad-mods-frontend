<script setup lang="ts">
import type { PublicPartialUser } from '~/types/api/users.types';

const props = defineProps<{
  user: PublicPartialUser
}>()
</script>

<template>
  <NuxtLink :to="`/users/${props.user.id}`" class="flex flex-row w-fit gap-x-2.5 items-center">
    <NuxtImg class="w-9 h-9 rounded-lg" :src="resolveDiscordAvatarUtil(props.user.id, props.user.avatarHash)" placeholder/>
    <span class="text-primary text-2xl font-normal">{{ props.user.globalName }}</span>
  </NuxtLink>
</template>

<style scoped lang="scss">

</style>