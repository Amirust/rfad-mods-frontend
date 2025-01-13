<script setup lang="ts">

import StageStepper from '~/components/create/StageStepper.vue';
import CustomInput from '~/components/base/CustomInput.vue';
import Button from '~/components/base/Button.vue';
import { useCreateModStore } from '~/store/useCreateModStore';
import { Limits } from '~/types/limits.enum';
import type { AdditionalLink } from '~/types/api/mods.types';
import { useModsApi } from '~/composables/useModsApi';
import resolveCDNImage from '~/utils/resolveCDNImage';
import { useAuthStore } from '~/store/useAuthStore';
import type { ModTags } from '~/types/mod-tags.enum';

const createModStore = useCreateModStore()
const router = useRouter()

const downloadLink = ref('')
const links = ref<AdditionalLink[]>([])

const isDownloadLinkValid = computed(() => downloadLink.value ? !linkValidator(downloadLink.value) : false)
const isAddLinksValid = computed(() => links.value.every(link => !linkValidator(link.url) && !nameValidator(link.name)))

const isButtonActive = computed(() => {
  return isDownloadLinkValid.value && isAddLinksValid.value
})

const isLoading = ref(false)

const go = async () => {
  if (!isButtonActive.value && useAuthStore().getUser?.id) return

  isLoading.value = true

  createModStore.setDownloadLink(downloadLink.value)
  createModStore.setAdditionalLinks(links.value)

  const images = []

  for await (const file of createModStore.getImages) {
    if (typeof file === 'string') {
      images.push(file)
      continue
    }

    const { hash } = await useFilesApi().uploadFile(file)
    images.push(resolveCDNImage(useAuthStore().getUser!.id, hash, false))
  }

  const data = await useModsApi().createMod({
    ...createModStore.getMod,
    tags: createModStore.getTags as ModTags[],
    images
  })

  useCreateModStore().drop()

  await router.push(`/mods/${data.id}`)
}

const linkValidator = (value: string) => {
  if (value.length < 3) return 'Название должно быть длиннее 3 символов'
  if (value.length > 100) return `Название должно быть короче ${Limits.ModNameMaxLength} символов`
  if (!value.match(/^(https?:\/\/)(?!\d{1,3}(\.\d{1,3}){3})([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(\/.*)?$/g)) return 'Некорректная ссылка'

  return null
}

const nameValidator = (value: string) => {
  if (value.length < 3) return 'Название должно быть длиннее 3 символов'
  if (value.length > 25) return `Название должно быть короче ${Limits.ModNameMaxLength} символов`

  return null
}

onMounted(() => {
  if (useCreateModStore().isDropped) return router.push('/create')

  if (createModStore.downloadLink) downloadLink.value = createModStore.getDownloadLink
  if (createModStore.additionalLinks) links.value = createModStore.getAdditionalLinks
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
          <StageStepper :active-step="4"/>
        </div>
        <div class="flex flex-col gap-9 w-full">
          <div class="flex flex-col ">
            <h4 class="text-xl font-light text-secondary">ШАГ 4</h4>
            <h3 class="text-3xl font-normal text-primary uppercase">Настроим ссылки</h3>
          </div>
          <div class="flex flex-col gap-7">
            <div class="flex flex-row gap-20 w-full">
              <div class="flex flex-col max-w-60 w-full gap-1">
                <h2 class="text-3xl font-light text-primary">Скачать</h2>
                <h5 class="text-base leading-tight font-light text-secondary">Введите сюда ссылку на скачивание вашего мода</h5>
              </div>
              <div class="w-full">
                <CustomInput name="modDownloadLink" v-model="downloadLink" class="w-full" :length-limit="100" :validator="linkValidator" placeholder="https://drive.google.com/..." />
              </div>
            </div>
            <div class="px-2.5">
              <hr class="border-secondary-25">
            </div>
            <div v-for="(link, index) in links" :key="index" class="flex flex-col gap-9">
              <div class="flex flex-col gap-3">
                <div class="flex flex-row gap-20 w-full">
                  <div class="flex flex-col max-w-60 w-full gap-1">
                    <h2 class="text-3xl font-light text-primary">Название</h2>
                    <h5 class="text-base leading-tight font-light text-secondary">Введите сюда название, которое опишет вашу ссылку</h5>
                  </div>
                  <div class="w-full">
                    <CustomInput :name="`addlink${index}name`" v-model="link.name" class="w-full" :length-limit="25" :validator="nameValidator" placeholder="Дополнительные материалы..." />
                  </div>
                </div>
                <div class="flex flex-row gap-20 w-full">
                  <div class="flex flex-col max-w-60 w-full gap-1">
                    <h2 class="text-3xl font-light text-primary">Ссылка</h2>
                    <h5 class="text-base leading-tight font-light text-secondary">А сюда - саму ссылку</h5>
                  </div>
                  <div class="w-full">
                    <CustomInput :name="`addlink${index}url`" v-model="link.url" class="w-full" :length-limit="100" :validator="linkValidator" placeholder="https://drive.google.com/..." />
                  </div>
                </div>
                <Button class="w-fit" @click="links = links.filter((_, i) => i !== index)">Удалить</Button>
              </div>
              <div class="px-2.5">
                <hr class="border-secondary-25">
              </div>
            </div>
            <div class="w-full flex flex-row justify-start gap-7">
              <Button :disabled="links.length >= 3" class="min-w-fit" @click="links = [...links, { url: '', name: '' }]">Добавить ссылку</Button>
              <div class="w-full min-w-fit flex flex-row justify-end gap-7">
                <NuxtLink
                  to="/create/mods/step2">
                  <Button>Назад</Button>
                </NuxtLink>
                <Button class="min-w-fit flex flex-row gap-2 items-center" :disabled="!isButtonActive" @click="go">
                  Далее
                  <LucideLoader2 v-if="isLoading" class="w-5 h-5 text-primary animate-spin"/>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>