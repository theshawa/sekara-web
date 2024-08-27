import { Outlet, useLocation, useNavigation } from "react-router-dom";
import { Header } from "./header";
import { LoadingScreen } from "./loading-screen";

export const AppLayout = () => {
  const location = useLocation();

  const { state } = useNavigation();

  const hideOnTheseRoutes = ["/sign-in", "/sign-up"];

  return (
    <>
      {!hideOnTheseRoutes.includes(location.pathname) ? <Header /> : null}
      <main>
        <Outlet />
      </main>
      {(state === "loading" || state === "submitting") && <LoadingScreen />}
    </>
  );
};
