import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ArticlesListPage from "./pages/ArticlesListPage";
import ArticleDetailsPage from "./pages/ArticleDetailsPage";
import LoginPage from "./pages/LoginPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="articles" element={<ArticlesListPage />} />
          <Route path="articles/:id" element={<ArticleDetailsPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<p>Not found</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
