<script setup lang="ts">
import { onMounted, ref } from 'vue';
import PopularCategory from '~/components/index/PopularCategory.vue';
import PopularMod from '~/components/index/PopularMod.vue';
import { usePopularModsApi } from '~/composables/usePopularModsApi';

const popularMods = ref<{ modId: string, type: 'mod' | 'preset' }[]>([])

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

  if (element.firstElementChild)
    observer.observe(element.firstElementChild);

  if (element.lastElementChild)
    observer.observe(element.lastElementChild);

};

onMounted(async () => {
  observeScrollability('categories');

  popularMods.value = await usePopularModsApi().getPopular()

  await waitUtil(50);
  observeScrollability('mods');
});
</script>

<template>
  <div class="mt-18 mb-10 flex flex-col gap-12">
    <div class="flex flex-col gap-5">
      <h1 class="uppercase text-3xl text-secondary font-light">Популярные Категории</h1>
      <div class="hidden lg:flex flex-row gap-6 overflow-auto w-full relative">
        <ScrollButton
          :class="{
            'opacity-0': !categoriesScrollableToLeft
          }" direction="left" @click="scrollLeft('categories')" class="absolute left-0 z-10 scroll-button"/>
        <div
          id="categories" :class="{
            'fade-bought': categoriesScrollableToLeft && categoriesScrollableToRight,
            'fade-left': categoriesScrollableToLeft && !categoriesScrollableToRight,
            'fade-right': categoriesScrollableToRight && !categoriesScrollableToLeft,
          }" class="flex flex-row gap-6 overflow-auto scrollbar-hide w-full">
          <NuxtLink to="/mods">
            <PopularCategory
              title="ОПЦИОНАЛЬНЫЕ"
              description="Моды созданные разработчиками или сообществом но которые не вошли в основную сборку"
              image="https://rfad-images-test.rinisle.uk/images/965873006079524864_1c8ed7e470d6528a3bb7a01eaa994ddd.webp"
              class="grid-elem"
            />
          </NuxtLink>
          <NuxtLink to="/presets">
            <PopularCategory
              title="ПРЕСЕТЫ"
              description="Хотите модельную внешность у своего персонажа, но не умеете её создавать? Умельцы уже решили эту проблему!"
              image="https://rfad-images-test.rinisle.uk/images/965873006079524864_1c8ed7e470d6528a3bb7a01eaa994ddd.webp"
              class="grid-elem"
            />
          </NuxtLink>
          <NuxtLink to="/boosty">
            <PopularCategory
              title="Бусти"
              description="Эксклюзивные моды, которые доступны только подписчикам Бусти. Здесь вы сможете найти совершенно новые моды для сборки"
              image="https://rfad-images-test.rinisle.uk/images/965873006079524864_1c8ed7e470d6528a3bb7a01eaa994ddd.webp"
              class="grid-elem"
            />
          </NuxtLink>
        </div>
        <ScrollButton
          :class="{
            'opacity-0': !categoriesScrollableToRight
          }" direction="right" @click="scrollRight('categories')" class="absolute right-0 z-10 scroll-button"/>
      </div>

      <!-- Mobile -->
      <div class="flex lg:hidden flex-row gap-6 w-full relative">
        <div id="categories" class="flex flex-col gap-6 w-full">
          <NuxtLink to="/mods">
            <PopularCategory
              title="ОПЦИОНАЛЬНЫЕ"
              description="Моды созданные разработчиками или сообществом но которые не вошли в основную сборку"
              image="zodiac-screen.webp"
              class="grid-elem"
            />
          </NuxtLink>
          <NuxtLink to="/presets">
            <PopularCategory
              title="ПРЕСЕТЫ"
              description="Хотите модельную внешность у своего персонажа, но не умеете её создавать? Умельцы уже решили эту проблему!"
              image="zodiac-screen.webp"
              class="grid-elem"
            />
          </NuxtLink>
          <NuxtLink to="/boosty">
            <PopularCategory
              title="Бусти"
              description="Эксклюзивные моды, которые доступны только подписчикам Бусти. Здесь вы сможете найти совершенно новые моды для сборки"
              image="zodiac-screen.webp"
              class="grid-elem"
            />
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-5">
      <h1 class="uppercase text-3xl text-secondary font-light">Популярные Моды</h1>
      <div class="hidden lg:flex flex-row gap-6 overflow-auto w-full relative">
        <ScrollButton
          :class="{
            'opacity-0': !modsScrollableToLeft
          }" direction="left" @click="scrollLeft('mods')" class="absolute left-0 z-10 scroll-button"/>
        <div
          id="mods" :class="{
            'fade-bought': modsScrollableToLeft && modsScrollableToRight,
            'fade-left': modsScrollableToLeft && !modsScrollableToRight,
            'fade-right': modsScrollableToRight && !modsScrollableToLeft,
          }" class="flex flex-row gap-6 overflow-auto scrollbar-hide w-full">
          <PopularMod v-for="mod in popularMods" :id="mod.modId" :type="mod.type" :key="mod.modId" class="grid-elem"/>
        </div>
        <ScrollButton
          :class="{
            'opacity-0': !modsScrollableToRight
          }" direction="right" @click="scrollRight('mods')" class="absolute right-0 z-10 scroll-button"/>
      </div>

      <!-- Mobile -->
      <div class="flex lg:hidden flex-row gap-6 w-full relative">
        <div id="mods" class="flex flex-col gap-6 w-full">
          <PopularMod v-for="mod in popularMods" :id="mod.modId" :type="mod.type" :key="mod.modId" class="grid-elem"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'assets/css/global' as *;

.grid-elem {
  @apply lg:min-w-132 lg:max-w-132 lg:h-72 h-60 min-w-full max-w-full;
}

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