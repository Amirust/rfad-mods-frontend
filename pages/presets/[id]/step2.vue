<script setup lang="ts">

import StageStepper from '~/components/create/StageStepper.vue';
import Button from '~/components/base/Button.vue';
import { type FileType, useCreateModStore } from '~/store/useCreateModStore';
import { Limits } from '~/types/limits.enum';
import CustomTextarea from '~/components/base/CustomTextarea.vue';
import ImagesInput from '~/components/base/ImagesInput.vue';
import { useFilesApi } from '~/composables/useFilesApi';
import AnimateHeight from 'vue-animate-height';
import resolveModifyLinks from '~/utils/resolveModifyLinks';
import { usePresetsApi } from '~/composables/usePresetsApi';
import { ErrorCode } from '~/types/api/ErrorCode.enum';
import { useEditManager } from '~/store/useEditManager';

const editStore = useCreateModStore()
const router = useRouter()
const route = useRoute()

const modId = route.params.id.toString()

const isModDescriptionValid = ref(false)
const isModInstallGuideValid = ref(false)
const modImages = ref<FileType[]>([])
const isModImagesValid = computed(() => modImages.value.length > 0)

const descriptionFocused = ref(false)
const installGuideFocused = ref(false)

const filesQuota = ref(6)

const modDescription = ref('')
const modInstallGuide = ref('')

const isButtonActive = computed(() => {
  return isModDescriptionValid.value && isModInstallGuideValid.value && isModImagesValid.value
})

const baseUrl = computed(() => `/presets/${modId}`)

const isLoading = ref(false)

const saveAll = () => {
  editStore.setDescription(modDescription.value)
  editStore.setInstallGuide(modInstallGuide.value)
  editStore.setImages(modImages.value)
}

const go = async () => {
  if (!isButtonActive.value) return

  isLoading.value = true

  editStore.setDescription(modDescription.value)
  editStore.setInstallGuide(modInstallGuide.value)
  editStore.setImages(modImages.value)

  await editStore.uploadInfo(modId).then(() => {
    isLoading.value = false
    router.push(baseUrl.value)
  })
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
  if (useEditManager().getEditId !== modId)
    editStore.drop()

  const proof = await usePresetsApi().getModifyData(modId)
    .catch(e => {
      if (e.errorCode === ErrorCode.ModNotFound || e.errorCode === ErrorCode.ModNotOwned) {
        if (window.history.length > 1) router.back()
        else router.push('/presets')
      }
    })

  if (!proof) return;

  if (editStore.isDropped)
    editStore.loadFromData({
      type: 'preset',
      ...proof,
      isDropped: false
    })

  useEditManager().setEditId(modId)

  if (editStore.description) modDescription.value = editStore.getDescription
  if (editStore.installGuide) modInstallGuide.value = editStore.getInstallGuide
  if (editStore.images) modImages.value = editStore.getImages

  descriptionValidator(modDescription.value)
  installGuideValidator(modInstallGuide.value)

  const data = await useFilesApi().getQuota()
  filesQuota.value = data.remaining
})
</script>

<template>
  <div>
    <div class="mt-18 mb-10 flex flex-col gap-9">
      <h1 class="uppercase text-3xl text-secondary font-light">Изменение мода</h1>
      <div class="flex flex-row gap-14 align-baseline">
        <div class="flex flex-col gap-9 min-w-max">
          <div class="flex flex-col">
            <h3 class="text-3xl font-medium text-primary">Другие страницы?</h3>
            <h5 class="text-xl font-light text-secondary">Просто нажмите на категории внизу</h5>
          </div>
          <StageStepper @click="saveAll" :links="resolveModifyLinks(modId, 'presets')" :is-modifying="true" :active-step="2"/>
        </div>
        <div class="flex flex-col gap-9 w-full">
          <div class="flex flex-col ">
            <h4 class="text-xl font-light text-secondary">СТРАНИЦА 2</h4>
            <h3 class="text-3xl font-normal text-primary uppercase">Информация о моде</h3>
          </div>
          <div class="flex flex-col gap-7">
            <div class="flex flex-row gap-20 w-full">
              <div class="flex flex-col max-w-60 w-full gap-1">
                <h2 class="text-3xl font-light text-primary">Описание</h2>
                <h5 class="text-base leading-tight font-light text-secondary">
                  Расскажите людям всё о вашем пресете! Вы можете использовать разметку Markdown<br>
                  <NuxtLink class="text-primary" to="/markdown-guide">Гайд по разметке</NuxtLink>
                </h5>
              </div>
              <div class="w-full min-h-36">
                <CustomTextarea name="modName" v-model="modDescription" @update:focus="value => descriptionFocused = value" class="w-full" :length-limit="Limits.ModDescriptionMaxLength" :validator="descriptionValidator" placeholder="Это очень красивый пресет на норда который понравится каждому!" />
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
                  А теперь пошагово расскажите людям как ставить ваш пресет.<br>
                  <span class="text-primary">
                    Если в моде нужны доп. моды, укажите их на следующей странице
                  </span>
                </h5>
              </div>
              <div class="w-full min-h-28">
                <CustomTextarea name="modShortDescription" v-model="modInstallGuide" @update:focus="value => installGuideFocused = value" class="w-full" :length-limit="Limits.ModInstallGuideMaxLength" :validator="installGuideValidator" :placeholder="'1. Закинуть пресет в папку\n2. Прогнать бодислайд'" />
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
                <h5 class="text-base leading-tight font-light text-secondary">Одна или несколько картинок, как ваш присет выглядит!<br><span class="text-primary">Учите, самая первая картинка будет отображаться как превью пресета</span></h5>
              </div>
              <div class="w-full overflow-x-auto">
                <ImagesInput v-model="modImages" :remaining-files="filesQuota"/>
              </div>
            </div>
            <div class="w-full flex flex-row justify-end gap-7">
              <Button class="min-w-fit flex flex-row gap-2 items-center" :disabled="!isButtonActive" @click="go">
                Сохранить
                <LucideLoader2 v-if="isLoading" class="w-5 h-5 text-primary animate-spin"/>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>