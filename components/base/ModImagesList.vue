<script setup lang="ts">
const props = defineProps<{
  images: {url: string, orientation: 'vertical' | 'horizontal'}[]
}>();
</script>

<template>
  <div v-if="props.images.length" class="flex flex-col xl:flex-row gap-4 flex-wrap">
    <NuxtLink
      v-for="img in props.images" :key="img.url"
      :to="img.url"
      target="_blank"
    >
      <NuxtImg
        :class="img.orientation === 'vertical' ? 'vertical' : 'horizontal'"
        class="rounded-md object-cover"
        :src="img.url"
        placeholder
      />
    </NuxtLink>
  </div>
</template>

<style scoped lang="scss">
.vertical {
  @apply w-full xl:w-40 xl:h-52;
}

.horizontal {
  @apply w-full h-full max-h-52 xl:w-72;
}
</style>