import api from "./axiosInstance.ts";

export async function getHomeData() {
  const response = await api.get("/api/packages/"); 
  return response.data;
}
