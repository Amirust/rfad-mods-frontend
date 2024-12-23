<script setup lang="ts">

</script>

<template>
  <div>
    <div class="w-full h-full relative">
      <img class="w-full h-full mask" src="assets/images/zodiac-screen.webp">
      <div class="absolute bottom-0 left-0">
        <div class="mx-3">
          <h1 class="text-4xl text-primary font-light mb-1">Zodiac OST Pack</h1>
          <h3 class="text-lg text-primary font-light overflow-ellipsis line-clamp-2 w-full leading-5">
            Музыкальный сборник от Zodiac. В основном с музыкой из других игр, таких как: Baldur's Gate 3, Nier, Pathfinedr, Magica. Музыкальный сборник от Zodiac. В основном с музыкой из других игр, таких как: Baldur's Gate 3, Nier, Pathfinedr, Magica.
          </h3>
          <div class="flex flex-row text-secondary font-normal my-2 gap-6">
            <div class="flex flex-row gap-2 items-center">
              <LucideUserRound :stroke-width="3" :size="18"/> <span class="text-base text-center">Zodiac</span>
            </div>
            <div class="flex flex-row gap-2 items-center">
              <LucideCloudDownload :stroke-width="3" :size="18"/> <span class="text-base text-center">1984</span>
            </div>
            <div class="flex flex-row gap-2 items-center">
              <LucideClock :stroke-width="3" :size="16"/> <span class="text-base text-center">10.12.2024</span>
            </div>
          </div>
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