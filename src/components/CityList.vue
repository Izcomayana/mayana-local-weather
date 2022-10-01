<template>
  <div>
    <div v-for="city in savedCities" :key="city.id">
      <CityCard :city="city" @click="goToCityView(city)" />
    </div>

    <p v-if="savedCities.length === 0">
      No locations added. To start tracking a location, search in
      the field above.
    </p>
  </div>
  
</template>

<script setup>
  import axios from "axios";
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import CityCard from "./CityCard.vue";

  const savedCities = ref([]);

  const getCities = async () => {
    if (localStorage.getItem("savedCities")) {
      savedCities.value = JSON.parse(
        localStorage.getItem("savedCities")
      );
      const requests = [];
      savedCities.value.forEach((city) => {
        requests.push(
          axios.get(
            // `https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lng}&appid=a22c0429c64a630e0df8dd48a6a2975d&units=metric`
            `https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lng}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=metric`
          )
        );
      });

      const weatherData = await Promise.all(requests);

      // flicker Delay
      await new Promise((res) => setTimeout(res, 1000))

      weatherData.forEach((value, index) => {
        savedCities.value[index].weather = value.data;
      });
    }
  };

  await getCities();
  const router = useRouter();

  const goToCityView = (city) => {
    router.push({
      name: "city",
      params: { state: city.state, city: city.city },
      query: {
        id: city.id,
        lat: city.coords.lat,
        lng: city.coords.lng,
      },
    });
  };
</script>