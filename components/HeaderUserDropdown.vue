<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const isOpen = ref(false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const props = defineProps<{
  userId: string
}>()

const closeDropdown = (event: MouseEvent) => {
  if (!(event.target as HTMLElement).closest('.dropdown')) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', closeDropdown);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', closeDropdown);
});
</script>

<template>
  <div class="dropdown relative">
    <div
      @click="toggleDropdown" class="cursor-pointer select-none">
      <slot name="trigger" class=""></slot>
    </div>
    <transition name="dropdown">
      <div v-if="isOpen" class="dropdown-menu absolute right-0 bg-block border-2 border-secondary-25 rounded-md mt-2 py-2.5 px-3 flex flex-col gap-2">
        <NuxtLink :to="`/users/${props.userId}`" @click="toggleDropdown">
          <div class="dropdown-menu--element">
            <LucideUser :stroke-width="2" class="w-5 h-5"/>
            Профиль
          </div>
        </NuxtLink>
        <NuxtLink @click="toggleDropdown" to="/create">
          <div class="dropdown-menu--element">
            <LucidePlus :stroke-width="2" class="w-5 h-5"/>
            Добавить мод
          </div>
        </NuxtLink>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.dropdown-menu {
  @apply min-w-10 z-50 w-max;

  &--element {
    @apply flex flex-row gap-2 text-secondary font-normal text-lg items-center hover:cursor-pointer hover:text-primary transition-colors;
  }
}

.dropdown-enter-active, .dropdown-leave-active {
  transition: opacity 0.15s, transform 0.15s;
}
.dropdown-enter-from, .dropdown-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>