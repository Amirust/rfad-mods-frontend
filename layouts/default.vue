<template>
  <div>
    <div class="mx-6 xl:mx-40 2xl:mx-44 3xl:mx-48 2k:mx-64 4k:mx-96 min-h-svh h-full">
      <AppHeader/>
      <slot />
    </div>
    <Background/>
  </div>
</template>
<script setup lang="ts">
import Background from '~/components/Background.vue';
</script>