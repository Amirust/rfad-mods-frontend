<script setup lang="ts">
import UserSmallInfo from '~/components/base/UserSmallInfo.vue';
import resolveMDUtil from '../../../utils/resolveMD.util';
import Button from '~/components/base/Button.vue';
import { ErrorCode } from '~/types/api/ErrorCode.enum';
import type { Preset } from '~/types/api/presets.types';
import ModTag from '~/components/base/ModTag.vue';
import PresetPageDescSkeleton from '~/components/presets/PresetPageDescSkeleton.vue';
import PresetPageInfoSkeleton from '~/components/presets/PresetPageInfoSkeleton.vue';
import ModImagesList from '~/components/base/ModImagesList.vue';

const route = useRoute();
const router = useRouter();
const id = route.params.id.toString();
const tagsCount = route.query.tagsCount ? +route.query.tagsCount : 3;
const racesCount = route.query.racesCount ? +route.query.racesCount : 1;

if (!id) router.back();

const isLoading = ref(true);

const preset = ref<Preset | null>(null);
const userCanModify = ref(false);

const resolvedTags = computed(() => preset.value ? resolvePresetsTagsUtil(preset.value.tags) : { race: [], other: [] });
const races = computed(() => resolvedTags.value.race);
const tags = computed(() => resolvedTags.value.other);

const loadPreset = async () => {
  isLoading.value = true;

  try {
    preset.value = await usePresetsApi().findOne(id);
  } catch (e: any) {
    console.log(e.errorCode);
    if (e?.errorCode === ErrorCode.ModNotFound) {
      if (window.history.length > 1) router.back();
      else return router.push('/presets');
    }
  }

  useHead({
    title: preset.value?.name
  })

  // await waitUtil(150);

  isLoading.value = false;
}

onMounted(async () => {
  await loadPreset();

  usePresetsApi().getModifyData(id).catch(e => {
    if (e.errorCode === ErrorCode.ModNotOwned)
      userCanModify.value = false;
    throw e;
  }).then(() => {
    userCanModify.value = true;
  });
});

onUnmounted(() => {
  useHead({
    title: null
  })
});
</script>

<template>
  <div class="mt-18 top-nav mb-10 flex flex-col gap-24 gap-y-10 3xl:gap-28 text-primary relative xl:gap-20 xl:flex-row">
    <transition name="fade">
      <template v-if="!isLoading && preset">
        <div class="min-w-72 max-w-72 text-primary flex flex-col gap-5">
          <h1 class="text-4xl font-medium">{{ preset.name }}</h1>
          <div class="flex flex-col gap-1">
            <h3 class="text-2xl font-medium text-secondary">Скачиванний</h3>
            <div class="flex flex-row gap-1.5 items-center">
              <LucideDownloadCloud :size="20" :stroke-width="3"/>
              <span class="text-lg font-normal">{{ preset.downloads }}</span>
            </div>
          </div>
          <div class="flex flex-col gap-1">
            <h3 class="text-2xl font-medium text-secondary">Последнее обновление</h3>
            <div class="flex flex-row gap-1.5 items-center">
              <LucideClock :size="20" :stroke-width="3"/>
              <span class="text-lg font-normal">{{ new Date(preset.lastUpdate).toLocaleDateString('ru') }}</span>
            </div>
          </div>
          <div class="flex flex-col gap-1">
            <h3 class="text-2xl font-medium text-secondary">Раса</h3>
            <div class="flex flex-row flex-wrap gap-1.5 items-center">
              <ModTag v-for="race in races" :key="race">
                {{ race }}
              </ModTag>
            </div>
          </div>
          <div class="flex flex-col gap-1">
            <h3 class="text-2xl font-medium text-secondary">Теги</h3>
            <div class="flex flex-row flex-wrap gap-1.5 items-center">
              <ModTag v-for="tag in tags" :key="tag">
                {{ tag }}
              </ModTag>
            </div>
          </div>
          <div class="flex flex-col gap-1.5">
            <h3 class="text-2xl font-medium text-secondary">Автор</h3>
            <UserSmallInfo :user="preset.author"/>
          </div>
        </div>
      </template>
      <template v-else>
        <PresetPageInfoSkeleton :tags="tagsCount" :races="racesCount"/>
      </template>
    </transition>
    <div class="relative">
      <transition name="fade">
        <template v-if="!isLoading && preset">
          <div class="w-full h-full flex flex-col gap-6">
            <ModImagesList v-if="preset.images.length" :images="preset.images"/>
            <div>
              <h3 class="text-2xl font-medium text-secondary">Описание</h3>
              <div v-html="resolveMDUtil(preset.description)" class="text-xl font-light whitespace-pre-wrap "></div>
            </div>
            <div>
              <h3 class="text-2xl font-medium text-secondary">Установка</h3>
              <div v-html="resolveMDUtil(preset.installGuide)" class="text-xl font-light"></div>
            </div>
            <div class="flex flex-row gap-x-6">
              <NuxtLink class="hidden xl:block" :to="`/presets/${preset.id}/modify`" v-if="userCanModify">
                <Button class="h-full items-center flex">
                  <LucideSettings/>
                </Button>
              </NuxtLink>
              <a :href="resolveDownloadModUrl(preset.id, 'presets')" target="_blank">
                <Button>Скачать</Button>
              </a>
              <NuxtLink v-for="m in preset.additionalLinks" :to="m.url" target="_blank">
                <Button >
                  {{ m.name }}
                </Button>
              </NuxtLink>
            </div>
          </div>
        </template>
        <template v-else>
          <PresetPageDescSkeleton/>
        </template>
      </transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>