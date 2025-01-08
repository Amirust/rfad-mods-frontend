<script setup lang="ts">
import { ref, onMounted } from 'vue';
import FilterSelector from '~/components/mods/ModsFilterSelector.vue';
import ModSmallSkeleton from '~/components/mods/ModSmallSkeleton.vue';
import PageSelector from '~/components/page-selector/PageSelector.vue';
import SkeletonPageSelector from '~/components/page-selector/SkeletonPageSelector.vue';
import type { FindResult } from '~/types/api/boosty.types';
import waitUtil from '~/utils/wait.util';
import { ErrorCode } from '~/types/api/ErrorCode.enum';
import Button from '~/components/base/Button.vue';

const router = useRouter();
const route = useRoute();

const boostyMods = ref<FindResult | null>(null);

const pages = computed(() => boostyMods.value?.totalPages ?? 1);
const page = ref(1);

const hasAccess = ref(true);

const showSkeleton = ref(true);
const showSkeletonPages = ref(true);

const activeTags: Ref<number[]> = ref([ ...(route.query.tags ? `${route.query.tags}`.split(',').map(Number) : []) ]);

const updateTags = (value: number[]) => {
  activeTags.value = value;
  router.replace({ query: { ...route.query, tags: activeTags.value.join(',') } });

  loadPage(true);
};

const loadPage = async (pagesLoading: boolean = false) => {
  showSkeleton.value = true;
  showSkeletonPages.value = pagesLoading;

  boostyMods.value = await useBoostyApi().findAll(activeTags.value, page.value, 6).catch(e => {
    if (e.errorCode === ErrorCode.UserHasNoBoostyAccess)
      hasAccess.value = false;

    throw e;
  });

  // await waitUtil(300);

  showSkeleton.value = false;
  showSkeletonPages.value = false;
};

const changePage = (value: number) => {
  page.value = value;

  loadPage();
};

onMounted(() => {
  loadPage();
});
</script>

<template>
  <div>
    <div v-if="hasAccess" class="mt-18 mb-10 flex flex-col xl:flex-row gap-x-24 gap-y-8 3xl:gap-28 xl:gap-20">
      <FilterSelector @active:update="updateTags" :active="activeTags"/>
      <div class="w-full h-full flex flex-col gap-10 mb-5">
        <template v-if="(boostyMods?.mods.length ?? 0) > 0">
          <div class="flex flex-wrap w-full gap-y-8 justify-between content-start h-full">
            <transition-group name="fade" mode="out-in">
              <template v-if="showSkeleton">
                <ModSmallSkeleton class="w-full h-60 3xl:h-68 3xl:w-132 2xl:w-112 xl:w-96" v-for="i in 6" :key="i"/>
              </template>
              <template v-else>
                <BoostySmallComponent class="w-full h-60 3xl:h-68 3xl:w-132 2xl:w-112 xl:w-96" v-for="i in boostyMods?.mods" :key="i.id" :mod="i"/>
              </template>
            </transition-group>
          </div>
          <transition-group name="fade" mode="out-in">
            <template v-if="showSkeletonPages">
              <SkeletonPageSelector/>
            </template>
            <template v-else>
              <PageSelector :pages="pages" :current-page="page" @update:page="changePage"/>
            </template>
          </transition-group>
        </template>
        <template v-else>
          <div class="w-full h-full flex flex-col items-center justify-center">
            <h1 class="text-4xl text-primary font-light">Ничего не найдено</h1>
          </div>
        </template>
      </div>
    </div>
    <div v-else class="flex flex-col items-center mt-48">
      <h1 class="text-primary text-3xl">Ой ой!</h1>
      <h3 class="text-secondary text-xl text-center">Похоже что у вас нету доступа к Boosty!</h3>
      <h5 class="text-secondary mt-2 text-lg text-center font-light">Оформите любую подписку по ссылке ниже,<br>чтобы просматривать эту страницу</h5>

      <Button class="mt-12" @click="navigateTo(useRuntimeConfig().public.boostyUrl, { external: true })">Бусти</Button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.fade-move {
  transition: transform 0.3s;
}
.fade-leave-active {
  position: absolute;
  top: 0;
  transform: translateY(0);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(0);
}
</style>