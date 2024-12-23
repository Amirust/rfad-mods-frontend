<script setup lang="ts">
const props = defineProps<{
  direction: 'left' | 'right';
}>();
</script>

<template>
  <button class="bg-secondaryHalf rounded-full p-3">
    <LucideChevronLeft v-if="props.direction === 'left'" class="w-6 h-6 text-primary"/>
    <LucideChevronRight v-else class="w-6 h-6 text-primary"/>
  </button>
</template>

<style scoped lang="scss">

</style>