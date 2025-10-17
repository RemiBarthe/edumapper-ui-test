<script setup lang="ts">
const { school, setSchool } = useSchool();

const fileInput = ref<HTMLInputElement | null>(null);
const uploadedFile = ref<File | null>(null);

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    uploadedFile.value = target.files[0];
  }
};

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleSchoolUpdate = (updatedSchool: { name: string; city: string; type: string }) => {
  if (school.value) {
    setSchool({
      ...school.value,
      name: updatedSchool.name,
      city: updatedSchool.city,
      type: updatedSchool.type
    });
  }
};

const hasNoFutureForm = ref(false);

const canSubmit = computed(() => {
  return uploadedFile.value || hasNoFutureForm.value;
});

const submitForm = () => {
  navigateTo('/results');
};
</script>

<template>
  <div class="flex flex-1 flex-col gap-4 md:flex-none">
    <SchoolCard
      v-if="school"
      :name="school.name"
      :city="school.city"
      :type="school.type"
      @update="handleSchoolUpdate"
    />

    <div class="flex flex-col gap-6 rounded-2xl bg-white p-5">
      <div class="flex flex-col items-center gap-2 text-center">
        <div class="rounded-lg p-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="text-gray-600"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
        </div>
        <p class="text-sm text-gray-600">Joindre ma fiche avenir pour cette formation</p>
      </div>

      <input ref="fileInput" type="file" class="hidden" @change="handleFileUpload" />

      <div class="flex justify-center">
        <Button @click="triggerFileInput">
          {{ uploadedFile ? uploadedFile.name : 'Choisir un fichier' }}
        </Button>
      </div>
    </div>

    <p class="text-center text-xs text-gray-500">
      Transmettre ta fiche Avenir permet d'affiner le résultat de tes chances d'admission.
    </p>

    <div class="mt-auto flex flex-col gap-3 md:mt-4">
      <Button :disabled="!canSubmit" @click="submitForm">Suivant</Button>

      <Button variant="secondary" @click="submitForm"> Je n'ai pas de fiche Avenir pour cette formation </Button>
    </div>
  </div>
</template>
