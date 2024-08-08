import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "./layout";
import { HomePage } from "./pages/home";
import { NotFoundPage } from "./pages/not-found";
import { AdminArticlePage } from "./pages/AdminArticlePage";
import { ArticlePage } from "./pages/ArticlePage";
import Profile from "./pages/Profile";

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
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
