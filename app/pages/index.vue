<script setup lang="ts">
const expandedClasse = ref(false);
const classe = ref<string | null>(null);
const bac = ref<string | null>(null);

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
const specialities = ref<string[]>([]);

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
  console.log({ classe: classe.value, bac: bac.value, specialities: specialities.value });
};
</script>

<template>
  <div class="flex flex-1 flex-col gap-4 md:flex-none">
    <SchoolCard name="Lycée Gaston Berger" city="Lille" type="Lycée public" />

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
