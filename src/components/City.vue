<template>
  <div>
    <Suspense>
      <AsyncCity />
      <template #fallback>
        <CitySkeleton />
      </template>
    </Suspense>
  </div>
</template>

<script setup>
  import AsyncCity from './AsyncCity.vue';
  import CitySkeleton from './CitySkeleton.vue';
</script>