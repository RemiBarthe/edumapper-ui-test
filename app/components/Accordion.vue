<script setup lang="ts">
defineProps<{ formation: string; description?: string }>();
const expanded = ref(false);
</script>

<template>
  <div class="space-y-2 rounded-2xl bg-white p-5">
    <div class="flex items-center justify-between">
      <h3 class="leading-[22px] font-semibold">{{ formation }}</h3>

      <button class="flex items-center gap-1 text-sm text-gray-600" @click="expanded = !expanded">
        <span v-if="!expanded && !description">À compléter</span>
        <img
          src="/assets/images/chevron.svg"
          alt="chevron"
          class="h-4 w-4 transition-transform duration-200"
          :class="expanded ? '-rotate-180' : 'rotate-0'"
        />
      </button>
    </div>

    <div class="relative">
      <Transition name="swap">
        <p v-if="!expanded && description" key="desc" class="text-sm text-gray-800">
          {{ description }}
        </p>

        <div v-else-if="expanded" key="content" class="pt-5">
          <slot />
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.swap-enter-active,
.swap-leave-active {
  transition: transform 0.2s ease;
}

.swap-enter-from,
.swap-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

.swap-leave-active {
  position: absolute;
  inset: 0;
}
</style>
