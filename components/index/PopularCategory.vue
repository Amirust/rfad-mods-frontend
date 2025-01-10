<script setup lang="ts">
const props = defineProps<{
  title: string,
  description: string,
  image: string
}>()
</script>

<template>
  <div>
    <div class="w-full h-full relative">
      <NuxtImg class="w-full h-full mask" :src="props.image" placeholder/>
      <div class="absolute bottom-0 left-0">
        <div class="mx-3 my-3">
          <h1 class="uppercase text-3xl text-primary font-light mb-1">{{ props.title }}</h1>
          <h3 class="text-base text-primary font-light leading-5">{{ props.description }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.mask {
  mask-image: linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
  object-fit: cover;
}
</style>