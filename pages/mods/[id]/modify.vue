<script setup lang="ts">

import StageStepper from '~/components/create/StageStepper.vue';
import CustomInput from '~/components/base/CustomInput.vue';
import Button from '~/components/base/Button.vue';
import { useCreateModStore } from '~/store/useCreateModStore';
import { Limits } from '~/types/limits.enum';
import { ErrorCode } from '~/types/api/ErrorCode.enum';
import resolveModifyLinks from '~/utils/resolveModifyLinks';
import { useEditManager } from '~/store/useEditManager';
import TagsSelector from '~/components/base/ModsTagsSelector.vue';
import type { ModTags } from '~/types/mod-tags.enum';
import { useModsApi } from '~/composables/useModsApi';

const editStore = useCreateModStore()
const router = useRouter()
const route = useRoute()

const modId = route.params.id.toString()

const isNameValid = ref(false)
const isShortDescriptionValid = ref(false)
const selectedTags = ref<ModTags[]>([])
const isSelectedTagsValid = computed(() => selectedTags.value.length > 0)

const modName = ref('')
const modShortDescription = ref('')

const isButtonActive = computed(() => {
  return isNameValid.value && isShortDescriptionValid.value && isSelectedTagsValid.value
})

const baseUrl = computed(() => `/mods/${modId}`)

const isLoading = ref(false)

const go = () => {
  if (!isButtonActive.value) return

  editStore.setName(modName.value)
  editStore.setShortDescription(modShortDescription.value)
  editStore.setTags(selectedTags.value)

  isLoading.value = true

  useModsApi().modify(modId, {
    name: modName.value,
    shortDescription: modShortDescription.value,
    tags: selectedTags.value
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

  const data = await useModsApi().getModifyData(modId)
    .catch(e => {
      if (e.errorCode === ErrorCode.ModNotFound || e.errorCode === ErrorCode.ModNotOwned) {
        if (window.history.length > 1) router.back()
        else router.push('/mods')
      }
    })

  if (!data) return;

  editStore.loadFromData({
    type: 'mod',
    ...data,
    isDropped: false
  })

  useEditManager().setEditId(modId)

  if (editStore.name) modName.value = editStore.getName
  if (editStore.shortDescription) modShortDescription.value = editStore.getShortDescription
  if (editStore.tags) selectedTags.value = editStore.getTags as ModTags[]

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
          <StageStepper :links="resolveModifyLinks(modId, 'mods')" :is-modifying="true" :active-step="1"/>
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
                <h5 class="text-base leading-tight font-light text-secondary">Самое главное о вашем моде несколькими словами</h5>
              </div>
              <div class="w-full">
                <CustomInput name="modName" v-model="modName" class="w-full" :length-limit="Limits.ModNameMaxLength" :validator="nameValidator" placeholder="Введите название..." />
              </div>
            </div>
            <div class="flex flex-row gap-20 w-full">
              <div class="flex flex-col max-w-60 w-full gap-1">
                <h2 class="text-3xl font-light text-primary">Краткое описание</h2>
                <h5 class="text-base leading-tight font-light text-secondary">Завлеките людей этим описанием, оно отображается на странице со всеми модами</h5>
              </div>
              <div class="w-full">
                <CustomInput name="modShortDescription" v-model="modShortDescription"  class="w-full" :length-limit="Limits.ModShortDescriptionMaxLength" :validator="shortDescriptionValidator" placeholder="Введите краткое описание ..." />
              </div>
            </div>
            <div class="flex flex-row gap-20 w-full">
              <div class="flex flex-col max-w-60 w-full gap-1">
                <h2 class="text-3xl font-light text-primary">Теги</h2>
                <h5 class="text-base leading-tight font-light text-secondary">Сначала выберите категорию, остальные теги вы увидите после этого</h5>
              </div>
              <div class="w-full">
                <TagsSelector v-model="selectedTags"/>
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