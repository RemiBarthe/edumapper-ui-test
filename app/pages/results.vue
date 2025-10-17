<script setup lang="ts">
const finalAdmissionChance = Math.floor(Math.random() * 40) + 60;

const getReliability = (percentage: number) => {
  if (percentage >= 90) return { text: 'Très élevées', stars: 5 };
  if (percentage >= 80) return { text: 'Très élevées', stars: 4 };
  if (percentage >= 70) return { text: 'Élevées', stars: 4 };
  if (percentage >= 60) return { text: 'Élevées', stars: 3 };
  return { text: 'Moyennes', stars: 3 };
};

const reliabilityData = getReliability(finalAdmissionChance);

const displayedChance = ref(0);
const displayedCircleProgress = ref(0);
const reliability = ref(reliabilityData.text);
const reliabilityStars = ref(reliabilityData.stars);

onMounted(() => {
  const duration = 400;
  const steps = 60;
  const increment = finalAdmissionChance / steps;
  const stepDuration = duration / steps;

  let currentStep = 0;
  const interval = setInterval(() => {
    currentStep++;
    if (currentStep >= steps) {
      displayedChance.value = finalAdmissionChance;
      displayedCircleProgress.value = finalAdmissionChance;
      clearInterval(interval);
    } else {
      displayedChance.value = Math.floor(increment * currentStep);
      displayedCircleProgress.value = increment * currentStep;
    }
  }, stepDuration);
});

const handleTestAnotherFormation = () => {
  navigateTo('/');
};
</script>

<template>
  <div class="flex flex-1 flex-col gap-4 md:flex-none">
    <div class="bg-beige-300 flex flex-col gap-1 rounded-2xl p-4">
      <div class="flex items-center justify-center gap-2 text-sm text-gray-600">
        <span>EDHEC Business School</span>
        <span class="text-gray-400">|</span>
        <span class="flex items-center gap-1">
          <img
            src="/assets/images/map-pin.svg"
            alt=""
            aria-hidden="true"
            class="h-3 w-3 flex-shrink-0 opacity-50 brightness-0"
          />
          Roubaix
        </span>
      </div>

      <h1 class="text-center text-lg leading-[25px] font-semibold text-gray-900">International BBA</h1>
    </div>

    <div class="flex flex-col items-center gap-6 rounded-2xl bg-white px-6 py-8">
      <div class="relative h-28 w-28">
        <svg class="h-28 w-28 -rotate-90 transform" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" stroke="#f5f5f5" stroke-width="8" fill="none" />
          <circle
            cx="60"
            cy="60"
            r="54"
            stroke="url(#gradient)"
            stroke-width="6"
            fill="none"
            stroke-linecap="round"
            :stroke-dasharray="`${(displayedCircleProgress * 339.292) / 100} 339.292`"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color: hsla(16, 100%, 63%, 1); stop-opacity: 1" />
              <stop offset="100%" style="stop-color: hsla(266, 100%, 73%, 1); stop-opacity: 1" />
            </linearGradient>
          </defs>
        </svg>

        <div class="absolute inset-0 flex items-center justify-center">
          <img src="/assets/images/rating-icon.png" alt="" aria-hidden="true" class="h-[69px] w-[69px]" />
        </div>
      </div>

      <div class="flex flex-col items-center gap-1 text-center">
        <div
          class="flex items-center justify-center gap-2 px-4 py-1.5 text-xl leading-[1.4] font-semibold text-gray-900"
        >
          <span> {{ displayedChance }}% </span>
          <span>•</span>
          <span> {{ reliability }} </span>
        </div>

        <div class="flex items-center gap-1">
          <span class="text-xs leading-[1.4] font-medium text-gray-600">Fiabilité</span>
          <div class="flex gap-0.5">
            <span
              v-for="i in 5"
              :key="i"
              class="text-sm"
              :class="i <= reliabilityStars ? 'text-gray-800' : 'text-gray-200'"
            >
              ★
            </span>
          </div>
        </div>
      </div>

      <p class="text-center text-sm leading-[1.4] text-gray-600">
        Cette estimation est fournie à titre indicatif et ne garantit en aucun cas la décision d'admission de
        l'établissement.
      </p>
    </div>

    <div class="mt-auto flex justify-center md:mt-4">
      <Button @click="handleTestAnotherFormation">Tester une autre formation</Button>
    </div>
  </div>
</template>
