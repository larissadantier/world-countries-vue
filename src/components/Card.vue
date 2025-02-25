<script setup lang="ts">

  defineProps<{
    name: string,
    src: string,
  }>(); 
</script>


<template>
  <div class="flex flex-col justify-center items-center h-full bg-white p-4 rounded-xl cursor-pointer gap-4.5 shadow-md">
    <img :src="src" class="w-full max-w-[240px] h-[131px] rounded-xl object-cover border border-gray-200">
    <span class="text-xl font-bold text-neutral-700 text-center">{{ name }}</span>
  </div>
</template>