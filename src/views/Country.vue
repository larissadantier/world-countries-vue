2<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import type { Country } from '../types/country';

const router = useRoute();

const country = ref<Country | null>(null);

const fetchCountry = async () => {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/alpha/${router.params.id}`);
    const data = await response.json();
    country.value = data[0];

  } catch (error) {
    console.error('Erro ao buscar os dados:', error);
  }
};

onMounted(() => {
  fetchCountry();
});
</script>


<template>
  <div class="w-full flex justify-center items-center">
  <div class="w-full max-w-[1000px] flex flex-col-reverse justify-center gap-4 items-center sm:gap-0 sm:flex-row sm:justify-between bg-white px-8 py-5 rounded-xl">
    <section>
      <h2 class="text-lg"><span class="text-gray-800 font-bold">Capital:</span> {{ country?.capital[0]}} </h2> 
      <h2 class="text-lg"><span class="text-gray-800 font-bold">Continent:</span> {{ country?.continents[0] }} </h2>
      <h2 class="text-lg"><span class="text-gray-800 font-bold">Population:</span> {{ country?.population }}</h2> 
      <h2 class="text-lg"><span class="text-gray-800 font-bold">Languages:</span> 
        <div  class="space-x-4 mt-3">
          <span class="bg-indigo-700 text-white px-3 py-1 rounded-3xl">
            {{ country?.languages[Object.keys(country.languages)[0]] }}
          </span>
        </div> 
      </h2> 
    </section>

    <section>
      <img :src="country?.flags.png" class="max-w-[460px] max-h-[183px] rounded-xl">
    </section>
  </div>
</div>
</template>