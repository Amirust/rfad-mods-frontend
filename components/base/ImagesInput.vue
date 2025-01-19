<script setup lang="ts">
import { LucideTrash } from 'lucide-vue-next';
import { Limits } from '~/types/limits.enum';

type FileType = {url: string | File, orientation: 'vertical' | 'horizontal'}

const props = defineProps<{
  remainingFiles: number
}>()

const selectedImages = defineModel<FileType[]>({
  required: true
})

const maxFiles = ref(Limits.MaxImagesPerMod)

const displayImages = computed(() => {
  return selectedImages.value.map((img) => {
    if (typeof img.url === 'string') return img.url
    return URL.createObjectURL(img.url)
  })
})

const canUpload = ref(true)

const upload = async (file: File) => {
  const img = new Image()
  const url = URL.createObjectURL(file)
  img.src = url

  if (file.size > 5 * 1024 * 1024) {
    alert('Размер файла превышает 5 МБ. Пожалуйста, выберите файл поменьше или сожмите текущий.');
    return;
  }

  const loadImage = () => {
    return new Promise<{ width: number, height: number }>((resolve, reject) => {
      img.onload = () => {
        resolve({ width: img.width, height: img.height })
        URL.revokeObjectURL(url)
      }
      img.onerror = reject
    })
  }

  try {
    const { width, height } = await loadImage()

    selectedImages.value.push({
      url: file,
      orientation: width > height ? 'horizontal' : 'vertical'
    })

    if (selectedImages.value.length >= Limits.MaxImagesPerMod || selectedImages.value.length >= maxFiles.value)
      canUpload.value = false
  } catch (error) {
    console.error(error)
  }
}

const removeImage = async (index: number) => {
  selectedImages.value.splice(index, 1)

  if (selectedImages.value.length < Limits.MaxImagesPerMod || selectedImages.value.length < maxFiles.value)
    canUpload.value = true
}

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
    const file = input.files[0]
    upload(file)
  }
}

const openFileDialog = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/png,image/jpeg,image/webp'
  input.onchange = handleFileChange
  input.click()
}

onMounted(async () => {
  if (selectedImages.value.length >= Limits.MaxImagesPerMod || selectedImages.value.length >= Math.min(Limits.MaxImagesPerMod, props.remainingFiles))
    canUpload.value = false
})
</script>

<template>
  <div class="flex flex-col flex-wrap xl:flex-row gap-4 w-full min-h-34">
    <div v-for="(img, index) in displayImages" :key="img" class="relative group w-full h-34 elem">
      <NuxtImg class="w-full h-full rounded-md object-cover" :src="img" placeholder />
      <button @click="removeImage(index)" class="absolute flex items-center justify-center top-0 right-0 bg-block p-2 rounded-bl-lg rounded-tr-[4px] opacity-0 group-hover:opacity-100 transition-opacity">
        <LucideTrash class="w-5 h-5 mb-[2px] ml-[2px] text-red-500"/>
      </button>
    </div>
    <div v-if="canUpload" class="w-full elem h-38 rounded-md bg-secondary-25 border-2 box-border border-secondary flex items-center justify-center" @click="openFileDialog">
      <LucidePlus class="w-10 h-10 text-primary"/>
    </div>
    <div v-if="!canUpload && !selectedImages.length" class="w-64 h-34 rounded-md bg-secondary-25 border-2 box-border border-secondary flex items-center flex-col gap-2 justify-center">
      <span class="text-primary text-base w-full text-center">
        К сожалению, вы превысили лимит загружаемых изображений
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}

.elem {
  max-width: 32%;
  @apply xl:max-w-[30%] 2xl:max-w-[31%] 3xl:max-w-[32%];
}
</style>