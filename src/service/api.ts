import {api} from "./axiosInstance.ts";
import {apiFile} from "./axiosInstance.ts";
export async function getHomeData() {
  const response = await api.get("/api/packages/"); 
  return response.data;
}
export const loginUser = async (email: string, password: string) => {
  const response = await api.post("/api/auth/login", { email, password });
  return response.data;
};

export const checkLoginAPI = async () => {
  const response = await api.get("/api/auth/me");
  return response.data;
};

export const checkLogOutAPI = async () => {
  const response = await api.post("/api/auth/logout");
  return response.data;
};

export async function getUsersData() {
  const response = await api.get("/api/auth/admin/users"); 
  return response.data;
}

export async function deleteUserAPI(id:string) {
  const response = await api.get(`/api/auth/admin/users/${id}`); 
  return response.data;
}

export async function updateUserAPI(
  name: string,
  email: string,
  role: string,
  id: string
) {
  const response = await api.put(`/api/auth/admin/${id}`, { name, email, role });
  return response.data;
}

export async function getInquiryData() {
  const response = await api.get("/api/inquiries/admin/"); // adjust endpoint
  return response.data.data; // extract data array
}

export async function deleteInquiryAPI(id:string) {
  const response = await api.delete(`/api/inquiries/admin/${id}`); 
  return response.data;
}

export async function getDashboardAPI() {
  const response = await api.get(`/api/admin/dashboard`); 
  return response.data;
}


export async function getReviewData() {
  const response = await api.get("/api/review"); 
  return response.data.reviews; 
}

export async function deleteReviewAPI(id:string) {
  const response = await api.delete(`/api/review/admin/${id}`); 
  return response.data;
}

export async function CreateReviewData(data: any) {
  const response = await api.post("/api/review/admin",data); 
  return response.data.reviews; 
}

export async function getPackagesData() {
  const response = await api.get("/api/packages/"); 
  return response.data; 
}

export async function deletePackageAPI(id:string) {
  const response = await api.delete(`/api/packages/admin/${id}`); 
  return response.data;
}

export async function createPackageData(data: any) {
  const response = await apiFile.post("/api/packages/admin/",data); 
  return response.data; 
}

export async function getPackageData(id:string) {
  const response = await api.get(`/api/packages/${id}`); 
  return response.data; 
}

export async function editPackageData(updateData: FormData) {
  const id = updateData.get("_id"); 
  const response = await apiFile.put(`/api/packages/admin/${id}`, updateData);
  return response.data;
}
