<script setup lang="ts">
const { school: savedSchool, setSchool } = useSchool();

const { data: randomSchool } = await useFetch<{ id: number; name: string; city: string; type: string }>(
  '/api/schools/random'
);
const { data: randomClasse } = await useFetch<string>('/api/classes/random');
const { data: randomBacType } = await useFetch<string>('/api/bac-types/random');

const { data: allClasses } = await useFetch<string[]>('/api/classes');
const { data: allBacTypes } = await useFetch<string[]>('/api/bac-types');
const { data: allSpecialities } = await useFetch<string[]>('/api/specialities');

const currentSchool = ref({
  name: savedSchool.value?.name || randomSchool.value?.name || 'Lycée Gaston Berger',
  city: savedSchool.value?.city || randomSchool.value?.city || 'Lille',
  type: savedSchool.value?.type || randomSchool.value?.type || 'Lycée public'
});

const handleSchoolUpdate = (updatedSchool: { name: string; city: string; type: string }) => {
  currentSchool.value = updatedSchool;
};

const expandedClasse = ref(false);
const classe = ref<string | null>(savedSchool.value?.classe || randomClasse.value || null);
const bac = ref<string | null>(savedSchool.value?.bac || randomBacType.value || null);

const confirmClasse = () => {
  expandedClasse.value = false;
};

const descriptionClasse = computed(() => {
  const parts = [classe.value, bac.value].filter(Boolean);
  return parts.length ? parts.join(', ') : undefined;
});

const disabledClasse = computed(() => {
  return !classe.value || !bac.value;
});

const expandedSpecialities = ref(false);
const specialities = ref<string[]>(savedSchool.value?.specialities || []);

const confirmSpecialities = () => {
  expandedSpecialities.value = false;
};

const descriptionSpecialities = computed(() => {
  return specialities.value.length ? specialities.value.join(', ') : undefined;
});

const disabledSpecialities = computed(() => {
  return !specialities.value.length;
});

const submitAll = () => {
  setSchool({
    name: currentSchool.value.name,
    city: currentSchool.value.city,
    type: currentSchool.value.type,
    classe: classe.value,
    bac: bac.value,
    specialities: specialities.value
  });

  navigateTo('/future-form');
};
</script>

<template>
  <div class="flex flex-1 flex-col gap-4 md:flex-none">
    <SchoolCard
      :name="currentSchool.name"
      :city="currentSchool.city"
      :type="currentSchool.type"
      @update="handleSchoolUpdate"
    />

    <Accordion v-model="expandedClasse" formation="Classe" :description="descriptionClasse">
      <div class="flex flex-col gap-6">
        <ChipGroup v-model="classe" :options="allClasses || []" />

        <hr class="border-gray-200" />

        <ChipGroup v-model="bac" title="Type de bac" :options="allBacTypes || []" />

        <Button @click="confirmClasse" :disabled="disabledClasse">Confirmer</Button>
      </div>
    </Accordion>

    <Accordion v-model="expandedSpecialities" formation="Spécialités" :description="descriptionSpecialities">
      <div class="flex flex-col gap-6">
        <ChipGroup v-model="specialities" isMulti :options="allSpecialities || []" />
        <Button @click="confirmSpecialities" :disabled="disabledSpecialities">Confirmer</Button>
      </div>
    </Accordion>

    <div class="mt-auto flex justify-center md:mt-4">
      <Button :disabled="disabledClasse || disabledSpecialities" @click="submitAll">Continuer</Button>
    </div>
  </div>
</template>
