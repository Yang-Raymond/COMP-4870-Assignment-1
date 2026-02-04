import { createBrowserRouter } from "react-router-dom";
import ArticlesListPage from "./pages/ArticlesListPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout";
import ArticleDetailsPage from "./pages/ArticleDetailsPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "articles",
                element: <ArticlesListPage />,
            },
            {
                path: "login",
                element: <LoginPage />,
            },
            {
                path:"articles/:id",
                element: <ArticleDetailsPage />,
            }
        ]
    }
]);