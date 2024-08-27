import { createContext, useContext, useEffect, useState } from "react";
import { LoadingScreen } from "./layout/loading-screen";

/**
 * Auth Object =>
 * {
 *  token:string,
 *  user: {
 *      _id: string,
 *      email: string,
 *      firstName: string,
 *      lastName: string,
 *      role: string,
 *    }
 *  }
 *
 */

const AppContext = createContext({
  auth: null,
  setAuth: () => {},
});

export const AppContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authText = localStorage.getItem("auth");
    if (!authText) {
      setLoading(false);
      return;
    }
    const currentAuth = JSON.parse(authText);
    if (currentAuth.token && currentAuth.user) {
      setAuth(currentAuth);
    }
    setLoading(false);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <AppContext.Provider value={{ auth, setAuth }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
