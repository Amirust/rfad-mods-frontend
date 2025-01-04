<script setup lang="ts">
const props = defineProps<{
  disabled?: boolean;
}>();
</script>

<template>
  <div
    :class="{
      'opacity-50 hover:opacity-55': props.disabled,
    }"
    class="rounded-md border-2 border-secondary bg-secondary-25 text-primary text-lg px-3.5 py-1 uppercase hover:cursor-pointer hover:bg-primary-25 transition-colors select-none"
  >
    <slot/>
  </div>
</template>

<style scoped lang="scss">

</style>