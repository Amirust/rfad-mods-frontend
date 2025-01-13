<script setup lang="ts">
import { type PresetTag, PresetTagList } from '~/locale/presets.tags';

const selectedTags = defineModel<number[]>({
  required: true
});

const tags: PresetTag[] = PresetTagList.filter(e => e.category !== 'Раса').map(e => {
  return e.values;
}).flat(1)

const toggleTag = (tag: number) => {
  if (selectedTags.value.includes(tag))
    selectedTags.value = selectedTags.value.filter(item => item !== tag);
  else
    selectedTags.value.push(tag);
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-row gap-2">
      <transition-group name="fade">
        <div class="flex flex-row gap-2">
          <div
            v-for="tag in tags"
            :key="tag.value"
            @click="toggleTag(tag.value)"
            :class="{
              'bg-primary text-black border-primary': selectedTags.includes(tag.value),
              'bg-secondary-25 text-primary border-secondary': !selectedTags.includes(tag.value)
            }"
            class="w-fit h-7 max-h-7 rounded-md px-2.5 py-2 border-2 flex items-center uppercase font-normal transition-colors cursor-pointer select-none"
          >
            {{ tag.label }}
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>