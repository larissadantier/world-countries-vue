<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import type { Countries } from '../types/country';

import Card from '../components/Card.vue';

const router = useRouter();

const countries = ref<Countries[]>([]);

const fetchCountries = async () => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();
    countries.value = data;

  } catch (error) {
    console.error('Erro ao buscar os dados:', error);
  }
};

  onMounted(() => {
    fetchCountries();
  });
</script>


<template>
  <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 4xl:grid-cols-6 gap-4">
    <div v-for="country in countries">
      <RouterLink :to="`/country/${country.cca3}`">
      <Card 
        :src="country.flags.png" 
        :name="country.name.common" 
      />
    </RouterLink>
    </div>
</section>
</template>