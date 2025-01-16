<script setup lang="ts">
import type { FilterValueEvents, FilterValueProps } from '~/types/filter.interface';

const props = defineProps<FilterValueProps>();
const emit = defineEmits<FilterValueEvents>();

const active = ref(props.active);

watch(() => props.active, (value) => {
  active.value = value;
});

const toggleActive = () => {
  active.value = !active.value;
  emit('active:update', props.value, active.value);
};
</script>

<template>
  <div @click="toggleActive" class="flex flex-row text-secondary gap-3 items-center min-w-30">
    <div
      :class="{
        'bg-secondaryHalf': !active,
        'bg-primary': active
      }" class="square transition-colors"/>
    <span
      :class="{
        'text-primary': active,
        'text-secondary': !active
      }" class="font-normal text-lg transition-colors">{{ props.label }}</span>
  </div>
</template>

<style scoped lang="scss">
.square {
  @apply w-5 h-5 rounded-md border-2 border-primary;
}
</style>