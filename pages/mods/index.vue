<script setup lang="ts">
import { ref, onMounted } from 'vue';
import FilterSelector from '~/components/mods/ModsFilterSelector.vue';
import ModSmallComponent from '~/components/mods/ModSmallComponent.vue';
import ModSmallSkeleton from '~/components/mods/ModSmallSkeleton.vue';
import PageSelector from '~/components/page-selector/PageSelector.vue';
import SkeletonPageSelector from '~/components/page-selector/SkeletonPageSelector.vue';

const router = useRouter();
const route = useRoute();

const pages = ref(20);
const page = ref(1);

const cho = ref(2);
const showSkeleton = ref(true);
const showSkeletonPages = ref(true);

const active: Ref<number[]> = ref([ ...(route.query.tags ? `${route.query.tags}`.split(',').map(Number) : []) ]);

const updateTags = (value: number[]) => {
  active.value = value;
  router.replace({ query: { ...route.query, tags: active.value.join(',') } });
};

const changePage = (value: number) => {
  page.value = value;
  showSkeleton.value = true;
  setTimeout(() => {
    showSkeleton.value = false;
  }, 1000);
};

onMounted(() => {
  setTimeout(() => {
    showSkeleton.value = false;
    showSkeletonPages.value = false;
  }, 1000);
});
</script>

<template>
  <div>
    <div class="mt-24 mb-10 flex flex-row gap-14">
      <FilterSelector @active:update="updateTags" :active="active"/>
      <div class="w-full h-full flex flex-col gap-10 mb-5">
        <div class="flex flex-wrap w-full gap-y-8 justify-between content-start h-full">
          <transition-group name="fade" mode="out-in">
            <template v-if="showSkeleton">
              <ModSmallSkeleton class="h-80" v-for="i in cho" :key="i"/>
            </template>
            <template v-else>
              <ModSmallComponent class="h-80 w-fit" v-for="i in cho" :key="i"/>
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