import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useIsAdmin } from "./useIsAdmin";

export const useOnlyForAdmin = () => {
  const isAdmin = useIsAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      alert("You are not authorized to view this page");
      navigate("/");
    }
  }, [isAdmin, navigate]);
};
