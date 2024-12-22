<template>
  <div>
    <div class="mx-36">
      <AppHeader/>
      <slot />
    </div>
    <Background/>
  </div>
</template>
<script setup lang="ts">
import Background from '~/components/Background.vue';
</script>