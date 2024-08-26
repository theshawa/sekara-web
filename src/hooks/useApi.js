import axios from "axios";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context";

export const useApi = (redirect = false) => {
  const { setAuth, auth } = useAppContext();
  const navigate = useNavigate();
  return useMemo(() => {
    const headers = {};
    if (auth) {
      headers.Authorization = `Bearer ${auth.token}`;
    }
    const api = axios.create({
      baseURL: "http://localhost:5000",
      timeout: 10 * 1000,
      headers,
    });
    api.interceptors.response.use(
      (res) => res,
      (err) => {
        if (auth && err.response?.status === 401) {
          alert("Session expired, please sign-in again");
          setAuth(null);
          localStorage.removeItem("auth");
          if (redirect) navigate("/sign-in");
        } else {
          const message = err.response?.data?.message || "unknown error";
          alert(`An error occurred: ${message}`);
        }
        return Promise.reject(err);
      }
    );
    return api;
  }, [auth, setAuth, navigate, redirect]);
};
