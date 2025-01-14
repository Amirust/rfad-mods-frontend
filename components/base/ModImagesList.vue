<script setup lang="ts">
import { ref, onMounted } from 'vue';

const props = defineProps<{
  images: string[]
}>();

const imageStyles = ref<{ [key: string]: string }>({});

const checkImageOrientation = (img: string) => {
  return new Promise<{ src: string; orientation: 'portrait' | 'landscape' }>((resolve) => {
    const image = new Image();
    image.onload = () => {
      const orientation = image.naturalWidth > image.naturalHeight ? 'landscape' : 'portrait';
      resolve({ src: img, orientation });
    };
    image.src = img;
  });
};

const loadImageStyles = async () => {
  for (const img of props.images) {
    const { src, orientation } = await checkImageOrientation(img);
    imageStyles.value[src] = orientation;
  }
};

onMounted(() => {
  loadImageStyles();
});

const getImageClass = (img: string) => {
  if (imageStyles.value[img] === 'portrait')
    return 'vertical';

  return 'horizontal';
};
</script>

<template>
  <div v-if="props.images.length" class="flex flex-col xl:flex-row gap-4 flex-wrap">
    <NuxtLink
      v-for="img in props.images" :key="img"
      :to="img"
      target="_blank"
    >
      <NuxtImg
        :class="[getImageClass(img)]"
        class="w-full xl:w-72 xl:h-40 rounded-md object-cover"
        :src="img"
        placeholder
      />
    </NuxtLink>
  </div>
</template>

<style scoped lang="scss">
.vertical {
  width: 10rem; /* w-40 */
  height: 13rem; /* h-52 */
}

.horizontal {
  width: 18rem; /* w-72 */
  height: 13rem; /* h-52 */
}
</style>