import { Outlet, useNavigation } from "react-router-dom";
import { LoadingScreen } from "./app/app-layout/loading-screen";
import { ScrollToSection } from "./scroll-to-section";

export const Layout = () => {
  const { state } = useNavigation();
  if (
    !location.pathname.startsWith("/app") &&
    (state === "loading" || state === "submitting")
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
