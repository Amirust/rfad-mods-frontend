<script setup lang="ts">
import { computed } from 'vue';

const maxPages = 10;

const props = defineProps<{
  pages: number
  currentPage: number
}>()

const emit = defineEmits<{
  (e: 'update:page', page: number): void
}>()

const changePage = (page: number | string) => {
  emit('update:page', +page)
}

const decrementPage = () => {
  if (props.currentPage > 1)
    emit('update:page', props.currentPage - 1)
}

const incrementPage = () => {
  if (props.currentPage < props.pages)
    emit('update:page', props.currentPage + 1)
}

const displayedPages = computed(() => {
  const total = props.pages;
  const current = props.currentPage;
  const pages = [];

  if (total <= maxPages) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    if (current <= 5) {
      for (let i = 1; i <= 7; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(total);
    } else if (current > total - 5) {
      pages.push(1);
      pages.push('...');
      for (let i = total - 6; i <= total; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push('...');
      for (let i = current - 2; i <= current + 2; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(total);
    }
  }

  return pages;
});
</script>

<template>
  <div class="w-full h-10">
    <div class="flex flex-row gap-5 text-primary items-center font-medium">
      <LucideChevronLeft
        class="w-5 h-5"
        :class="{
          'cursor-not-allowed pointer-events-none opacity-50': props.currentPage === 1
        }"
        @click="decrementPage"
      />
      <div
        class="page-button flex items-center text-center justify-center transition-colors"
        v-for="page in displayedPages"
        :key="page"
        :class="{
          'bg-primary text-black': page === props.currentPage,
          'bg-secondaryHalf': page !== props.currentPage,
          'cursor-pointer': page !== '...',
          'cursor-default': page === '...'
        }"
        @click="page !== '...' && changePage(page)"
      >{{ page }}</div>
      <LucideChevronRight
        class="w-5 h-5"
        :class="{
          'cursor-not-allowed pointer-events-none opacity-50': props.currentPage === props.pages
        }"
        @click="incrementPage"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.page-button {
  @apply w-8 h-8 rounded-lg border-2 border-primary;
}
</style>