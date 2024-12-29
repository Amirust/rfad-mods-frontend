<script setup lang="ts">
import { computed } from 'vue';

const inputModels = [ ref(''), ref('') ]

const props = defineProps<{
  pages: number
  currentPage: number
}>()

const emit = defineEmits<{
  (e: 'update:page', page: number): void
}>()

const changePage = (page: number | string) => {
  if (+page > props.pages) page = props.pages
  inputModels.map((model) => model.value = '')
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

const displayedPages = computed(() => calculatePaginationPages(props.currentPage, props.pages));

const calculatePaginationPages = (currentPage: number, totalPages: number) => {
  const pages = []

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  } else {
    if (currentPage <= 3) {
      for (let i = 1; i <= 3; i++) {
        pages.push(i)
      }

      pages.push(-1)
      pages.push(totalPages)
    } else if (currentPage >= totalPages - 2) {
      pages.push(1)
      pages.push(-1)

      for (let i = totalPages - 2; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(...[ 1, -1, currentPage, -1, totalPages ])
    }
  }

  return pages
}

const getInputModel = (index: number) => {
  return index === 1 ? 0 : 1
}
</script>

<template>
  <div class="w-fit h-10">
    <div class="flex flex-row gap-3 text-primary items-center font-medium">
      <LucideChevronLeft
        class="w-5 h-5"
        :class="{
          'cursor-not-allowed pointer-events-none opacity-50': props.currentPage === 1
        }"
        @click="decrementPage"
      />
      <div class="flex flex-row gap-3 items-center text-primary font-medium">
        <template v-for="(page, i) in displayedPages">
          <template v-if="page === -1">
            <input
              :key="i"
              class="page-button bg-secondaryHalf text-primary placeholder-primary text-center outline-none focus:outline-none"
              :max="props.pages"
              min="1"
              placeholder="..."
              v-model="inputModels[getInputModel(i)].value"
              @keydown.enter="changePage(inputModels[getInputModel(i)].value)"
              @focusout="inputModels[getInputModel(i)].value = ''"
            >
          </template>
          <template v-else>
            <div
              :key="i"
              @click="changePage(page)"
              :class="{
                'bg-primary text-black': page === props.currentPage,
                'bg-secondaryHalf text-primary': page !== props.currentPage
              }"
              class="page-button cursor-pointer text-center items-center flex justify-center"
            >{{ page }}</div>
          </template>
        </template>
      </div>
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