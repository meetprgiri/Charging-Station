<template>
  <div class="text-center">
    <h1>Map view</h1>
  </div>
  <GoogleMap :latitude="Number(latitude)" :longitude="Number(longitude)" />
</template>

<script lang="ts" setup>
import GoogleMap from "../components/GoogleMap.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const latitude = route.query.lat;
const longitude = route.query.lng;
</script>
