<script setup lang="ts">
import Skeleton from '~/components/base/Skeleton.vue';
</script>

<template>
  <div class="w-full h-10">
    <div class="flex flex-row gap-3 text-primary items-center font-medium">
      <LucideChevronLeft
        class="w-5 h-5 cursor-not-allowed pointer-events-none opacity-50"
      />
      <Skeleton v-for="i in 5" :key="i" class="page-button">
      </Skeleton>
      <LucideChevronRight
        class="w-5 h-5 cursor-not-allowed pointer-events-none opacity-50"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.page-button {
  @apply w-8 h-8 rounded-lg;
}
</style>