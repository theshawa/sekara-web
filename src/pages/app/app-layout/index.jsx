import { Outlet } from "react-router-dom";
import { Header } from "./header";

export const AppLayout = () => {
  return (
    <>
      <Header />
      <main className="max-w-screen-xl mx-auto px-5">
        <Outlet />
      </main>
    </>
  );
};
