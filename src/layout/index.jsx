import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigation } from "react-router-dom";
import { api } from "../api";
import { useAppContext } from "../context";
import { Header } from "./header";
import { LoadingScreen } from "./loading-screen";

export const AppLayout = () => {
  const location = useLocation();
  const { state } = useNavigation();
  const [loading, setLoading] = useState(true);
  const { setAuth } = useAppContext();

  // This effect will run twice as we are using React.StrictMode
  useEffect(() => {
    const handleLocalAuth = async () => {
      const storedToken = localStorage.getItem("auth");
      if (!storedToken) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await api.post("/user/validate-token", {
          token: storedToken,
        });
        if (data.user) setAuth(data.user);
        else localStorage.removeItem("auth");
      } catch (error) {
        const errorMsg = error.response?.data?.message;
        alert(
          `Failed to validate current session due to an ${
            errorMsg
              ? `error: "${errorMsg}"`
              : "unknown error. Please try again later"
          }.`
        );
        localStorage.removeItem("auth");
      } finally {
        setLoading(false);
      }
    };
    handleLocalAuth();
  }, []);

  if (state === "loading" || state === "submitting" || loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      {!["/sign-in", "/sign-up"].includes(location.pathname) ? (
        <Header />
      ) : null}
      <main>
        <Outlet />
      </main>
    </>
  );
};
