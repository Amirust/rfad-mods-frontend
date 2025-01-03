<script setup lang="ts">

</script>

<template>
  <div>
    <div class="w-full h-full relative">
      <NuxtImg class="w-full h-full mask rounded-md" src="isla-test.png" placeholder/>
      <div class="absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full text-primary uppercase text-3xl tracking-wide font-light">
        ПРЕСЕТЫ
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.mask {
  mask-image: linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
  filter: brightness(80%);
  object-fit: cover;
}
</style>