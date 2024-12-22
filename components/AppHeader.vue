<script setup lang="ts">

</script>

<template>
  <div class="pt-5 w-full flex flex-row">
    <NuxtLink class="text-primary text-4xl font-medium min-w-fit">RFAD SE</NuxtLink>
    <div class="flex flex-row w-full items-center justify-end gap-12">
      <NuxtLink class="text-secondary text-3xl font-light uppercase">Опциональные</NuxtLink>
      <NuxtLink class="text-secondary text-3xl font-light uppercase">Пресеты</NuxtLink>
      <NuxtLink class="text-secondary text-3xl font-light uppercase">Бусти</NuxtLink>
    </div>
    <div class="ml-6 text-secondary flex flex-row items-center gap-6">
      <div class="line"/>
      <div class="flex flex-row gap-2 items-center">
        <img alt="pfp" src="assets/images/amirust-pfp-test.webp" class="w-9 h-9 rounded-md">
        <NuxtLink class="text-secondary text-3xl font-light uppercase">Amirust</NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.line {
  border-left: 1px solid;
  @apply border-secondary h-7;
}
</style>