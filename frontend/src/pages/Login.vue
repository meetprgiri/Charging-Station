<template>
  <div>
    <div class="mx-auto text-center my-6"></div>

    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <form @submit.prevent="handleLogin">
        <h1>Login</h1>

        <div class="text-subtitle-1 text-medium-emphasis">Account</div>

        <v-text-field
          v-model="email"
          density="compact"
          placeholder="Email address"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          type="email"
          required
        ></v-text-field>

        <div
          class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
        >
          Password

          <a class="text-caption text-decoration-none text-blue" href="#">
            Forgot login password?</a
          >
        </div>

        <v-text-field
          v-model="password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
          required
        ></v-text-field>

        <v-btn
          type="submit"
          class="mb-6"
          color="blue"
          size="large"
          variant="tonal"
          block
        >
          Log In
        </v-btn>
      </form>

      <v-card-text class="text-center">
        <a
          @click.prevent="goToRegister"
          class="text-blue text-decoration-none"
          href="#"
        >
          Sign up now
          <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { login } from "../auth";

const visible = ref(false);
const email = ref("");
const password = ref("");
const router = useRouter();

const handleLogin = async () => {
  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", {
      email: email.value,
      password: password.value,
    });
    console.log("Login Success:", res.data);
    login(res.data.token);
    router.push("/dashboard");
  } catch (err) {
    console.error("Login Failed:", err);
  }
};

const goToRegister = () => {
  router.push("/register");
};
</script>
