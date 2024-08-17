import { useRedirectOnAuth } from "../../hooks/useRedirectOnAuth";

export const WritePage = () => {
  useRedirectOnAuth({
    authRequired: true,
    redirectTo: "/sign-up",
  });
  return <>Write</>;
};
