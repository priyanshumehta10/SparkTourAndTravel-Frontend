import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // frontend reads from env,
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export const apiFile = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // frontend reads from env,
  withCredentials: true, 
  timeout: 20000,
});

