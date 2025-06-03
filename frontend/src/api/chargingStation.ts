// src/api/chargingStation.ts
import axios from 'axios'

const chargingAPI = axios.create({
  baseURL: `process.env.CHARGINGSTATION_URL`,
})

chargingAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default chargingAPI
