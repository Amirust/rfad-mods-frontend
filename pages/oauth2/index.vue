<script setup lang="ts">
import { useAuthApi } from '~/composables/useAuthApi';
import { ErrorCode } from '~/types/api/ErrorCode.enum';
import Button from '~/components/base/Button.vue';
import { useAuthStore } from '~/store/useAuthStore';

const route = useRoute()

const { query } = route
const { code } = query

const isLoading = ref(true)
const thirdPartyFail = ref(false)

const authorizeUser = async () => {
  if (code) {
    try {
      const { token } = await useAuthApi().authorizeUser(code as string, useRequestURL().href.split('?')[0])
      useAuthStore().setToken(token)

      isLoading.value = false
      setTimeout(() => navigateTo('/'), 1000)
    } catch (error: any) {
      if (error.errorCode === ErrorCode.ThirdPartyFail) {
        thirdPartyFail.value = true
        isLoading.value = false
      }
    }
  } else navigateTo(useRuntimeConfig().public.discordOAuthUrl, {
    external: true
  })
}

onMounted(async () => {
  await authorizeUser()
})
</script>

<template>
  <div class="flex flex-col items-center mt-48">
    <transition-group name="fade">
      <template v-if="isLoading">
        <h1 class="text-primary text-3xl">Ожидайте...</h1>
      </template>
      <template v-else>
        <template v-if="!thirdPartyFail">
          <h1 class="text-primary text-3xl">Вы успешно авторизовались!</h1>
          <h3 class="text-secondary text-xl text-center">
            Сейчас вы будете перенаправлены на главную страницу
          </h3>
        </template>
        <template v-else>
          <h1 class="text-primary text-3xl">Произошла ошибка при авторизации</h1>
          <h3 class="text-secondary text-xl text-center">Попробуйте пройти авторизацию заново,<br>используя кнопку ниже</h3>

          <Button class="mt-12" @click="navigateTo(useRuntimeConfig().public.discordOAuthUrl, { external: true })">Авторизоваться</Button>
        </template>
      </template>
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