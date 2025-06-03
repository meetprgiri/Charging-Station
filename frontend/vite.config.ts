// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use 'vuetify/settings' with ($body-font-family: 'Roboto', sans-serif);`
      }
    }
  }
})
