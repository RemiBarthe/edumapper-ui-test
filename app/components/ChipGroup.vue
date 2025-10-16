<script setup lang="ts">
const model = defineModel<string[] | string | null>({ default: null });

const props = defineProps<{
  title?: string;
  options: string[];
  disabled?: boolean;
  isMulti?: boolean;
}>();

const isSelected = (option: string) => {
  return props.isMulti ? Array.isArray(model.value) && model.value.includes(option) : model.value === option;
};

const toggle = (option: string) => {
  if (props.disabled) return;

  if (props.isMulti) {
    const arr = Array.isArray(model.value) ? model.value : [];
    model.value = isSelected(option) ? arr.filter((o) => o !== option) : [...arr, option];
  } else {
    model.value = isSelected(option) ? null : option;
  }
};
</script>
<template>
  <div class="space-y-4" role="group" :aria-label="title">
    <p v-if="title" class="text-sm leading-4">{{ title }}</p>

    <div class="flex flex-wrap gap-2">
      <Chip
        v-for="option in options"
        :key="option"
        :selected="isSelected(option)"
        :disabled="disabled"
        @update:selected="() => toggle(option)"
      >
        {{ option }}
      </Chip>
    </div>
  </div>
</template>
