<script setup lang="ts">

import FilterSelector from '~/components/mods/ModsFilterSelector.vue';
import ModSmallComponent from '~/components/mods/ModSmallComponent.vue';

const router = useRouter()
const route = useRoute()

const cho = ref(1)

const active: Ref<number[]> = ref([ ...(route.query.tags ? `${route.query.tags}`.split(',').map(Number) : []) ])

const updateTags = (value: number[]) => {
  active.value = value
  router.replace({ query: { ...route.query, tags: active.value.join(',') } })
}
</script>

<template>
  <div>
    <div class="mt-24 mb-10 flex flex-row gap-14">
      <FilterSelector @active:update="updateTags" :active="active"/>
      <div class="flex flex-wrap w-full gap-y-8 justify-between">
        <ModSmallComponent v-for="i in cho"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>