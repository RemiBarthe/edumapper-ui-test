<script setup lang="ts">
const admissionChance = ref(91);
const reliability = ref('Très élevées');
const reliabilityStars = ref(4);

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
          <img src="/assets/images/map-pin.svg" alt="" aria-hidden="true" class="h-3 w-3 flex-shrink-0" />
          Roubaix
        </span>
      </div>

      <h1 class="text-center text-lg leading-[25px] font-semibold text-gray-900">International BBA</h1>
    </div>

    <div class="flex flex-col items-center gap-6 rounded-2xl border border-gray-200 bg-white p-8">
      <div class="relative h-32 w-32">
        <svg class="h-32 w-32 -rotate-90 transform" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" stroke="#f3f4f6" stroke-width="8" fill="none" />
          <circle
            cx="60"
            cy="60"
            r="54"
            stroke="url(#gradient)"
            stroke-width="8"
            fill="none"
            stroke-linecap="round"
            :stroke-dasharray="`${(admissionChance * 339.292) / 100} 339.292`"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color: #ff6b35; stop-opacity: 1" />
              <stop offset="100%" style="stop-color: #a855f7; stop-opacity: 1" />
            </linearGradient>
          </defs>
        </svg>
        <div class="absolute inset-0 flex items-center justify-center">
          <img src="/assets/images/rating-icon.png" alt="" aria-hidden="true" class="h-[69px] w-[69px]" />
        </div>
      </div>

      <div class="flex flex-col items-center gap-2 text-center">
        <p class="text-2xl font-bold text-gray-900">{{ admissionChance }}% • {{ reliability }}</p>
        <div class="flex items-center gap-1">
          <span class="text-sm text-gray-600">Fiabilité</span>
          <div class="flex gap-0.5">
            <span
              v-for="i in 5"
              :key="i"
              class="text-lg"
              :class="i <= reliabilityStars ? 'text-gray-800' : 'text-gray-200'"
            >
              ★
            </span>
          </div>
        </div>
      </div>

      <p class="text-center text-sm text-gray-600">
        Cette estimation est fournie à titre indicatif et ne garantit en aucun cas la décision d'admission de
        l'établissement.
      </p>
    </div>

    <div class="mt-auto flex justify-center md:mt-4">
      <Button @click="handleTestAnotherFormation">Tester une autre formation</Button>
    </div>
  </div>
</template>
