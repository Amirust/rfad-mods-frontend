<script setup lang="ts">
const props = defineProps<{
  direction: 'left' | 'right';
}>();
</script>

<template>
  <button>
    <LucideChevronLeft v-if="props.direction === 'left'" class="w-10 h-10 text-primaryHalf"/>
    <LucideChevronRight v-else class="w-10 h-10 text-primaryHalf"/>
  </button>
</template>

<style scoped lang="scss">

</style>