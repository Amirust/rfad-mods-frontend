<script setup lang="ts">
import type { BoostyMod } from '~/types/api/boosty.types';
import resolveRequiredTierUtil from '~/utils/resolveRequiredTier.util';

const props = defineProps<{
  mod: BoostyMod;
}>();

const requiredTier = resolveRequiredTierUtil(props.mod.requiredTier);
</script>

<template>
  <template v-if="mod.accessible">
    <NuxtLink :to="`/boosty/${props.mod.id}?tagsCount=${props.mod.tags.length}`">
      <div class="w-full h-full max-h-80 relative rounded-md">
        <NuxtImg class="w-full h-full mask rounded-md" :src="mod.images[0].url" placeholder/>
        <div class="absolute bottom-0 left-0">
          <div class="mx-3">
            <h1 class="text-3xl text-primary font-light mb-1">{{ props.mod.name }}</h1>
            <h3 class="text-base text-primary font-light overflow-ellipsis line-clamp-2 w-full leading-5">
              {{ props.mod.shortDescription }}
            </h3>
            <div class="flex flex-row text-secondary font-normal my-2 gap-6">
              <div class="flex flex-row gap-2 items-center">
                <LucideUserRound :stroke-width="3" :size="18"/> <span class="text-base text-center">{{ props.mod.author.globalName }}</span>
              </div>
              <div class="flex flex-row gap-2 items-center">
                <LucideCloudDownload :stroke-width="3" :size="18"/> <span class="text-base text-center">{{ props.mod.downloads }}</span>
              </div>
              <div class="flex flex-row gap-2 items-center">
                <LucideClock :stroke-width="3" :size="16"/> <span class="text-base text-center">{{ new Date(props.mod.lastUpdate).toLocaleDateString('ru') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NuxtLink>
  </template>
  <template v-else>
    <div class="relative">
      <div class="w-full h-full max-h-80 relative rounded-md brightness-[25%]">
        <NuxtImg class="w-full h-full mask rounded-md" :src="mod.images[0]" placeholder/>
        <div class="absolute bottom-0 left-0">
          <div class="mx-3">
            <h1 class="text-3xl text-primary font-light mb-1">{{ props.mod.name }}</h1>
            <h3 class="text-base text-primary font-light overflow-ellipsis line-clamp-2 w-full leading-5">
              {{ props.mod.shortDescription }}
            </h3>
            <div class="flex flex-row text-secondary font-normal my-2 gap-6">
              <div class="flex flex-row gap-2 items-center">
                <LucideUserRound :stroke-width="3" :size="18"/> <span class="text-base text-center">{{ props.mod.author.globalName }}</span>
              </div>
              <div class="flex flex-row gap-2 items-center">
                <LucideCloudDownload :stroke-width="3" :size="18"/> <span class="text-base text-center">{{ props.mod.downloads }}</span>
              </div>
              <div class="flex flex-row gap-2 items-center">
                <LucideClock :stroke-width="3" :size="16"/> <span class="text-base text-center">{{ new Date(props.mod.lastUpdate).toLocaleDateString('ru') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="absolute top-0 left-0 w-full h-full flex flex-col gap-0 items-center justify-center text-center">
        <h3 class="text-lg text-secondary font-normal">Доступно с уровня</h3>
        <h1 class="text-3xl text-primary font-normal">
          {{ requiredTier }}
        </h1>
      </div>
    </div>
  </template>
</template>

<style scoped lang="scss">
.mask {
  mask-image: linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
  object-fit: cover;
}
</style>