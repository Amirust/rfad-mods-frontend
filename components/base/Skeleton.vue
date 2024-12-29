<script setup lang="ts">

</script>

<template>
  <div class="skeleton"/>
</template>

<style scoped lang="scss">
@use 'assets/css/skeleton' as *;

.skeleton {
  @include skeleton(100%, 100%, 4px);
}
</style>