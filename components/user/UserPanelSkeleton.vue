<script setup lang="ts">
import Skeleton from '~/components/base/Skeleton.vue';
</script>

<template>
  <div class="min-w-72 max-w-72 text-primary flex flex-col gap-5">
    <div class="flex flex-row gap-4 items-center">
      <div class="w-12 h-12"><Skeleton class="rounded-md"/></div>
      <div class="w-44 h-9">
        <Skeleton/>
      </div>
    </div>
    <div class="flex flex-col gap-1">
      <h3 class="text-2xl font-medium text-secondary">Моды</h3>
      <div class="flex flex-row gap-1.5 items-center">
        <div class="w-full h-7"><Skeleton/></div>
      </div>
    </div>
    <div class="flex flex-col gap-1">
      <h3 class="text-2xl font-medium text-secondary">Последняя активность</h3>
      <div class="flex flex-row gap-1.5 items-center">
        <div class="w-full h-7"><Skeleton/></div>
      </div>
    </div>
    <div class="flex flex-col gap-1">
      <h3 class="text-2xl font-medium text-secondary">Самый популярный мод</h3>
      <div class="flex flex-col justify-start gap-y-1">
        <div class="w-full h-7"><Skeleton/></div>
        <div class="flex flex-row gap-1.5 items-center">
          <div class="w-6 h-6"><Skeleton/></div>
          <div class="w-12 h-5"><Skeleton/></div>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-1">
      <h3 class="text-2xl font-medium text-secondary">Любимые теги</h3>
      <div class="flex flex-row flex-wrap gap-1.5 items-center">
        <div
          :class="{
            'w-18': i % 2 === 0,
            'w-24': i % 2 !== 0
          }" class="h-7" v-for="i in 5" :key="i"><Skeleton/></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>