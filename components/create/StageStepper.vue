<script setup lang="ts">
const props = defineProps<{
  activeStep: number,
  links?: string[],
  isModifying?: boolean
}>()

const labels = [
  'Выбор категории',
  'Оглавление',
  'Информация о моде',
  'Настройка ссылок'
]

if (props.isModifying) labels.shift()

const go = (index: number) => {
  if (!props.links|| !props.links.length) return

  console.log('go to', props.links[index])
  useRouter().push(props.links![index])

}
</script>

<template>
  <div class="flex flex-col gap-3.5">
    <div
      class="flex flex-row items-center gap-2" v-for="(item, index) in labels" :key="index" :class="{
        'active-step': index === props.activeStep - 1,
        'innactive-step': index > props.activeStep - 1,
        'passed-step': index < props.activeStep - 1,
        'cursor-pointer': props.links !== undefined && !!props.links.length
      }"
      @click="go(index)"
    >
      <div
        class="w-7 h-7 text-center font-medium text-lg rounded-md items-center justify-center flex">
        {{ index + 1 }}
      </div>
      <span class="text-xl font-normal">
        {{ item }}
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.active-step {
  div {
    @apply bg-primary text-black;
  }

  span {
    @apply text-primary;
  }
}

.innactive-step {
  div {
    @apply bg-secondary-25 border-2 border-secondary text-secondary;
  }

  span {
    @apply text-secondary;
  }
}

.passed-step {
  div {
    @apply bg-primary text-black;
  }

  span {
    @apply text-secondary;
  }
}
</style>