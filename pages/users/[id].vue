<script setup lang="ts">
import { ref, onMounted } from 'vue';
import PresetSmallSkeleton from '~/components/presets/PresetSmallSkeleton.vue';
import { useUsersApi } from '~/composables/useUsersApi';
import type { ModPresetType, PublicFullUser } from '~/types/api/users.types';
import PresetAndModSmallComponent from '~/components/user/PresetAndModSmallComponent.vue';
import ModTag from '~/components/base/ModTag.vue';

const router = useRouter();
const route = useRoute();

const id = route.params.id;

const user = ref<PublicFullUser | null>(null);
const mostPopularMod = ref<ModPresetType | null>(null);

const showSkeleton = ref(true);
const showSkeletonPages = ref(true);

const loadPage = async (pagesLoading: boolean = false) => {
  showSkeleton.value = true;
  showSkeletonPages.value = pagesLoading;

  user.value = await useUsersApi().getFullUser(id.toString()).catch(() => {
    router.push('/');
    throw new Error('User not found');
  });
  user.value!.mods = user.value.mods.map((mod) => {
    return {
      ...mod,
      author: {
        id: user.value!.id,
        username: user.value!.username,
        globalName: user.value!.globalName,
        avatarHash: user.value!.avatarHash
      }
    }
  });

  if (user.value?.mostPopularModId) {
    mostPopularMod.value = user.value.mods.find(e => e.id === user.value!.mostPopularModId)!;
  }

  // await waitUtil(1000);

  showSkeleton.value = false;
  showSkeletonPages.value = false;
};

onMounted(() => {
  loadPage();
});
</script>

<template>
  <div>
    <div class="mt-18 mb-10 flex flex-col xl:flex-row gap-x-24 gap-y-8 3xl:gap-28 xl:gap-20 relative">
      <transition name="fade">
        <template v-if="!showSkeleton && user">
          <div class="min-w-72 max-w-72 text-primary flex flex-col gap-5">
            <div class="flex flex-row gap-4 items-center">
              <img
                :src="resolveDiscordAvatarUtil(user.id, user.avatarHash)"
                alt="avatar"
                class="w-12 h-12 rounded-md"
              />
              <span class="text-primary uppercase text-3xl">
                {{ user.globalName }}
              </span>
            </div>
            <div class="flex flex-col gap-1">
              <h3 class="text-2xl font-medium text-secondary">Моды</h3>
              <div class="flex flex-row gap-1.5 items-center">
                <LucidePackage :size="20" :stroke-width="3"/>
                <span class="text-lg font-normal">{{ user.modsPublished }}</span>
              </div>
            </div>
            <div class="flex flex-col gap-1">
              <h3 class="text-2xl font-medium text-secondary">Последняя активность</h3>
              <div class="flex flex-row gap-1.5 items-center">
                <LucideClock :size="20" :stroke-width="3"/>
                <span v-if="user.lastActivity" class="text-lg font-normal">{{ new Date(user.lastActivity).toLocaleDateString('ru') }}</span>
                <span v-else class="text-lg font-normal">Никогда</span>
              </div>
            </div>
            <div class="flex flex-col gap-1">
              <h3 class="text-2xl font-medium text-secondary">Самый популярный мод</h3>
              <div class="flex flex-row gap-1.5 items-center">
                <div v-if="mostPopularMod" class="text-lg font-normal">
                  <span class="text-xl">{{ mostPopularMod.name }}</span>
                  <div class="flex flex-row gap-1.5 items-center">
                    <LucideDownloadCloud :size="20" :stroke-width="3"/>
                    <span>{{ mostPopularMod.downloads }}</span>
                  </div>
                </div>
                <span v-else class="text-lg font-normal">Нету</span>
              </div>
            </div>
            <div class="flex flex-col gap-1">
              <h3 class="text-2xl font-medium text-secondary">Любимые теги</h3>
              <div class="flex flex-row flex-wrap gap-1.5 items-center">
                <ModTag v-for="tag in resolveTags(user.mostUsedTags)" :key="tag">
                  {{ tag }}
                </ModTag>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <UserPanelSkeleton/>
        </template>
      </transition>
      <div class="w-full h-full flex flex-col gap-10 gap-y-6 mb-5">
        <h1 class="text-4xl text-primary font-light uppercase">Моды автора</h1>
        <template v-if="(user?.mods.length ?? 0) > 0">
          <div class="flex flex-wrap w-full gap-y-8 justify-between content-start h-full">
            <transition-group name="fade" mode="out-in">
              <template v-if="showSkeleton">
                <PresetSmallSkeleton class="w-full h-60 3xl:h-68 3xl:w-132 2xl:w-112 xl:w-96" v-for="i in 6" :key="i"/>
              </template>
              <template v-else>
                <PresetAndModSmallComponent
                  class="w-full h-60 3xl:h-68 3xl:w-132 2xl:w-112 xl:w-96"
                  v-for="i in user?.mods"
                  :key="i.id"
                  :url="`/${i.type === 'mod' ? 'mods' : 'presets'}/${i.id}`"
                  :mod="i"
                />
              </template>
            </transition-group>
          </div>
        </template>
        <template v-else>
          <div class="w-full h-full flex flex-col">
            <h1 class="text-4xl text-primary font-light">¯\_(ツ)_/¯</h1>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>