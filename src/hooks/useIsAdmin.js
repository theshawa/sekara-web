import { useMemo } from "react";
import { useAppContext } from "../context";
import { USER_ROLES } from "../globals";

export const useIsAdmin = () => {
  const { auth } = useAppContext();
  return useMemo(() => {
    return auth?.role === USER_ROLES.admin;
  }, [auth]);
};
