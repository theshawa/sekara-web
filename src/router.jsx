import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./layout";
import { AboutPage } from "./pages/about";
import { AccountPage } from "./pages/account";
import { ErrorPage } from "./pages/error";
import { HomePage } from "./pages/home";
import { HomePageLoaderFunction } from "./pages/home/loader";
import { ReadPage } from "./pages/read";
import { ReadPageLoader } from "./pages/read/loader";
import { SearchResultsPage } from "./pages/search-results";
import { SignInPage } from "./pages/sign-in";
import { SignInActionFunction } from "./pages/sign-in/action";
import { SignUpPage } from "./pages/sign-up";
import { SignUpActionFunction } from "./pages/sign-up/action";
import { WritePage } from "./pages/write";
import { WritePageLoaderFunction } from "./pages/write/loader";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: HomePageLoaderFunction,
      },
      {
        path: "sign-in",
        element: <SignInPage />,
        action: SignInActionFunction,
      },
      {
        path: "sign-up",
        element: <SignUpPage />,
        action: SignUpActionFunction,
      },
      {
        path: "account",
        element: <AccountPage />,
      },
      {
        path: "write",
        element: <WritePage />,
        loader: WritePageLoaderFunction,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "search-results",
        element: <SearchResultsPage />,
      },
      {
        path: "read/:id",
        element: <ReadPage />,
        loader: ReadPageLoader,
      },
    ],
  },
]);
