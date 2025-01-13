<script setup lang="ts">
import { BoostyLevelList } from '~/locale/boosty.levels';

const selectedTags = defineModel<number[]>({
  required: true
});

const tags = BoostyLevelList

const toggleTag = (tag: number) => {
  selectedTags.value = [ tag ];
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
</style>