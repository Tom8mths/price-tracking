import axios from "axios";

export const financeApi = axios.create({
  baseURL: "/finance-api",
});

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});