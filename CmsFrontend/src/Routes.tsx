import { createBrowserRouter } from "react-router-dom";
import ArticlesListPage from "./pages/ArticlesListPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout";
import ArticleDetailsPage from "./pages/ArticleDetailsPage";
import CreateArticlePage from "./pages/CreateArticlePage"; // Import the new page
import EditArticlePage from "./pages/EditArticlePage";

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
                path: "articles/:id",
                element: <ArticleDetailsPage />,
            },
            // Add the Admin Create route here 
            {
                path: "admin/create",
                element: <CreateArticlePage />,
            },

            {
                path: "admin/edit/:id",
                element: <EditArticlePage />,
            }
        ]
    }
]);