<script setup lang="ts">
interface Option {
  id: number;
  name: string;
  city: string;
  type: string;
}

const props = defineProps<{
  modelValue: Option | null;
  placeholder?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: Option | null): void;
  (e: 'cancel'): void;
}>();

const isOpen = ref(false);
const searchQuery = ref('');
const searchInput = ref<HTMLInputElement | null>(null);
const container = ref<HTMLElement | null>(null);

const { data: options, pending } = await useFetch<Option[]>('/api/schools', {
  query: { search: searchQuery },
  watch: [searchQuery]
});

const selectOption = (option: Option) => {
  emit('update:modelValue', option);
  isOpen.value = false;
  searchQuery.value = '';
};

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    nextTick(() => {
      searchInput.value?.focus();
    });
  }
};

const clearSelection = () => {
  emit('update:modelValue', null);
  searchQuery.value = '';
};

const cancelEdit = () => {
  emit('cancel');
  isOpen.value = false;
  searchQuery.value = '';
};

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  if (container.value && !container.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  nextTick(() => {
    isOpen.value = true;
    setTimeout(() => {
      searchInput.value?.focus();
    }, 50);
  });
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div ref="container" class="relative w-full">
    <!-- Selected value or placeholder -->
    <button
      type="button"
      @click="toggleDropdown"
      class="inline-flex w-full items-center justify-between gap-2 rounded-full bg-white px-4 py-2 text-left text-sm leading-4 font-medium text-gray-900 outline-1 outline-offset-[-1px] outline-gray-200 transition-colors hover:outline focus:ring-2 focus:ring-blue-500/20 focus:outline-blue-500 focus:outline-none"
    >
      <span v-if="modelValue" class="truncate"> {{ modelValue.name }} - {{ modelValue.city }} </span>
      <span v-else class="text-gray-900">
        {{ placeholder || 'Sélectionner un lycée' }}
      </span>
      <img
        src="/assets/images/chevron.svg"
        alt=""
        class="h-4 w-4 flex-shrink-0 transition-transform"
        :class="{ 'rotate-180': isOpen }"
      />
    </button>

    <!-- Cancel button (X) -->
    <button
      type="button"
      @click.stop="cancelEdit"
      class="absolute top-1/2 right-10 -translate-y-1/2 text-gray-400 hover:text-gray-600"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>

    <!-- Dropdown -->
    <div v-if="isOpen" class="absolute z-50 mt-2 w-full rounded-lg border border-gray-200 bg-white text-gray-900">
      <!-- Search input -->
      <div class="border-b border-gray-200 p-2">
        <input
          ref="searchInput"
          v-model="searchQuery"
          type="text"
          placeholder="Rechercher..."
          class="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
        />
      </div>

      <!-- Options list -->
      <div class="max-h-60 overflow-y-auto">
        <div v-if="pending" class="px-4 py-3 text-center text-sm text-gray-500">Chargement...</div>
        <div v-else-if="!options || options.length === 0" class="px-4 py-3 text-center text-sm text-gray-500">
          Aucun résultat trouvé
        </div>
        <button
          v-else
          v-for="option in options"
          :key="option.id"
          type="button"
          @click="selectOption(option)"
          class="flex w-full flex-col items-start gap-1 px-4 py-3 text-left text-sm transition-colors hover:bg-gray-50"
        >
          <span class="font-medium">{{ option.name }}</span>
          <span class="text-xs text-gray-600">{{ option.city }} · {{ option.type }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
