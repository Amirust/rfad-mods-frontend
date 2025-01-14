<script setup lang="ts">
import type { PublicPartialUser } from '~/types/api/users.types';
import { useModsApi } from '~/composables/useModsApi';
import { usePresetsApi } from '~/composables/usePresetsApi';
import Skeleton from '~/components/base/Skeleton.vue';

interface RequiredValues {
  id: string,
  name: string,
  shortDescription: string,
  images: string[],
  author: PublicPartialUser,
  downloads: number,
  lastUpdate: Date,
}

const props = defineProps<{
  id: string,
  type: 'mod' | 'preset',
}>()

const mod = ref<RequiredValues | null>(null)
const url = computed(() => `/${props.type === 'mod' ? 'mods' : 'presets'}/${props.id}`)

const loadPage = async () => {
  mod.value = props.type === 'mod' ? await useModsApi().findOne(props.id) : await usePresetsApi().findOne(props.id)
}

onMounted(async () => {
  await loadPage()
})
</script>

<template>
  <div class="relative">
    <transition name="fade">
      <NuxtLink :to="url" v-if="mod" class="h-full w-full">
        <NuxtImg class="w-full h-full mask" :src="mod.images[0]" placeholder/>
        <div class="absolute bottom-0 left-0">
          <div class="mx-3">
            <h1 class="text-3xl text-primary font-light mb-1">{{mod.name}}</h1>
            <h3 class="text-base text-primary font-light overflow-ellipsis line-clamp-2 w-full leading-5">
              {{mod.shortDescription}}
            </h3>
            <div class="flex flex-row text-secondary font-normal my-2 gap-6">
              <div class="flex flex-row gap-2 items-center">
                <LucideUserRound :stroke-width="3" :size="18"/> <span class="text-base text-center">{{ mod.author.globalName }}</span>
              </div>
              <div class="flex flex-row gap-2 items-center">
                <LucideCloudDownload :stroke-width="3" :size="18"/> <span class="text-base text-center">{{ mod.downloads }}</span>
              </div>
              <div class="flex flex-row gap-2 items-center">
                <LucideClock :stroke-width="3" :size="16"/> <span class="text-base text-center">{{ new Date(mod.lastUpdate).toLocaleDateString('ru') }}</span>
              </div>
            </div>
          </div>
        </div>
      </NuxtLink>
      <div v-else class="h-full w-full">
        <Skeleton class="w-full h-full"/>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.mask {
  mask-image: linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
  object-fit: cover;
}
</style>