<script setup lang="ts">
import Skeleton from '~/components/base/Skeleton.vue';
</script>

<template>
  <div class="w-full h-full flex flex-col gap-6">
    <div class="flex flex-row gap-x-4">
      <div class="w-72 h-40" v-for="img in 3" :key="img">
        <Skeleton class="rounded-md" />
      </div>
    </div>
    <div>
      <h3 class="text-2xl font-medium text-secondary">Описание</h3>
      <div class="w-144 h-52"><Skeleton /></div>
    </div>
    <div>
      <h3 class="text-2xl font-medium text-secondary">Установка</h3>
      <div class="w-144 h-24"><Skeleton /></div>
    </div>
    <div class="flex flex-row gap-x-6">
      <div class="w-36 h-10" v-for="i in 1" :key="i">
        <Skeleton />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>