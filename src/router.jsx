import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./layout";
import { AboutPage } from "./pages/about";
import { AccountPage } from "./pages/account";
import { AdminTopicsPage } from "./pages/admin/topics";
import { AdminUsersPage } from "./pages/admin/users";
import { BookmarksPage } from "./pages/bookmarks";
import { EditPage } from "./pages/edit";
import { EditPageLoaderFunction } from "./pages/edit/loader";
import { ErrorPage } from "./pages/error";
import { HomePage } from "./pages/home";
import { HomePageLoaderFunction } from "./pages/home/loader";
import { ReadPage } from "./pages/read";
import { ReadPageLoaderFunction } from "./pages/read/loader";
import { SearchResultsPage } from "./pages/search-results";
import { SignInPage } from "./pages/sign-in";
import { SignUpPage } from "./pages/sign-up";
import { UserPage } from "./pages/user";
import { UserPageLoaderFunction } from "./pages/user/loader";
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
      },
      {
        path: "sign-up",
        element: <SignUpPage />,
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
        loader: ReadPageLoaderFunction,
      },
      {
        path: "user/:id",
        element: <UserPage />,
        loader: UserPageLoaderFunction,
      },
      {
        path: "bookmarks",
        element: <BookmarksPage />,
      },
      {
        path: "edit/:id",
        element: <EditPage />,
        loader: EditPageLoaderFunction,
      },
      {
        path: "admin",
        children: [
          {
            path: "topics",
            element: <AdminTopicsPage />,
          },
          {
            path: "users",
            element: <AdminUsersPage />,
          },
        ],
      },
    ],
  },
]);
