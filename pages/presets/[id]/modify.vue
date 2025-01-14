<script setup lang="ts">

import StageStepper from '~/components/create/StageStepper.vue';
import CustomInput from '~/components/base/CustomInput.vue';
import Button from '~/components/base/Button.vue';
import { useCreateModStore } from '~/store/useCreateModStore';
import { Limits } from '~/types/limits.enum';
import PresetsRaceSelector from '~/components/base/PresetsRaceSelector.vue';
import PresetsTagsSelector from '~/components/base/PresetsTagsSelector.vue';
import type { PresetTags } from '~/types/preset-tags.enum';
import { ErrorCode } from '~/types/api/ErrorCode.enum';
import { usePresetsApi } from '~/composables/usePresetsApi';
import resolveModifyLinks from '~/utils/resolveModifyLinks';
import { resolvePresetTagsRawResult } from '~/utils/resolvePresetsTags.util';
import { useEditManager } from '~/store/useEditManager';

const editStore = useCreateModStore()
const router = useRouter()
const route = useRoute()

const modId = route.params.id.toString()

const isNameValid = ref(false)
const isShortDescriptionValid = ref(false)
const selectedRace = ref<PresetTags[]>([])
const isSelectedRaceValid = computed(() => selectedRace.value.length > 0)
const selectedTags = ref<PresetTags[]>([])
const isSelectedTagsValid = computed(() => selectedTags.value.length > 0)

const modName = ref('')
const modShortDescription = ref('')

const isButtonActive = computed(() => {
  return isNameValid.value && isShortDescriptionValid.value && isSelectedRaceValid.value && isSelectedTagsValid.value
})

const baseUrl = computed(() => `/presets/${modId}`)

const isLoading = ref(false)

const saveAll = () => {
  editStore.setName(modName.value)
  editStore.setShortDescription(modShortDescription.value)
  editStore.setTags([ ...selectedRace.value, ...selectedTags.value ])
}

const go = () => {
  if (!isButtonActive.value) return

  editStore.setName(modName.value)
  editStore.setShortDescription(modShortDescription.value)
  editStore.setTags([ ...selectedRace.value, ...selectedTags.value ])

  isLoading.value = true

  usePresetsApi().modify(modId, {
    name: modName.value,
    shortDescription: modShortDescription.value,
    tags: [ ...selectedRace.value, ...selectedTags.value ]
  }).then(() => {
    isLoading.value = false
    router.push(baseUrl.value)
  })
}

const nameValidator = (value: string) => {
  if (value.length < 3) return 'Название должно быть длиннее 3 символов'
  if (value.length > 25) return `Название должно быть короче ${Limits.ModNameMaxLength} символов`

  isNameValid.value = true
  return null
}

const shortDescriptionValidator = (value: string) => {
  if (value.length < 3) return 'Описание должно быть длиннее 3 символов'
  if (value.length > 50) return `Описание должно быть короче ${Limits.ModShortDescriptionMaxLength} символов`

  isShortDescriptionValid.value = true
  return null
}

onMounted(async () => {
  if (useEditManager().getEditId !== modId)
    editStore.drop()

  const data = await usePresetsApi().getModifyData(modId)
    .catch(e => {
      if (e.errorCode === ErrorCode.ModNotFound || e.errorCode === ErrorCode.ModNotOwned) {
        if (window.history.length > 1) router.back()
        else router.push('/presets')
      }
    })

  if (!data) return;

  if (editStore.isDropped)
    editStore.loadFromData({
      type: 'preset',
      ...data,
      isDropped: false
    })

  useEditManager().setEditId(modId)

  if (editStore.name) modName.value = editStore.getName
  if (editStore.shortDescription) modShortDescription.value = editStore.getShortDescription
  if (editStore.tags) {
    const { race, other } = resolvePresetTagsRawResult(editStore.tags as PresetTags[])
    selectedRace.value = race
    selectedTags.value = other
  }

  nameValidator(modName.value)
  shortDescriptionValidator(modShortDescription.value)
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
          <StageStepper @click="saveAll" :links="resolveModifyLinks(modId, 'presets')" :is-modifying="true" :active-step="1"/>
        </div>
        <div class="flex flex-col gap-9 w-full">
          <div class="flex flex-col ">
            <h4 class="text-xl font-light text-secondary">СТРАНИЦА 1</h4>
            <h3 class="text-3xl font-normal text-primary uppercase">Заполним оглавление</h3>
          </div>
          <div class="flex flex-col gap-7">
            <div class="flex flex-row gap-20 w-full">
              <div class="flex flex-col max-w-60 w-full gap-1">
                <h2 class="text-3xl font-light text-primary">Название</h2>
                <h5 class="text-base leading-tight font-light text-secondary">Самое главное о вашем пресете несколькими словами</h5>
              </div>
              <div class="w-full">
                <CustomInput name="modName" v-model="modName" class="w-full" :length-limit="Limits.ModNameMaxLength" :validator="nameValidator" placeholder="Введите название..." />
              </div>
            </div>
            <div class="flex flex-row gap-20 w-full">
              <div class="flex flex-col max-w-60 w-full gap-1">
                <h2 class="text-3xl font-light text-primary">Краткое описание</h2>
                <h5 class="text-base leading-tight font-light text-secondary">Завлеките людей этим описанием, оно отображается на странице со всеми пресетами</h5>
              </div>
              <div class="w-full">
                <CustomInput name="modShortDescription" v-model="modShortDescription"  class="w-full" :length-limit="Limits.ModShortDescriptionMaxLength" :validator="shortDescriptionValidator" placeholder="Введите краткое описание ..." />
              </div>
            </div>
            <div class="flex flex-row gap-20 w-full">
              <div class="flex flex-col max-w-60 min-w-60 w-full gap-1">
                <h2 class="text-3xl font-light text-primary">Раса</h2>
                <h5 class="text-base leading-tight font-light text-secondary">Выберите расу под которую был создан ваш пресет</h5>
              </div>
              <PresetsRaceSelector v-model="selectedRace" />
            </div>
            <div class="flex flex-row gap-20 w-full">
              <div class="flex flex-col max-w-60 w-full gap-1">
                <h2 class="text-3xl font-light text-primary">Теги</h2>
                <h5 class="text-base leading-tight font-light text-secondary">Выберите расу под которую был создан ваш пресет</h5>
              </div>
              <div class="w-full">
                <PresetsTagsSelector v-model="selectedTags" />
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