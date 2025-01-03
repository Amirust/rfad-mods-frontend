<script setup lang="ts">

import StageStepper from '~/components/create/StageStepper.vue';
import CustomInput from '~/components/base/CustomInput.vue';
import EnumSelector from '~/components/base/EnumSelector.vue';
import { VersionsEnum } from '~/types/versions.enum';
import TagsSelector from '~/components/base/TagsSelector.vue';
import Button from '~/components/base/Button.vue';

const router = useRouter()

const isButtonDisabled = computed(() => {
  return true
})

const go = () => {
  if (isButtonDisabled.value) return
  router.push('/create/mods/step2')
}
</script>

<template>
  <div>
    <div class="mt-18 mb-10 flex flex-col gap-9">
      <h1 class="uppercase text-3xl text-secondary font-light">Публикация мода</h1>
      <div class="flex flex-row gap-14 align-baseline">
        <div class="flex flex-col gap-9 min-w-max">
          <div class="flex flex-col">
            <h3 class="text-3xl font-medium text-primary">Как добавить мод?</h3>
            <h5 class="text-xl font-light text-secondary">Выполните эти 4 простых шага</h5>
          </div>
          <StageStepper :active-step="2"/>
        </div>
        <div class="flex flex-col gap-9 w-full">
          <div class="flex flex-col ">
            <h4 class="text-xl font-light text-secondary">ШАГ 2</h4>
            <h3 class="text-3xl font-normal text-primary uppercase">Заполним оглавление</h3>
          </div>
          <div class="flex flex-col gap-7">
            <div class="flex flex-row gap-20 w-full">
              <div class="flex flex-col max-w-60 w-full gap-1">
                <h2 class="text-3xl font-light text-primary">Название</h2>
                <h5 class="text-base leading-tight font-light text-secondary">Самое главное о вашем моде несколькими словами</h5>
              </div>
              <div class="w-full">
                <CustomInput class="w-full" :length-limit="25" name="amogus" :validator="() => null" placeholder="Введите название..." />
              </div>
            </div>
            <div class="flex flex-row gap-20 w-full">
              <div class="flex flex-col max-w-60 w-full gap-1">
                <h2 class="text-3xl font-light text-primary">Краткое описание</h2>
                <h5 class="text-base leading-tight font-light text-secondary">Завлеките людей этим описанием, оно отображается на странице со всеми модами</h5>
              </div>
              <div class="w-full">
                <CustomInput class="w-full" :length-limit="50" name="amogus" :validator="() => null" placeholder="Введите краткое описание ..." />
              </div>
            </div>
            <div class="flex flex-row gap-20 w-full">
              <div class="flex flex-col max-w-60 w-full gap-1">
                <h2 class="text-3xl font-light text-primary">Версия</h2>
                <h5 class="text-base leading-tight font-light text-secondary">Выберите версию сборки, на которой мод работает</h5>
              </div>
              <div class="w-full">
                <EnumSelector
                  @update:value="console.log"
                  :enum="VersionsEnum"
                />
              </div>
            </div>
            <div class="flex flex-row gap-20 w-full">
              <div class="flex flex-col max-w-60 w-full gap-1">
                <h2 class="text-3xl font-light text-primary">Теги</h2>
                <h5 class="text-base leading-tight font-light text-secondary">Сначала выберите категорию, остальные теги вы увидите после этого</h5>
              </div>
              <div class="w-full">
                <TagsSelector />
              </div>
            </div>
            <div class="w-full flex flex-row justify-end gap-7">
              <Button @click="router.back()">Назад</Button>
              <Button :disabled="isButtonDisabled" @click="go">Далее</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>