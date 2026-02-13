import { createBrowserRouter } from "react-router-dom";
import ArticlesListPage from "./pages/ArticlesListPage";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout";
import ArticleDetailsPage from "./pages/ArticleDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";

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
                path: "articles/:id",
                element: <ArticleDetailsPage />,
            },
            {
                path: "*",
                element: <NotFoundPage />,
            }
        ]
    }
]);