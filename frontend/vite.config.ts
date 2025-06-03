// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify';

export default defineConfig({
  plugins: [vue(),vuetify({ autoImport: true }),],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use 'vuetify/settings' with ($body-font-family: 'Roboto', sans-serif);`
      }
    }
  }
})
