<script setup lang="ts">
import Header from './components/Header.vue';


</script>

<template>
  <main class="min-h-dvh bg-gray-100 font-nunito-sans">
    <Header />
    <section class="mx-auto max-w-[1361px] px-4 py-8">
      <RouterView />
    </section>
  </main>
</template>
