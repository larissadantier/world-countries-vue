2<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { onBeforeRouteLeave, useRoute } from 'vue-router';

import Card from '../components/Card.vue';

import type { Country, BorderDetails } from '../types/country';

const router = useRoute();

const country = ref<Country | null>(null);
const bordersDetails = ref<BorderDetails[]>([]);
const loading = ref<boolean>(false);


const fetchBorderDetails = async (border: string) => {
  loading.value = true;
  try {
    const borderResponse = await fetch(`https://restcountries.com/v3.1/alpha/${border}`, {
      headers: {
        'Cache-Control': 'no-cache',
      }
    });
    const borderData = await borderResponse.json();
    return borderData[0];
  } catch (error) {
      loading.value = false;
      console.error('Data retrieval error:', error);
      return null;
  } finally {
    loading.value = false;
  }
};

  const fetchCountry = async () => {
    if (!router.params.id) return;

    loading.value = true;

    try {
      const response = await fetch(`https://restcountries.com/v3.1/alpha/${router.params.id}`);
      const data = await response.json();
      country.value = data[0]; 

      if(country?.value?.borders) {
        const borders = country.value.borders;

        const borderDetails = await Promise.all(
          borders.map((border) => fetchBorderDetails(border))
        );

        bordersDetails.value = borderDetails.filter((detail) => detail !== null);
      }

    } catch (error) {
      console.error('Data retrieval error:', error);
      loading.value = false;
    } finally {
      loading.value = false;
    }
  };

  watch(
    () => router.params.id,
    (newId) => {
      if (newId) {
        fetchCountry();
      }
    }
  );

  onMounted(() => {
    fetchCountry();
  });

  onBeforeRouteLeave(() => {
    country.value = null;
    bordersDetails.value = [];
  });
</script>


<template>
  <div class="max-w-full flex flex-col space-y-13">
    <section v-if="!loading" class="w-full space-y-4">
        <header>
          <div> 
            <h1 class="text-center text-4xl text-gray-800 font-bold">
              {{ country?.name.common }}
            </h1>
          </div>

          <RouterLink :to="'/'"> <- Back</RouterLink >
        </header>

        <div class="flex flex-col-reverse justify-center gap-4 items-center sm:gap-0 sm:flex-row sm:justify-between bg-white px-8 py-5 rounded-xl shadow-md">
          <section class="space-y-2">
            <h2 class="text-lg">
              <span class="text-gray-800 font-bold">Capital:</span> 
              {{ country?.capital[0]}} 
            </h2> 

            <h2 class="text-lg">
              <span class="text-gray-800 font-bold">Continent:</span> 
              {{ country?.continents[0] }} 
            </h2>

            <h2 class="text-lg">
              <span class="text-gray-800 font-bold">Population:</span> 
              {{ country?.population }}
            </h2> 
            <h2 class="text-gray-800 font-bold text-lg space-x-4">
              Languages:
              <span class="bg-indigo-700 text-white px-3 py-1 rounded-3xl font-normal">
                  {{ country?.languages[Object.keys(country.languages)[0]] }}
              </span>
            </h2> 
          </section>

          <section>
            <img :src="country?.flags.png" class="max-w-[460px] max-h-[230px] rounded-xl border border-gray-200">
          </section>
        </div>
   
    </section>

    <section v-if="!loading && country?.borders" class="space-y-4">          
        <h1 class="text-4xl text-gray-800 font-bold">
          Border countries
        </h1>
 
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 4xl:grid-cols-6 gap-4">
          <div v-for="border in bordersDetails">
            <RouterLink :to="`/country/${border.cca3}`" :replace="true">
                <Card           
                  :src="border.flags.png" 
                  :name="border.name.common"  
                />
            </RouterLink>
          </div>
        </div>
    </section>
  </div>
</template>