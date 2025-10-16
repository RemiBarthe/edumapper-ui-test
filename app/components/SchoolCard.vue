<script setup lang="ts">
interface School {
  id: number;
  name: string;
  city: string;
  type: string;
}

const props = defineProps<{
  name: string;
  city: string;
  type: string;
  editLabel?: string;
}>();

const emit = defineEmits<{
  (e: 'update', school: School): void;
}>();

const isEditing = ref(false);
const selectedSchool = ref<School | null>(null);

watch(selectedSchool, (newSchool) => {
  if (newSchool) {
    emit('update', newSchool);
    nextTick(() => {
      selectedSchool.value = null;
      isEditing.value = false;
    });
  }
});

const startEditing = () => {
  isEditing.value = true;
};

const cancelEditing = () => {
  isEditing.value = false;
  selectedSchool.value = null;
};
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

    <div class="w-full min-h-[2rem]">
      <SearchSelect
        v-if="isEditing"
        v-model="selectedSchool"
        placeholder="Rechercher un lycée..."
        @cancel="cancelEditing"
      />
      <Button v-else variant="secondary" @click="startEditing" :aria-label="editLabel || 'Modifier le lycée'">
        Modifier
      </Button>
    </div>
  </div>
</template>
