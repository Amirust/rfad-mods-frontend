<script setup lang="ts">
import type { Mod } from '~/types/api/mods.types';
import resolveModTagsUtil from '../../../utils/resolveModTags.util';
import ModTag from '~/components/base/ModTag.vue';
import UserSmallInfo from '~/components/base/UserSmallInfo.vue';
import ModPageInfoSkeleton from '~/components/mods/ModPageInfoSkeleton.vue';
import resolveMDUtil from '../../../utils/resolveMD.util';
import Button from '~/components/base/Button.vue';
import ModPageDescSkeleton from '~/components/mods/ModPageDescSkeleton.vue';
import { ErrorCode } from '~/types/api/ErrorCode.enum';
import { useBoostyApi } from '~/composables/useBoostyApi';

const route = useRoute();
const router = useRouter();
const id = route.params.id.toString();
const tagsCount = route.query.tagsCount ? +route.query.tagsCount : 3;

if (!id) router.back();

const isLoading = ref(true);
const userCanModify = ref(false);

const mod = ref<Mod | null>(null);

const loadMod = async () => {
  isLoading.value = true;

  try {
    mod.value = await useBoostyApi().findOne(id);
  } catch (e: any) {
    if (e?.errorCode === ErrorCode.ModNotFound) {
      if (window.history.length > 1) router.back();
      else return router.push('/boosty');
    } else if (e?.errorCode === ErrorCode.UserHasNoBoostyAccess) {
      return router.push('/boosty');
    }
  }

  // await waitUtil(150);

  isLoading.value = false;
}

onMounted(async () => {
  await loadMod();

  useBoostyApi().getModifyData(id).catch(e => {
    if (e.errorCode === ErrorCode.ModNotOwned)
      userCanModify.value = false;
    throw e;
  }).then(() => {
    userCanModify.value = true;
  });
});
</script>

<template>
  <div class="mt-18 top-nav mb-10 flex flex-col gap-24 gap-y-10 3xl:gap-28 text-primary relative xl:gap-20 xl:flex-row">
    <transition name="fade">
      <template v-if="!isLoading && mod">
        <div class="min-w-72 max-w-72 text-primary flex flex-col gap-5">
          <h1 class="text-4xl font-medium">{{ mod.name }}</h1>
          <div class="flex flex-col gap-1">
            <h3 class="text-2xl font-medium text-secondary">Скачиванний</h3>
            <div class="flex flex-row gap-1.5 items-center">
              <LucideDownloadCloud :size="20" :stroke-width="3"/>
              <span class="text-lg font-normal">{{ mod.downloads }}</span>
            </div>
          </div>
          <div class="flex flex-col gap-1">
            <h3 class="text-2xl font-medium text-secondary">Последнее обновление</h3>
            <div class="flex flex-row gap-1.5 items-center">
              <LucideClock :size="20" :stroke-width="3"/>
              <span class="text-lg font-normal">{{ new Date(mod.lastUpdate).toLocaleDateString('ru') }}</span>
            </div>
          </div>
          <div class="flex flex-col gap-1">
            <h3 class="text-2xl font-medium text-secondary">Теги</h3>
            <div class="flex flex-row flex-wrap gap-1.5 items-center">
              <ModTag v-for="tag in resolveModTagsUtil(mod.tags)" :key="tag">
                {{ tag }}
              </ModTag>
            </div>
          </div>
          <div class="flex flex-col gap-1.5">
            <h3 class="text-2xl font-medium text-secondary">Автор</h3>
            <UserSmallInfo :user="mod.author"/>
          </div>
        </div>
      </template>
      <template v-else>
        <ModPageInfoSkeleton :tags="tagsCount"/>
      </template>
    </transition>
    <div class="relative">
      <transition name="fade">
        <template v-if="!isLoading && mod">
          <div class="w-full h-full flex flex-col gap-6">
            <div v-if="mod.images.length" class="flex flex-col flex-wrap xl:flex-row gap-4">
              <NuxtImg class="w-full xl:w-72 xl:h-40 rounded-md object-cover" v-for="img in mod.images" :key="img" :src="img" placeholder />
            </div>
            <div>
              <h3 class="text-2xl font-medium text-secondary">Описание</h3>
              <div v-html="resolveMDUtil(mod.description)" class="text-xl font-light whitespace-pre-wrap "></div>
            </div>
            <div>
              <h3 class="text-2xl font-medium text-secondary">Установка</h3>
              <div v-html="resolveMDUtil(mod.installGuide)" class="text-xl font-light"></div>
            </div>
            <div class="flex flex-row gap-x-6">
              <NuxtLink :to="`/boosty/${mod.id}/modify`" v-if="userCanModify">
                <Button class="h-full items-center flex">
                  <LucideSettings/>
                </Button>
              </NuxtLink>
              <a :href="resolveDownloadModUrl(mod.id)" target="_blank">
                <Button>Скачать</Button>
              </a>
              <NuxtLink class="hidden xl:block" v-for="m in mod.additionalLinks" :to="m.url" target="_blank">
                <Button >
                  {{ m.name }}
                </Button>
              </NuxtLink>
            </div>
          </div>
        </template>
        <template v-else>
          <ModPageDescSkeleton/>
        </template>
      </transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>