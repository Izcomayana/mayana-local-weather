<template>
  <main class="container text-white">
    <div class="pt-4 nmb-8 relative">
      <input v-model="searchQuery" @input="getSearchResults" 
      type="text" placeholder="Search for a city or state" 
      class="py-2 px-1 w-full bg-transparent border-b fous:border-weather-secondary 
      fous:outline-none focus:shadow-[0px_1px_0_0_#004E71]">

      <ul v-if="mapBoxSearchResults" class="absolute bg-weather-secondary 
      text-white w-full shadow-md py-2 px-1 top-[66px]">
        <p v-if="searchError" class="py-2">Sorry, something went wrong, pls try again</p>
        <p v-if="!serverError && mapBoxSearchResults.length === 0" class="py-2">
          No results match your query, try a different term.
        </p>
        <li v-for="searchResult in mapBoxSearchResults" @click="previewCity(searchResult)"
        :key="searchResult.id" class="py-2 cursor-pointer">{{ searchResult.place_name }}</li>
      </ul>
    </div>

    <div class="flex flex-col gap-4">
      <Suspense>
        <CityList />
        <template #fallback>
          <CityCardSkeleton />
        </template>
      </Suspense>
    </div>
  </main>
</template>

<script setup>
  import { ref } from "vue"
  import axios from "axios"
  import { useRouter } from "vue-router";
  import { Router } from "react-router";
  import CityList from "../components/CityList.vue";
  import CityCardSkeleton from "../components/CityCardSkeleton.vue";
 
  const router = useRouter();

  const previewCity = (searchResult) => { 
    // console.log(searchResult)
    const [city, state] = searchResult.place_name.split(",");
    router.push({
      name: 'city',
      params: { state: state.replaceAll(" ", ""), city: city },
      query: {
        lat: searchResult.geometry.coordinates[1],
        lng: searchResult.geometry.coordinates[0],
        preview: true
      }
    })
  }

  const mapBoxAPIKey = "pk.eyJ1IjoiaXNyYWVsLWxvY2FsLXdlYXRoZXIiLCJhIjoiY2w4bG94azFsMGM1bjN3cWNtM3MzdzdwbSJ9.w_YNmqKxrS0nwrv2QW-gPg"

  const searchQuery = ref("")
  const queryTimeout = ref(null)
  const mapBoxSearchResults = ref(null)

  const getSearchResults = () => {
    clearTimeout(queryTimeout.value)
    queryTimeout.value = setTimeout(async () => {
      if (searchQuery.value !== "") {
        try {
          const result = await axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapBoxAPIKey}`
          );
          mapBoxSearchResults.value = result.data.features;
          console.log(mapBoxSearchResults.value)
          return;
        } catch {
            searchError.value = true;
        }
      }
      console.log("getSearchResults worked")
      mapBoxSearchResults.value = null;
    }, 300)
  }
</script>

