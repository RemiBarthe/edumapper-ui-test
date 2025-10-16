<script setup lang="ts">
defineProps<{
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}>();
</script>

<template>
  <button
    :disabled="disabled"
    class="inline-flex items-center justify-center rounded-full leading-4 font-medium transition disabled:cursor-not-allowed disabled:bg-white disabled:text-gray-400"
    :class="{
      'bg-gray-900 px-6 py-4 text-white hover:bg-gray-800': variant === 'primary' || !variant,
      'bg-white px-4 py-2 text-sm text-gray-900 outline-offset-[-1px] outline-gray-200 hover:outline':
        variant === 'secondary'
    }"
  >
    <slot />
  </button>
</template>
