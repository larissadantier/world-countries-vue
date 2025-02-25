<script setup lang="ts">
import { ref, onMounted } from 'vue';

import type { Countries } from '../types/country';

import Card from '../components/Card.vue';
import Spinner from '../components/Spinner.vue';

const countries = ref<Countries[]>([]);
const loading = ref<boolean>(false);

const fetchCountries = async () => {
  loading.value = true;

  try {
    const response = await fetch('https://restcountries.com/v3.1/all', {
      headers: {
        'Cache-Control': 'max-age=86400, must-revalidate',
      }
    });
    const data = await response.json();
    countries.value = data;

  } catch (error) {
    loading.value = false;
    console.error('Data retrieval error:', error);
  } finally {
    loading.value = false
  }
};

  onMounted(() => {
    fetchCountries();
  });
</script>


<template>
  <Spinner v-if="loading"/>

  <section v-if="!loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 4xl:grid-cols-6 gap-4">
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