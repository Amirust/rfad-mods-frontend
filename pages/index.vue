<script setup lang="ts">
import { onMounted, ref } from 'vue';
import PopularCategory from '~/components/index/PopularCategory.vue';
import PopularMod from '~/components/index/PopularMod.vue';

const categoriesScrollableToRight = ref(true);
const categoriesScrollableToLeft = ref(false);

const modsScrollableToRight = ref(true);
const modsScrollableToLeft = ref(false);

const scrollLeft = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollBy({ left: -200, behavior: 'smooth' });
  }
};

const scrollRight = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollBy({ left: 200, behavior: 'smooth' });
  }
};

const observeScrollability = (id: string) => {
  const element = document.getElementById(id);
  if (!element) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.target === element.firstElementChild) {
        if (id === 'categories') categoriesScrollableToLeft.value = !entry.isIntersecting;
        if (id === 'mods') modsScrollableToLeft.value = !entry.isIntersecting;
      }
      if (entry.target === element.lastElementChild) {
        if (id === 'categories') categoriesScrollableToRight.value = !entry.isIntersecting;
        if (id === 'mods') modsScrollableToRight.value = !entry.isIntersecting;
      }
    });
  }, { root: element, threshold: 0.9 });

  if (element.firstElementChild) {
    observer.observe(element.firstElementChild);
  }
  if (element.lastElementChild) {
    observer.observe(element.lastElementChild);
  }
};

onMounted(async () => {
  observeScrollability('categories');
  observeScrollability('mods');
});
</script>

<template>
  <div class="mt-24 mb-10 flex flex-col gap-12">
    <div class="flex flex-col gap-5">
      <h1 class="uppercase text-4xl text-primary font-light">Популярные Категории</h1>
      <div class="flex flex-row gap-6 overflow-auto w-full relative">
        <ScrollButton
          :class="{
            'opacity-0': !categoriesScrollableToLeft
          }" direction="left" @click="scrollLeft('categories')" class="absolute left-0 z-10 scroll-button"/>
        <div
          id="categories" :class="{
            'fade-bought': categoriesScrollableToLeft && categoriesScrollableToRight,
            'fade-left': categoriesScrollableToLeft && !categoriesScrollableToRight,
            'fade-right': categoriesScrollableToRight && !categoriesScrollableToLeft,
          }" class="flex flex-row gap-6 overflow-auto overflow-x-hidden w-full">
          <PopularCategory class="min-w-140 h-86"/>
          <PopularCategory class="min-w-140 h-86"/>
          <PopularCategory  class="min-w-140 h-86"/>
        </div>
        <ScrollButton
          :class="{
            'opacity-0': !categoriesScrollableToRight
          }" direction="right" @click="scrollRight('categories')" class="absolute right-0 z-10 scroll-button"/>
      </div>
    </div>
    <div class="flex flex-col gap-5">
      <h1 class="uppercase text-4xl text-primary font-light">Популярные Моды</h1>
      <div class="flex flex-row gap-6 overflow-auto w-full relative">
        <ScrollButton
          :class="{
            'opacity-0': !modsScrollableToLeft
          }" direction="left" @click="scrollLeft('mods')" class="absolute left-0 z-10 scroll-button"/>
        <div
          id="mods" :class="{
            'fade-bought': modsScrollableToLeft && modsScrollableToRight,
            'fade-left': modsScrollableToLeft && !modsScrollableToRight,
            'fade-right': modsScrollableToRight && !modsScrollableToLeft,
          }" class="flex flex-row gap-6 overflow-auto w-full overflow-x-hidden">
          <PopularMod class="min-w-140 h-86"/>
          <PopularMod class="min-w-140 h-86"/>
          <PopularMod class="min-w-140 h-86"/>
        </div>
        <ScrollButton
          :class="{
            'opacity-0': !modsScrollableToRight
          }" direction="right" @click="scrollRight('mods')" class="absolute right-0 z-10 scroll-button"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'assets/css/global' as *;

.scroll-button {
  top: 44%;
  transition: opacity 0.1s ease;
}

.fade-left {
  @include mask-image(90deg, 3rem, 14rem);
}

.fade-right {
  @include mask-image(270deg, 3rem, 14rem);
}

.fade-bought {
  mask-composite: intersect;
  mask-image: linear-gradient(90deg, transparent 0%, transparent 1rem, black 14rem), linear-gradient(270deg, transparent 0%, transparent 1rem, black 14rem);
}
</style>