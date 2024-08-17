import { Outlet, useLocation, useNavigation } from "react-router-dom";
import { LoadingScreen } from "../common/loading-screen";
import { Header } from "./header";

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
      {state === "loading" || (state === "submitting" && <LoadingScreen />)}
    </>
  );
};
