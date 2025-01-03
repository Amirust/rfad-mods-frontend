<script setup lang="ts">
import { ModTagList } from 'assets/manifest/mod.tags'
import type { FilterSelectorEvents, FilterSelectorProps } from '~/types/filter.interface';

const props = defineProps<FilterSelectorProps>()
const emit = defineEmits<FilterSelectorEvents>()

const allowedToDisplay: Ref<number[]> = ref([])
const selected = ref<number[]>([])

const updateRefList = () => {
  return ModTagList.map((item) => {
    if (!item.doNotHide && allowedToDisplay.value.length && !item.values.every(({ value }) => allowedToDisplay.value.includes(value))) return undefined
    return {
      ...item,
      values: item.values.map((tag) => {
        return {
          value: tag.value,
          label: tag.label,
          active: computed(() => selected.value.includes(tag.value)),
          disabled: allowedToDisplay.value.length ? (item.doNotHide && !allowedToDisplay.value.includes(tag.value)) : false
        }
      })
    }
  }).filter(Boolean)
}

const updateValue = (value: number, active: boolean) => {
  const parentIfExist = refList.value.find((item) => item?.parent === value)

  if (parentIfExist) {
    allowedToDisplay.value = active ? [ value, ...parentIfExist.values.map(({ value }) => value) ] : []
    selected.value = []
  }

  if (active) selected.value = [ ...selected.value, value ]
  else selected.value = selected.value.filter((item) => item !== value)

  refList.value = updateRefList()

  emit('active:update', selected.value)
}

const refList = ref(updateRefList())
onMounted(() => {
  props.active.map((item) => updateValue(item, true))
})
</script>

<template>
  <!-- Just dont ask -->
  <div class="flex flex-col gap-9 mt-[-6px]">
    <transition-group name="fade">
      <div v-for="item in refList" :key="item?.category" class="flex flex-col gap-3">
        <span class="text-primary font-medium text-xl">{{ item?.category }}</span>
        <div class="flex flex-row flex-wrap w-72 gap-y-3 gap-x-6">
          <FilterValue
            @active:update="updateValue" :class="{
              'cursor-not-allowed pointer-events-none opacity-75': tag.disabled,
              'cursor-pointer': !tag.disabled
            }" v-for="tag in item?.values" :value="tag.value" :label="tag.label" :active="tag.active" />
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