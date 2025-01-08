<script setup lang="ts">

import StageStepper from '~/components/create/StageStepper.vue';
import PresetsCategory from '~/components/create/categories/PresetsCategory.vue';
import ModsCategory from '~/components/create/categories/ModsCategory.vue';
import { useCreateModStore } from '~/store/useCreateModStore';
import BoostyCategory from '~/components/create/categories/BoostyCategory.vue';
import { useCreateBoostyModStore } from '~/store/useCreateBoostyModStore';

const router = useRouter()
const useStore = useCreateModStore()

const userIsModerator = ref(false)

const goToMods = () => {
  useStore.setType('mod')
  useStore.isDropped = false

  router.push('/create/mods/step1')
}

const goToPresets = () => {
  useStore.setType('preset')
  useStore.isDropped = false

  router.push('/create/preset/step1')
}
const goToBoosty = () => {
  useCreateBoostyModStore().isDropped = false

  router.push('/create/boosty/step1')
}


onMounted(async () => {
  userIsModerator.value = await useAuthApi().isModerator()
})
</script>

<template>
  <div>
    <div class="mt-18 mb-10 flex flex-col gap-9">
      <h1 class="uppercase text-3xl text-secondary font-light">Публикация мода</h1>
      <div class="flex flex-row gap-14 align-baseline">
        <div class="flex flex-col gap-9">
          <div class="flex flex-col">
            <h3 class="text-3xl font-medium text-primary">Как добавить мод?</h3>
            <h5 class="text-xl font-light text-secondary">Выполните эти 4 простых шага</h5>
          </div>
          <StageStepper :active-step="1"/>
        </div>
        <div class="flex flex-col gap-9">
          <div class="flex flex-col ">
            <h4 class="text-xl font-light text-secondary">ШАГ 1</h4>
            <h3 class="text-3xl font-normal text-primary uppercase">Выберите Категорию</h3>
          </div>
          <div class="flex flex-row flex-wrap gap-7">
            <NuxtLink @click="goToMods" class="cursor-pointer">
              <ModsCategory class="w-100 h-60"/>
            </NuxtLink>
            <NuxtLink @click="goToPresets" class="cursor-pointer">
              <PresetsCategory class="w-100 h-60"/>
            </NuxtLink>
            <NuxtLink v-if="userIsModerator" @click="goToBoosty" class="cursor-pointer">
              <BoostyCategory class="w-100 h-60"/>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>