import axios from "axios";
import { SERVER_URL } from "./globals";

export const api = axios.create({
  baseURL: SERVER_URL,
  timeout: 10 * 1000,
});

export const apiWithAuth = () =>
  axios.create({
    baseURL: SERVER_URL,
    timeout: 10 * 1000,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("auth")}`,
    },
  });
