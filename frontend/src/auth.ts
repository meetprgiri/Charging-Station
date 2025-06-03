// src/auth.ts
import { ref } from 'vue';

export const isAuthenticated = ref(!!localStorage.getItem('token'));

export const login = (token: string) => {
  localStorage.setItem('token', token);
  isAuthenticated.value = true;
};

export const logout = () => {
  localStorage.removeItem('token');
  isAuthenticated.value = false;
};
