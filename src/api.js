import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 10 * 1000,
});

export const apiWithAuth = () =>
  axios.create({
    baseURL: "http://localhost:5000",
    timeout: 10 * 1000,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("auth")}`,
    },
  });
