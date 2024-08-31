import { createContext, useContext, useState } from "react";

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

  return (
    <AppContext.Provider value={{ auth, setAuth }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
