<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-weather-primary">
    <Navigation />
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>

<script>
  import { RouterView } from 'vue-router';
  import Navigation from './components/Navigation.vue';
 
  export default {
    components: { Navigation }
}
</script>

<style>
  .page-enter-active {
    transition: 800ms ease all;
  }
  .page-enter-from {
    opacity: 0;
  }
</style>