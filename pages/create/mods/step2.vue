<script setup lang="ts">

import StageStepper from '~/components/create/StageStepper.vue';
import Button from '~/components/base/Button.vue';
import { useCreateModStore } from '~/store/useCreateModStore';
import { Limits } from '~/types/limits.enum';
import CustomTextarea from '~/components/base/CustomTextarea.vue';
import ImagesInput from '~/components/base/ImagesInput.vue';
import { useFilesApi } from '~/composables/useFilesApi';
import AnimateHeight from 'vue-animate-height';

const createModStore = useCreateModStore()
const router = useRouter()

const isModDescriptionValid = ref(false)
const isModInstallGuideValid = ref(false)
const modImages = ref<(string | File)[]>([])
const isModImagesValid = computed(() => modImages.value.length > 0)

const descriptionFocused = ref(false)
const installGuideFocused = ref(false)

const filesQuota = ref(6)

const modDescription = ref('')
const modInstallGuide = ref('')

const isButtonActive = computed(() => {
  return isModDescriptionValid.value && isModInstallGuideValid.value && isModImagesValid.value
})

const go = () => {
  if (!isButtonActive.value) return

  createModStore.setDescription(modDescription.value)
  createModStore.setInstallGuide(modInstallGuide.value)
  createModStore.setImages(modImages.value)

  router.push('/create/mods/step3')
}

const descriptionValidator = (value: string) => {
  if (value.length < Limits.ModDescriptionMinLength) return 'Название должно быть длиннее 3 символов'
  if (value.length > Limits.ModDescriptionMaxLength) return `Название должно быть короче ${Limits.ModDescriptionMaxLength} символов`

  isModDescriptionValid.value = true
  return null
}

const installGuideValidator = (value: string) => {
  if (value.length < Limits.ModInstallGuideMinLength) return 'Описание должно быть длиннее 3 символов'
  if (value.length > Limits.ModInstallGuideMaxLength) return `Описание должно быть короче ${Limits.ModInstallGuideMaxLength} символов`

  isModInstallGuideValid.value = true
  return null
}

onMounted(async () => {
  if (useCreateModStore().isDropped) return router.push('/create')

  if (createModStore.description) modDescription.value = createModStore.getDescription
  if (createModStore.installGuide) modInstallGuide.value = createModStore.getInstallGuide
  if (createModStore.images) modImages.value = createModStore.getImages

  descriptionValidator(modDescription.value)
  installGuideValidator(modInstallGuide.value)

  const data = await  useFilesApi().getQuota()
  filesQuota.value = data.remaining
})
</script>

<template>
  <div>
    <div class="mt-18 mb-10 flex flex-col gap-9">
      <h1 class="uppercase text-3xl text-secondary font-light">Публикация мода</h1>
      <div class="flex flex-row gap-14 align-baseline">
        <div class="flex flex-col gap-9 min-w-max">
          <div class="flex flex-col">
            <h3 class="text-3xl font-medium text-primary">Как добавить мод?</h3>
            <h5 class="text-xl font-light text-secondary">Выполните эти 4 простых шага</h5>
          </div>
          <StageStepper :active-step="3"/>
        </div>
        <div class="flex flex-col gap-9 w-full">
          <div class="flex flex-col ">
            <h4 class="text-xl font-light text-secondary">ШАГ 3</h4>
            <h3 class="text-3xl font-normal text-primary uppercase">Информация о моде</h3>
          </div>
          <div class="flex flex-col gap-7">
            <div class="flex flex-row gap-20 w-full">
              <div class="flex flex-col max-w-60 w-full gap-1">
                <h2 class="text-3xl font-light text-primary">Описание</h2>
                <h5 class="text-base leading-tight font-light text-secondary">
                  Расскажите людям всё о вашем моде! Вы можете использовать разметку Markdown<br>
                  <NuxtLink class="text-primary" to="/markdown-guide">Гайд по разметке</NuxtLink>
                </h5>
              </div>
              <div class="w-full min-h-36">
                <CustomTextarea name="modName" v-model="modDescription" @update:focus="value => descriptionFocused = value" class="w-full" :length-limit="Limits.ModDescriptionMaxLength" :validator="descriptionValidator" placeholder="Этот мод изменяет много вещей которые были изначально не удобными в ванильном скайриме, например..." />
              </div>
            </div>
            <AnimateHeight
              :duration="300"
              :easing="'ease'"
              :height="descriptionFocused ? 'auto' : 0"
            >
              <div class="flex flex-row gap-20 w-full">
                <div class="flex flex-col max-w-60 w-full gap-1">
                  <h2 class="text-3xl font-light text-primary">Предпросмотр</h2>
                </div>
                <div v-html="resolveMDUtil(modDescription)" class="w-full min-h-28 text-primary font-light whitespace-pre-wrap"/>
              </div>
            </AnimateHeight>
            <div class="flex flex-row gap-20 w-full">
              <div class="flex flex-col max-w-60 w-full gap-1">
                <h2 class="text-3xl font-light text-primary">Установка</h2>
                <h5 class="text-base leading-tight font-light text-secondary">
                  А теперь пошагово расскажите людям как ставить ваш мод.<br>
                  Если в моде нужна ректификация, просто напишите это одним из пунктов
                </h5>
              </div>
              <div class="w-full min-h-28">
                <CustomTextarea name="modShortDescription" v-model="modInstallGuide" @update:focus="value => installGuideFocused = value" class="w-full" :length-limit="Limits.ModInstallGuideMaxLength" :validator="installGuideValidator" :placeholder="'1. Установите как обычный мод\n2. Ректификация не нужна'" />
              </div>
            </div>
            <AnimateHeight
              :duration="300"
              :easing="'ease'"
              :height="installGuideFocused ? 'auto' : 0"
            >
              <div class="flex flex-row gap-20 w-full">
                <div class="flex flex-col max-w-60 w-full gap-1">
                  <h2 class="text-3xl font-light text-primary">Предпросмотр</h2>
                </div>
                <div v-html="resolveMDUtil(modInstallGuide)" class="w-full min-h-28 text-primary font-light"/>
              </div>
            </AnimateHeight>
            <div class="flex flex-row gap-20 w-full">
              <div class="flex flex-col max-w-60 w-full gap-1">
                <h2 class="text-3xl font-light text-primary">Изображения</h2>
                <h5 class="text-base leading-tight font-light text-secondary">Одна или несколько картинок, которые описали бы ваш мод!<br><span class="text-primary">Учите, самая первая картинка будет отображаться как превью мода</span></h5>
              </div>
              <div class="w-full overflow-x-auto">
                <ImagesInput v-model="modImages" :remaining-files="filesQuota"/>
              </div>
            </div>
            <div class="w-full flex flex-row justify-end gap-7">
              <NuxtLink
                to="/create/mods/step1">
                <Button>Назад</Button>
              </NuxtLink>
              <Button :disabled="!isButtonActive" @click="go">Далее</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>