import { RouterProvider } from "react-router-dom";
import { AppContextProvider } from "./context";
import { router } from "./router";

function App() {
  return (
    <>
      <AppContextProvider>
        <RouterProvider router={router} />
      </AppContextProvider>
    </>
  );
}

export default App;
