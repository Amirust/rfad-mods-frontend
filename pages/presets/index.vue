<script setup lang="ts">
import { ref, onMounted } from 'vue';
import PageSelector from '~/components/page-selector/PageSelector.vue';
import SkeletonPageSelector from '~/components/page-selector/SkeletonPageSelector.vue';
import { usePresetsApi } from '~/composables/usePresetsApi';
import type { FindResult } from '~/types/api/presets.types';
import PresetFilterSelector from '~/components/presets/PresetFilterSelector.vue';
import PresetSmallSkeleton from '~/components/presets/PresetSmallSkeleton.vue';
import PresetSmallComponent from '~/components/presets/PresetSmallComponent.vue';

const router = useRouter();
const route = useRoute();

const presets = ref<FindResult | null>(null);

const pages = computed(() => presets.value?.totalPages ?? 1);
const page = ref(1);

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

  presets.value = await usePresetsApi().findAll(activeTags.value, page.value, 6);

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
    <div class="mt-18 mb-10 flex flex-col xl:flex-row gap-x-24 gap-y-8 3xl:gap-28 xl:gap-20">
      <PresetFilterSelector @active:update="updateTags" :active="activeTags"/>
      <div class="w-full h-full flex flex-col gap-10 mb-5">
        <template v-if="(presets?.mods.length ?? 0) > 0">
          <div class="flex flex-wrap w-full gap-y-8 justify-between content-start h-full">
            <transition-group name="fade" mode="out-in">
              <template v-if="showSkeleton">
                <PresetSmallSkeleton class="w-full h-60 3xl:h-68 3xl:w-132 2xl:w-112 xl:w-96" v-for="i in 6" :key="i"/>
              </template>
              <template v-else>
                <PresetSmallComponent class="w-full h-60 3xl:h-68 3xl:w-132 2xl:w-112 xl:w-96" v-for="i in presets?.mods" :key="i.id" :preset="i"/>
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