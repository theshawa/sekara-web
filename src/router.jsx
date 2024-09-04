import { createBrowserRouter } from "react-router-dom";
import { LandingPage } from "./pages";
import { AccountPage } from "./pages/app/account";
import { AdminTopicsPage } from "./pages/app/admin/topics";
import { AdminUsersPage } from "./pages/app/admin/users";
import { AppLayout } from "./pages/app/app-layout";
import { BookmarksPage } from "./pages/app/bookmarks";
import { EditPage } from "./pages/app/edit";
import { EditPageLoaderFunction } from "./pages/app/edit/loader";
import { HiddenArticlePage } from "./pages/app/hidden-article";
import { HomePage } from "./pages/app/home";
import { HomePageLoaderFunction } from "./pages/app/home/loader";
import { ReadPage } from "./pages/app/read";
import { ReadPageLoaderFunction } from "./pages/app/read/loader";
import { UserPage } from "./pages/app/user";
import { UserPageLoaderFunction } from "./pages/app/user/loader";
import { WritePage } from "./pages/app/write";
import { WritePageLoaderFunction } from "./pages/app/write/loader";
import { ErrorPage } from "./pages/error";
import { SignInPage } from "./pages/sign-in";
import { SignUpPage } from "./pages/sign-up";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        path: "sign-in",
        element: <SignInPage />,
      },
      {
        path: "sign-up",
        element: <SignUpPage />,
      },
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "app",
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <HomePage />,
            loader: HomePageLoaderFunction,
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
            path: "read/:id",
            element: <ReadPage />,
            loader: ReadPageLoaderFunction,
          },
          {
            path: "hidden/:id",
            element: <HiddenArticlePage />,
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
    ],
  },
]);
