<script setup lang="ts">
import AnimateHeight from 'vue-animate-height';

const collapsibleIsOpen = ref(false);

const toggleCollapse = () => {
  collapsibleIsOpen.value = !collapsibleIsOpen.value
}
</script>

<template>
  <div class="flex flex-col">
    <div class="w-full flex justify-between items-center cursor-pointer" @click="toggleCollapse">
      <span class="text-secondary font-medium text-xl">Фильтры</span>
      <LucideChevronDown
        class="text-secondary transition-transform"
        :size="18"
        :stroke-width="3"
        :class="{
          'transform rotate-180': collapsibleIsOpen
        }"
      />
    </div>
    <div class="relative">
      <AnimateHeight
        id='filter-collapsible'
        :duration="500"
        :height="collapsibleIsOpen ? 'auto' : 0"
      >
        <div class="flex flex-col gap-3 mt-2">
          <slot/>
        </div>
      </AnimateHeight>
    </div>
  </div>
</template>

<style scoped lang="scss">
.expand-enter-active,
.expand-leave-active {
  transition: height 0.3s ease;
  overflow: hidden;
}
</style>