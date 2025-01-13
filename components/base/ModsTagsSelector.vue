<script setup lang="ts">
import { ref, computed } from 'vue';
import { ModTagList } from '~/locale/mod.tags';
import { resolveModTagsCategory } from '~/utils/resolveModTags.util';
import type { ModTags } from '~/types/mod-tags.enum';

const emit = defineEmits<{
  (e: 'update:value', value: number[]): void;
}>();

const selectedCategory = ref<string | null>(null);
const selectedTags = defineModel<ModTags[]>({
  required: true
});

const isInitialized = ref(false);

const categories = computed(() => {
  if (selectedCategory.value !== null) return [ selectedCategory.value ];
  return ModTagList.map(item => item.category).filter(e => e !== 'Категории')
});

const tags = computed(() => {
  if (selectedCategory.value === null) return [];
  const category = ModTagList.find(item => item.category === selectedCategory.value);
  return category ? category.values : [];
});

const selectCategory = (category: string) => {
  if (selectedCategory.value === category) {
    selectedCategory.value = null;
    emit('update:value', []);
  }
  else {
    selectedCategory.value = category;
    selectedTags.value = [];
    emit('update:value', [ resolveCategoryFromName(category as string)!.value ]);
  }
};

const toggleTag = (tag: number) => {
  if (selectedTags.value.includes(tag))
    selectedTags.value = selectedTags.value.filter(item => item !== tag);
  else
    selectedTags.value.push(tag);

  emit('update:value', [ resolveCategoryFromName(selectedCategory.value!)!.value, ...selectedTags.value ]);
};

const resolveCategoryFromName = (name: string) => {
  return ModTagList.find(item => item.values.some(e => e.label === name))?.values.find(e => e.label === name);
};

watch(selectedTags, () => {
  if (!isInitialized.value) {
    const { category } = resolveModTagsCategory(selectedTags.value);
    if (category) selectedCategory.value = category;
  }

  isInitialized.value = true;
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-row gap-2">
      <transition-group name="fade">
        <div
          v-for="category in categories"
          :key="category"
          @click="selectCategory(category)"
          :class="{
            'bg-primary text-black border-primary': selectedCategory === category,
            'bg-secondary-25 text-primary border-secondary': selectedCategory !== category
          }"
          class="w-fit h-7 max-h-7 rounded-md px-2.5 py-2 border-2 flex items-center uppercase font-normal transition-colors cursor-pointer select-none"
        >
          {{ category }}
        </div>
        <div v-if="selectedCategory !== null" class="flex flex-row gap-2">
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