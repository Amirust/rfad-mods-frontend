<script setup lang="ts">
import { ref, computed } from 'vue';
import { PresetTagList } from '~/locale/presets.tags';
import { Limits } from '~/types/limits.enum';

const emit = defineEmits<{
  (e: 'update:value', value: number[]): void;
}>();

const selectedTags = ref<number[]>([]);

const tags = computed(() => {
  return PresetTagList.find(item => item.category === 'Раса')?.values || [];
});

const toggleTag = (tag: number) => {
  if (selectedTags.value.length >= Limits.MaxTagsPerPreset) return;

  if (selectedTags.value.includes(tag))
    selectedTags.value = selectedTags.value.filter(item => item !== tag);
  else
    selectedTags.value.push(tag);

  emit('update:value', selectedTags.value);
};
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <transition-group name="fade">
      <div class="flex flex-row gap-2 flex-wrap w-full">
        <div
          v-for="tag in tags"
          :key="tag.value"
          @click="toggleTag(tag.value)"
          :class="{
            'bg-primary text-black border-primary': selectedTags.includes(tag.value),
            'bg-secondary-25 text-primary border-secondary': !selectedTags.includes(tag.value),
            'cursor-not-allowed pointer-events-none': selectedTags.length >= Limits.MaxTagsPerPreset && !selectedTags.includes(tag.value)
          }"
          class="w-fit h-7 max-h-7 rounded-md px-2.5 py-2 border-2 flex items-center uppercase font-normal transition-colors cursor-pointer select-none"
        >
          {{ tag.label }}
        </div>
      </div>
    </transition-group>
  </div>
</template>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.fade-move {
  transition: transform 0.3s;
}
.fade-leave-active {
  position: absolute;
  top: 0;
  transform: translateY(0);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(0);
}
</style>