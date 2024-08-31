import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context";

export const useHandleApiError = () => {
  const navigate = useNavigate();
  const { setAuth } = useAppContext();

  return useCallback(
    (error, command = "") => {
      if (error.response?.status === 401) {
        alert("Your session has expired. Please sign in again to continue.");
        localStorage.removeItem("auth");
        setAuth(null);
        navigate("/sign-in");
        return;
      }
      const errorMsg = error.response?.data?.message;
      alert(
        `Failed to ${command || "proceed"} due to an ${
          errorMsg
            ? `error: "${errorMsg}"`
            : "unknown error. Please try again later"
        }.`
      );
    },
    [navigate, setAuth]
  );
};
