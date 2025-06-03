<template>
  <v-container class="py-6">
    <v-row justify="center" no-gutters class="transition-fast-ease-in-out">
      <!-- Google Map Column -->
      <v-col
        :cols="selectedStation ? 8 : 10"
        class="transition-fast-ease-in-out"
      >
        <GoogleMap
          api-key="process.env.GOOGLE_API"
          style="width: 100%; height: 500px"
          :center="center"
          :zoom="6"
        >
          <MarkerCluster>
            <Marker
              v-for="station in stations"
              :key="station._id"
              :options="{ position: station.location }"
              @click="() => (selectedStation = station)"
            />
          </MarkerCluster>
        </GoogleMap>
      </v-col>

      <!-- Info Panel -->
      <v-col
        v-if="selectedStation"
        cols="2"
        class="position-relative border border-opacity-700 border-black d-flex flex-column justify-center align-center pa-4 elevation-1 rounded ms-2 transition-fast-ease-in-out"
        style="background-color: #f9f9f9"
      >
        <v-btn
          icon
          size="small"
          class="position-absolute top-0 end-0 ma-2"
          @click="selectedStation = null"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <div class="text-center">
          <h4 class="text-h6 mb-2">{{ selectedStation.name }}</h4>
          <p>
            Status: <strong>{{ selectedStation.status }}</strong>
          </p>
          <p>
            Power: {{ selectedStation.powerOutput }}
            {{ selectedStation.powerUnit }}
          </p>
          <p>Connector: {{ selectedStation.connectorType }}</p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { GoogleMap, Marker, MarkerCluster } from "vue3-google-map";
import { ref, onMounted } from "vue";
import axios from "axios";
import { defineProps } from "vue";

interface Station {
  _id: string;
  location: { lat: number; lng: number };
}

interface Props {
  latitude: number;
  longitude: number;
}

const props = defineProps<Props>();
const center = { lat: props.latitude, lng: props.longitude };

const stations = ref<Station[]>([]);
const selectedStation = ref<any>(null);

onMounted(async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/chargingStation/showAllChargingStation"
    );
    stations.value = response.data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
});
</script>
