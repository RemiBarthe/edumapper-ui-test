<template>
  <div class="bg-surface flex min-h-dvh w-full flex-col">
    <header class="after:bg-beige-300 relative p-4 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 md:px-15">
      <img src="/assets/images/edumapper.svg" alt="Edumapper" class="h-7" />
    </header>
    <main class="mx-auto flex w-full max-w-[720px] flex-1 flex-col px-4 py-4"><slot /></main>
  </div>
</template>
