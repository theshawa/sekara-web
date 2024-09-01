import axios from "axios";
import { API_URL } from "./globals";

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10 * 1000,
});

export const apiWithAuth = () =>
  axios.create({
    baseURL: API_URL,
    timeout: 10 * 1000,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("auth")}`,
    },
  });
