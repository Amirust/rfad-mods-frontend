<script setup lang="ts">
import { ref, onMounted } from 'vue';
import FilterSelector from '~/components/mods/ModsFilterSelector.vue';
import ModSmallComponent from '~/components/mods/ModSmallComponent.vue';
import ModSmallSkeleton from '~/components/mods/ModSmallSkeleton.vue';
import PageSelector from '~/components/page-selector/PageSelector.vue';
import SkeletonPageSelector from '~/components/page-selector/SkeletonPageSelector.vue';
import type {FindResult} from '~/types/api/mods.types';
import {useModsApi} from '~/composables/useModsApi';
import waitUtil from '~/utils/wait.util';

const router = useRouter();
const route = useRoute();

const mods = ref<FindResult | null>(null);

const pages = computed(() => mods.value?.totalPages ?? 1);
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

  mods.value = await useModsApi().findAll(activeTags.value, page.value, 2);

  // await waitUtil(200);

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
    <div class="mt-24 mb-10 flex flex-row gap-14">
      <FilterSelector @active:update="updateTags" :active="activeTags"/>
      <div class="w-full h-full flex flex-col gap-10 mb-5">
        <template v-if="(mods?.mods.length ?? 0) > 0">
          <div class="flex flex-wrap w-full gap-y-8 justify-between content-start h-full">
            <transition-group name="fade" mode="out-in">
              <template v-if="showSkeleton">
                <ModSmallSkeleton class="h-80" v-for="i in 2" :key="i"/>
              </template>
              <template v-else>
                <ModSmallComponent class="h-80 w-fit" v-for="i in mods?.mods" :key="i.id" :mod="i"/>
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