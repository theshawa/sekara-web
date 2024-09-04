import { useEffect, useState } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import { LoadingSpinner } from "../common/loading-spinner";
import { useAppContext } from "../context";
import { ScrollToSection } from "./scroll-to-section";

const LoadingScreen = () => {
  return (
    <div className="w-full h-screen fixed z-[99999] top-0 left-0 bg-slate-50 flex items-center justify-center">
      {/* <div className="size-5 rounded-full border-2  border-transparent border-b-slate-600 border-r-slate-600 animate-spin"></div> */}
      <LoadingSpinner />
    </div>
  );
};

export const Layout = () => {
  const { state } = useNavigation();
  const [loading, setLoading] = useState(true);
  const { setAuth } = useAppContext();

  // This effect will run twice if we use React.StrictMode
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

  if (
    !(location.pathname.startsWith("/app?") || location.pathname === "/app") &&
    (state === "loading" || state === "submitting" || loading)
  ) {
    return <LoadingScreen />;
  }

  return (
    <>
      <ScrollToSection />
      <Outlet />
    </>
  );
};
