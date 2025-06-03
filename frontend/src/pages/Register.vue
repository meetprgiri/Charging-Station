<template>
  <v-card class="mx-auto" style="max-width: 500px">
    <v-toolbar color="deep-purple-accent-4" cards dark flat>
      <v-btn icon @click="goback">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-card-title class="text-h6 font-weight-regular">Sign up</v-card-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-form
      ref="form"
      v-model="isValid"
      class="pa-4 pt-6"
      @submit.prevent="register"
    >
      <v-text-field
        v-model="name"
        :rules="[rules.required]"
        color="deep-purple"
        label="Full Name"
        variant="filled"
      ></v-text-field>

      <v-text-field
        v-model="password"
        :rules="[rules.password, rules.length(6)]"
        color="deep-purple"
        counter="6"
        label="Password"
        style="min-height: 96px"
        type="password"
        variant="filled"
      ></v-text-field>

      <v-text-field
        v-model="email"
        :rules="[rules.email]"
        color="deep-purple"
        label="Email address"
        type="email"
        variant="filled"
      ></v-text-field>

      <v-checkbox
        v-model="agreement"
        :rules="[rules.required]"
        color="deep-purple"
      >
        <template v-slot:label>
          I agree to the&nbsp;
          <a href="#" @click.stop.prevent="dialog = true">Terms of Service</a>
          &nbsp;and&nbsp;
          <a href="#" @click.stop.prevent="dialog = true">Privacy Policy</a>*
        </template>
      </v-checkbox>
    </v-form>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn variant="text" @click="form.reset()">Clear</v-btn>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="!isValid || isLoading"
        :loading="isLoading"
        color="deep-purple-accent-4"
        @click="register"
      >
        Submit
      </v-btn>
    </v-card-actions>

    <v-dialog v-model="dialog" max-width="400" persistent>
      <v-card>
        <v-card-title class="text-h5 bg-grey-lighten-3">Legal</v-card-title>
        <v-card-text> Lorem ipsum dolor sit amet... </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            variant="text"
            @click="
              agreement = false;
              dialog = false;
            "
            >No</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn
            color="deep-purple"
            variant="tonal"
            @click="
              agreement = true;
              dialog = false;
            "
            >Yes</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import authAPI from "../api/auth";

const router = useRouter();

const form = ref();
const name = ref("");
const email = ref("");
const password = ref("");
const agreement = ref(false);
const dialog = ref(false);
const isValid = ref(false);
const isLoading = ref(false);

const rules = {
  email: (v) => !!(v || "").match(/@/) || "Please enter a valid email",
  length: (len) => (v) =>
    (v || "").length >= len || `Invalid character length, required ${len}`,
  password: (v) =>
    !!(v || "").match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
    "Password must contain an upper case letter, a numeric character, and a special character",
  required: (v) => !!v || "This field is required",
};

const register = async () => {
  if (!isValid.value || !agreement.value) return;
  isLoading.value = true;
  try {
    await authAPI.post("/register", {
      name: name.value,
      email: email.value,
      password: password.value,
    });
    router.push("/login");
  } catch (err) {
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

const goback = () => {
  router.push("/login");
};
</script>
