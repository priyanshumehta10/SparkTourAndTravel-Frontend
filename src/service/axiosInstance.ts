import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // frontend reads from env
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default api;
