<script setup lang="ts">
const props = defineProps<{
  enum: Record<string, any>
}>()

const emit = defineEmits<{
  (event: 'update:value', value: any[]): void
}>()

const selected = ref<any[]>([])

const processClick = (value: any) => {
  if (selected.value.includes(value)) selected.value = selected.value.filter((item) => item !== value)
  else selected.value = [ ...selected.value, value ]

  emit('update:value', [ ...selected.value ])
}
</script>

<template>
  <div class="flex flex-row gap-2">
    <div
      v-for="i in props.enum" :key="i"
      :class="{
        'bg-primary text-black border-primary': selected.includes(i),
        'bg-secondary-25 text-primary border-secondary ': !selected.includes(i)
      }"
      @click="processClick(i)"
      class="w-fit h-7 max-h-7 rounded-md px-2.5 py-2 border-2 flex items-center uppercase font-normal transition-colors cursor-pointer select-none"
    >
      {{ i }}
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>