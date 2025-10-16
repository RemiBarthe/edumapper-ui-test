<script setup lang="ts">
const { school, setSchool } = useSchool();

const currentSchool = ref({
  name: school.value?.name || 'Lycée Gaston Berger',
  city: school.value?.city || 'Lille',
  type: school.value?.type || 'Lycée public'
});

const handleSchoolUpdate = (updatedSchool: { name: string; city: string; type: string }) => {
  currentSchool.value = updatedSchool;
};

const expandedClasse = ref(false);
const classe = ref<string | null>(school.value?.classe || null);
const bac = ref<string | null>(school.value?.bac || null);

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

const SPECIALITIES = ['HGGSP', 'HLP', 'LLCE', 'LCA', 'Maths', 'NSI', 'PC', 'SVT', 'SI', 'SES', 'EPS', 'Arts', 'BE'];
const expandedSpecialities = ref(false);
const specialities = ref<string[]>(school.value?.specialities || []);

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
        <ChipGroup v-model="classe" :isMulti="false" :options="['Seconde', 'Première', 'Terminale']" />

        <hr class="border-gray-200" />

        <ChipGroup
          v-model="bac"
          :isMulti="false"
          title="Type de bac"
          :options="['Général', 'Technologique', 'Professionnel']"
        />

        <Button @click="confirmClasse" :disabled="disabledClasse">Confirmer</Button>
      </div>
    </Accordion>

    <Accordion v-model="expandedSpecialities" formation="Spécialités" :description="descriptionSpecialities">
      <div class="flex flex-col gap-6">
        <ChipGroup v-model="specialities" :isMulti="true" :options="SPECIALITIES" />
        <Button @click="confirmSpecialities" :disabled="disabledSpecialities">Confirmer</Button>
      </div>
    </Accordion>

    <div class="mt-auto flex justify-center md:mt-4">
      <Button :disabled="disabledClasse || disabledSpecialities" @click="submitAll">Continuer</Button>
    </div>
  </div>
</template>
