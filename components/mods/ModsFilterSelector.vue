<script setup lang="ts">
import { ModTagList } from '~/locale/mod.tags'
import type { FilterSelectorEvents, FilterSelectorProps } from '~/types/filter.interface';
import ModsFilterCollapse from '~/components/mods/ModsFilterCollapse.vue';

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
  <div>
    <!-- Just dont ask -->
    <div class="hidden xl:flex flex-col gap-9 mt-[-6px]">
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
    <div class="xl:hidden w-full">
      <ModsFilterCollapse>
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
      </ModsFilterCollapse>
    </div>
  </div>
</template>

<style scoped lang="scss">
.expand-enter-active,
.expand-leave-active {
  transition: opacity 0.3s, height 0.3s;
}

.expand-enter,
.expand-leave-to {
  opacity: 0;
  height: 0;
}
</style>