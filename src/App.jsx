import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "./layout";
import { HomePage } from "./pages/home";
import { NotFoundPage } from "./pages/not-found";

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
