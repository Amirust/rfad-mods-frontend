<script setup lang="ts">
import Skeleton from '~/components/base/Skeleton.vue';

const props = defineProps<{
  races: number,
  tags: number
}>()
</script>

<template>
  <div>
    <div class="w-72 h-full text-primary flex flex-col gap-5">
      <div class="w-full h-10"><Skeleton/></div>
      <div class="flex flex-col gap-1">
        <h3 class="text-2xl font-medium text-secondary">Скачиванний</h3>
        <div class="flex flex-row gap-1.5 items-center">
          <!--          <LucideDownloadCloud :size="20" :stroke-width="3"/>-->
          <div class="w-full h-7"><Skeleton/></div>
        </div>
      </div>
      <div class="flex flex-col gap-1">
        <h3 class="text-2xl font-medium text-secondary">Версия игры</h3>
        <div class="flex flex-row gap-1.5 items-center">
          <!--          <LucideHistory :size="20" :stroke-width="3"/>-->
          <div class="w-full h-7"><Skeleton/></div>
        </div>
      </div>
      <div class="flex flex-col gap-1">
        <h3 class="text-2xl font-medium text-secondary">Последнее обновление</h3>
        <div class="flex flex-row gap-1.5 items-center">
          <!--          <LucideClock :size="20" :stroke-width="3"/>-->
          <div class="w-full h-7"><Skeleton/></div>
        </div>
      </div>
      <div class="flex flex-col gap-1">
        <h3 class="text-2xl font-medium text-secondary">Раса</h3>
        <div class="flex flex-row flex-wrap gap-1.5 items-center">
          <div class="w-18 h-7" v-for="i in props.races" :key="i"><Skeleton/></div>
        </div>
      </div>
      <div class="flex flex-col gap-1">
        <h3 class="text-2xl font-medium text-secondary">Теги</h3>
        <div class="flex flex-row flex-wrap gap-1.5 items-center">
          <div class="w-18 h-7" v-for="i in props.tags" :key="i"><Skeleton/></div>
        </div>
      </div>
      <div class="flex flex-col gap-1.5">
        <h3 class="text-2xl font-medium text-secondary">Автор</h3>
        <div class="w-full h-9"><Skeleton/></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>