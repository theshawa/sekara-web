import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "./layout";
import { HomePage } from "./pages/home";
import { NotFoundPage } from "./pages/not-found";
import { AdminArticlePage } from "./pages/AdminArticlePage";
import { ArticlePage } from "./pages/ArticlePage";

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/article" element={<ArticlePage />} />
          <Route path="/admin-article" element={<AdminArticlePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
