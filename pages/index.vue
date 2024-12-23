<script setup lang="ts">
import { onMounted, ref } from 'vue';
import PopularCategory from '~/components/index/PopularCategory.vue';

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
  }, { root: element, threshold: 1.0 });

  if (element.firstElementChild) {
    observer.observe(element.firstElementChild);
  }
  if (element.lastElementChild) {
    observer.observe(element.lastElementChild);
  }
};

const howMuchPixelsHidden = (id: string) => {
  const element = document.getElementById(id);
  const last = document.getElementById('bebra');
  if (!element) {
    return
  }
  hidden.value = element.scrollWidth - element.clientWidth - element.scrollLeft;
  lastWidth.value = last?.clientWidth || 0;
}

const hidden = ref(0);
const lastWidth = ref(0);

onMounted(async () => {
  howMuchPixelsHidden('categories');

  observeScrollability('categories');
  observeScrollability('mods');

  setInterval(() => {
    howMuchPixelsHidden('categories');
  }, 1);
});
</script>

<template>
  <div class="mt-24 flex flex-col gap-12">
    <div class="flex flex-col gap-5">
      <button class="text-primary" @click="howMuchPixelsHidden('categories')">bebra</button>
      <h1 class="uppercase text-4xl text-primary font-light">Популярные Категории {{ hidden }}px / {{lastWidth}}px</h1>
      <div class="flex flex-row gap-6 overflow-auto w-full relative">
        <ScrollButton
          :class="{
            'opacity-0': !categoriesScrollableToLeft
          }" direction="left" @click="scrollLeft('categories')" class="absolute left-0 z-10 scrollButton"/>
        <div id="categories" class="flex flex-row gap-6 overflow-auto w-full overflow-x-hidden">
          <PopularCategory class="min-w-140 h-86 aboba"/>
          <PopularCategory class="min-w-140 h-86 aboba"/>
          <PopularCategory :style="`mask-size: ${lastWidth - hidden}px 100%`" id="bebra" class="min-w-140 h-86 aboba"/>
        </div>
        <ScrollButton
          :class="{
            'opacity-0': !categoriesScrollableToRight
          }" direction="right" @click="scrollRight('categories')" class="absolute right-0 z-10 scrollButton"/>
      </div>
    </div>
    <div class="flex flex-col gap-5">
      <h1 class="uppercase text-4xl text-primary font-light">Популярные Моды</h1>
      <div class="flex flex-row gap-6 overflow-auto w-full relative">
        <ScrollButton
          :class="{
            'opacity-0': !modsScrollableToLeft
          }" direction="left" @click="scrollLeft('mods')" class="absolute left-0 z-10 scrollButton"/>
        <div id="mods" class="flex flex-row gap-6 overflow-auto w-full overflow-x-hidden">
          <PopularCategory class="min-w-140 h-86"/>
          <PopularCategory class="min-w-140 h-86"/>
          <PopularCategory class="min-w-140 h-86"/>
        </div>
        <ScrollButton
          :class="{
            'opacity-0': !modsScrollableToRight
          }" direction="right" @click="scrollRight('mods')" class="absolute right-0 z-10 scrollButton"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.scrollButton {
  top: 44%;
  transition: opacity 0.1s ease;
  @apply mx-3
}

.aboba:last-child {
  mask-image: linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
}
</style>