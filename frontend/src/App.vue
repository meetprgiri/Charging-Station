<template>
  <router-view />
</template>

<script setup lang="ts">
// Vuetify styles workaround
import "../node_modules/vuetify/lib/styles/main.sass";
</script>

<style>
/* Optional global styles */
body {
  font-family: sans-serif;
  margin: 0;
  padding: 0;
}
</style>
