// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Vuetify core styles
import 'vuetify'

// Material Design Icons
import '@mdi/font/css/materialdesignicons.css'

// Vuetify functions & components
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Create Vuetify instance
const vuetify = createVuetify({
  components,
  directives,
})

// Create Vue app
const app = createApp(App)

// Use router and vuetify plugins
app.use(router)
app.use(vuetify)

// Mount app
app.mount('#app')
