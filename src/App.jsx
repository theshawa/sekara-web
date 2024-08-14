import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { AppLayout } from "./layout";
import { HomePage } from "./pages/home";
import { NotFoundPage } from "./pages/not-found";
import { AdminArticlePage } from "./pages/AdminArticlePage";
import { ArticlePage } from "./pages/ArticlePage";
import Profile from "./assets/Profile";

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/article" element={<ArticlePage />} />
          <Route path="/admin-article" element={<AdminArticlePage />} />
          <Route path="/profile1" element={<Profile />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <div class="border-solid border-4 border-gray-600">
          <nav class="text-slate-50 bg-slate-900 grid space-x-5">

            <h1 class="text-slate-200">Navbar(Temporarily for navigate through pages)</h1>

            <NavLink to='/'>Home</NavLink>
            <NavLink to='/article'>Article page</NavLink>
            <NavLink to='/admin-article'>Admin article page</NavLink>


          </nav>
        </div>

      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
