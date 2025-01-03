<template>
  <div class="flex flex-col gap-1.5">
    <input
      class="input"
      :maxlength="lengthLimit"
      :class="{
        'error': errorMessage,
        'border-secondary-25 focus:border-primary': !errorMessage,
      }"
      :id="name"
      :type="type"
      :placeholder="placeholder"
      v-model="inputValue"
      @input="validate"
      @blur="validate"
    />
    <div
      v-if="lengthLimit"
      :class="{
        'reached': inputValue.length >= lengthLimit,
      }"
      class="flex w-full justify-end text-secondary text-xs font-normal">
      {{ inputValue.length }} / {{ lengthLimit }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineEmits, defineProps } from 'vue';

interface Props {
  name: string;
  type?: string;
  value?: string;
  validator: (value: string) => string | null;
  placeholder?: string;
  lengthLimit?: number;
}

interface Emit {
  (event: 'update:value', value: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emit>();

const inputValue = ref(props.value || '');
const errorMessage = ref('');

watch(inputValue, (newValue) => {
  emit('update:value', newValue);
});

const validate = () => {
  if (!props.validator) return;
  if (inputValue.value.length > (props.lengthLimit || Infinity)) {
    setError('Превышен лимит символов');
    return;
  }

  const error = props.validator(inputValue.value);
  errorMessage.value = error ? error : '';
}

function setError(message: string) {
  errorMessage.value = message;
}
</script>

<style scoped lang="scss">
.input {
  @apply text-lg font-normal bg-block border rounded-md px-2.5 outline-none min-h-10 min-w-full text-primary transition-colors placeholder:text-secondaryHalf placeholder:font-normal
}

.error {
  @apply border-error
}

.reached {
  animation: shake .5s cubic-bezier(.36,.07,.19,.97) both;
}

@keyframes shake {
  0% {
    transform: translate(0)
  }

  25% {
    transform: translate(3px)
  }

  50% {
    transform: translate(-3px)
  }

  75% {
    transform: translate(3px)
  }

  to {
    transform: translate(0)
  }
}
</style>