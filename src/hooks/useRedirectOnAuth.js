import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context";

export const useRedirectOnAuth = ({
  redirectTo = "/",
  authRequired = false,
}) => {
  const { auth } = useAppContext();

  const navigate = useNavigate();

  useEffect(() => {
    if ((authRequired && !auth) || (!authRequired && auth)) {
      navigate(redirectTo, { replace: true });
    }
  }, [auth, navigate, redirectTo, authRequired]);
};
