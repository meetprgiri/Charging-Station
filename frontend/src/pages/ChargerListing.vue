<template>
  <v-container class="py-6">
    <v-row align="center" justify="space-between" class="mb-6">
      <v-col cols="12" md="6">
        <h2 class="text-h4 font-weight-medium">Charging Stations</h2>
      </v-col>
      <v-col cols="12" md="6" class="d-flex justify-end gap-2">
        <v-btn color="primary" @click="openAddModal">Add Station</v-btn>
        <v-btn v-if="isAuthenticated" text color="error" @click="handleLogout"
          >Logout</v-btn
        >
      </v-col>
    </v-row>

    <!-- Filters -->
    <v-row class="mb-4" dense>
      <v-col cols="12" sm="4">
        <v-select
          v-model="filters.status"
          :items="statusOptions"
          label="Filter by Status"
          clearable
        />
      </v-col>
      <v-col cols="12" sm="4">
        <v-select
          v-model="filters.connectorType"
          :items="connectorOptions"
          label="Filter by Connector"
          clearable
        />
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field
          v-model.number="filters.powerOutput"
          type="number"
          label="Min Power Output (kW)"
          clearable
        />
      </v-col>
    </v-row>

    <!-- Table -->
    <v-data-table
      :headers="headers"
      :items="filteredStations"
      class="elevation-1"
      item-value="_id"
      density="comfortable"
    >
      <template #item.status="{ item }">
        <v-chip
          :color="item.status === 'Active' ? 'green' : 'red'"
          text-color="white"
          small
        >
          {{ item.status }}
        </v-chip>
      </template>

      <template #item.edit="{ item }">
        <v-icon size="small" color="primary" @click="openEditModal(item)"
          >mdi-pencil</v-icon
        >
      </template>

      <template #item.view="{ item }">
        <v-icon
          size="small"
          color="success"
          @click="goToXYZ(item.location.lat, item.location.lng)"
          >mdi-map-marker</v-icon
        >
      </template>

      <template #item.delete="{ item }">
        <v-icon size="small" color="error" @click="deleteStation(item._id)"
          >mdi-delete</v-icon
        >
      </template>
    </v-data-table>

    <!-- Modal -->
    <v-dialog v-model="showModal" max-width="500">
      <v-card>
        <v-card-title class="text-h6">
          {{ editMode ? "Edit" : "Add" }} Charging Station
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="handleSubmit" ref="formRef">
            <v-text-field v-model="form.name" label="Name" required />

            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model.number="form.location.lat"
                  label="Latitude"
                  type="number"
                  step="any"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model.number="form.location.lng"
                  label="Longitude"
                  type="number"
                  step="any"
                />
              </v-col>
            </v-row>

            <v-select
              v-model="form.status"
              :items="statusOptions"
              label="Status"
              required
            />

            <v-text-field
              v-model.number="form.powerOutput"
              label="Power Output (kW)"
              type="number"
            />

            <v-select
              v-model="form.connectorType"
              :items="connectorOptions"
              label="Connector Type"
              required
            />
          </v-form>
        </v-card-text>

        <v-card-actions class="justify-end">
          <v-btn color="primary" @click="handleSubmit">{{
            editMode ? "Update" : "Submit"
          }}</v-btn>
          <v-btn text @click="showModal = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { isAuthenticated, logout } from "../auth.ts";

interface Station {
  _id?: string;
  name: string;
  location: { lat: number; lng: number };
  status: string;
  powerOutput: number;
  connectorType: string;
}

const router = useRouter();
const showModal = ref(false);
const editMode = ref(false);
const editingId = ref<string | null>(null);
const formRef = ref();

const form = ref<Station>({
  name: "",
  location: { lat: 0, lng: 0 },
  status: "",
  powerOutput: 0,
  connectorType: "",
});

const stations = ref<Station[]>([]);

const statusOptions = ["Active", "Inactive"];
const connectorOptions = ["CCS", "CHAdeMO", "Type2"];

const filters = ref({
  status: "",
  powerOutput: null as number | null,
  connectorType: "",
});

const headers = [
  { text: "Name", value: "name" },
  { text: "Latitude", value: "location.lat" },
  { text: "Longitude", value: "location.lng" },
  { text: "Status", value: "status" },
  { text: "Power (kW)", value: "powerOutput" },
  { text: "Connector", value: "connectorType" },
  { text: "Edit", value: "edit", sortable: false },
  { text: "View", value: "view", sortable: false },
  { text: "Delete", value: "delete", sortable: false },
];

const filteredStations = computed(() => {
  return stations.value.filter((s) => {
    const matchStatus = filters.value.status
      ? s.status === filters.value.status
      : true;
    const matchConnector = filters.value.connectorType
      ? s.connectorType === filters.value.connectorType
      : true;
    const matchPower =
      filters.value.powerOutput !== null
        ? s.powerOutput >= filters.value.powerOutput
        : true;
    return matchStatus && matchConnector && matchPower;
  });
});

const fetchStations = async () => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/chargingStation/showAllChargingStation"
    );
    stations.value = res.data;
  } catch (err) {
    console.error("Error fetching stations:", err);
  }
};

const handleSubmit = async () => {
  try {
    if (editMode.value && editingId.value) {
      await axios.put(
        `http://localhost:5000/api/chargingStation/update/${editingId.value}`,
        form.value
      );
      const index = stations.value.findIndex((s) => s._id === editingId.value);
      if (index !== -1)
        stations.value[index] = { ...form.value, _id: editingId.value };
    } else {
      const res = await axios.post(
        "http://localhost:5000/api/chargingStation/add",
        form.value
      );
      stations.value.push(res.data);
    }
    resetForm();
  } catch (err) {
    console.error("Error submitting form:", err);
  }
};

const deleteStation = async (id: string) => {
  try {
    await axios.delete(
      `http://localhost:5000/api/chargingStation/delete/${id}`
    );
    stations.value = stations.value.filter((s) => s._id !== id);
  } catch (err) {
    console.error("Error deleting station:", err);
  }
};

const openAddModal = () => {
  resetForm();
  showModal.value = true;
};

const openEditModal = (station: Station) => {
  form.value = { ...station };
  editingId.value = station._id!;
  editMode.value = true;
  showModal.value = true;
};

const resetForm = () => {
  form.value = {
    name: "",
    location: { lat: 0, lng: 0 },
    status: "",
    powerOutput: 0,
    connectorType: "",
  };
  editMode.value = false;
  editingId.value = null;
  showModal.value = false;
};

const goToXYZ = (lat: number, lng: number) => {
  const url = `/dashboard/xyz?lat=${lat}&lng=${lng}`;
  window.open(url, "_blank");
};

const handleLogout = () => {
  logout();
  router.push("/login");
};

onMounted(fetchStations);
</script>
