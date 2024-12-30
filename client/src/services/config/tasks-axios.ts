import axios, { InternalAxiosRequestConfig } from "axios";

export const TaskAPI = axios.create({
  baseURL: "http://localhost:8080/task",
});

TaskAPI.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("authToken");
  console.log(token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
