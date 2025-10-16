<script setup lang="ts">
const props = defineProps<{
  selected?: boolean;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:selected', value: boolean): void;
}>();

function toggle() {
  if (!props.disabled) {
    emit('update:selected', !props.selected);
  }
}
</script>

<template>
  <button
    @click="toggle"
    :disabled="disabled"
    class="rounded-full px-4 py-2 text-sm transition disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-600"
    :class="{
      'bg-white outline outline-offset-[-1px] outline-gray-900': selected,
      'bg-gray-100 outline-offset-[-1px] outline-gray-200 hover:outline': !selected && !disabled
    }"
  >
    <slot />
  </button>
</template>
