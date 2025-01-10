<script setup lang="ts">
import type { ModPresetType } from '~/types/api/users.types';

const props = defineProps<{
  mod: ModPresetType;
  url: string;
}>();
</script>

<template>
  <NuxtLink :to="props.url">
    <div class="w-full h-full max-h-80 relative rounded-md">
      <NuxtImg class="w-full h-full mask rounded-md" :src="mod.images[0] ?? 'isla-test.png'" placeholder/>
      <div class="absolute bottom-0 left-0">
        <div class="mx-3">
          <h1 class="text-3xl text-primary font-light mb-1">{{ props.mod.name }}</h1>
          <h3 class="text-base text-primary font-light overflow-ellipsis line-clamp-2 w-full leading-5">
            {{ props.mod.shortDescription }}
          </h3>
          <div class="flex flex-row text-secondary font-normal my-2 gap-6">
            <div class="flex flex-row gap-2 items-center">
              <LucideUserRound :stroke-width="3" :size="18"/> <span class="text-base text-center">{{
                props.mod.author.globalName
              }}</span>
            </div>
            <div class="flex flex-row gap-2 items-center">
              <LucideCloudDownload :stroke-width="3" :size="18"/> <span class="text-base text-center">{{
                props.mod.downloads
              }}</span>
            </div>
            <div class="flex flex-row gap-2 items-center">
              <LucideClock :stroke-width="3" :size="16"/> <span class="text-base text-center">{{
                new Date(props.mod.lastUpdate).toLocaleDateString('ru')
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped lang="scss">
.mask {
  mask-image: linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
  object-fit: cover;
}
</style>