<script setup lang="ts">
defineProps<{
  name: string;
  city: string;
  type: string;
  editLabel?: string;
}>();

const emit = defineEmits<{
  (e: 'edit'): void;
}>();

const onEdit = () => emit('edit');
</script>

<template>
  <div
    class="flex flex-col items-start gap-6 rounded-2xl p-5 tracking-tight text-white"
    style="
      background:
        radial-gradient(circle at right top, hsla(326, 100%, 87%, 0.5) 0%, hsla(326, 100%, 87%, 0) 50%),
        linear-gradient(113deg, hsla(16, 100%, 63%, 1) 50%, hsla(266, 100%, 73%, 1) 100%);
    "
  >
    <div class="space-y-2">
      <h2 class="text-xl leading-6 font-bold">{{ name }}</h2>

      <div class="flex flex-wrap gap-2 text-sm leading-4">
        <div class="flex items-center gap-1">
          <img src="/assets/images/map-pin.svg" alt="" class="h-3 w-3 flex-shrink-0" />
          <p>{{ city }}</p>
        </div>

        <div class="flex items-center gap-1">
          <img src="/assets/images/building.svg" alt="" class="h-3 w-3 flex-shrink-0" />
          <p>{{ type }}</p>
        </div>
      </div>
    </div>

    <Button variant="secondary" @click="onEdit" :aria-label="editLabel || 'Modifier le lycée'">Modifier</Button>
  </div>
</template>
