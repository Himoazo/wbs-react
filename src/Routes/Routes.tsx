import { createBrowserRouter } from "react-router-dom";
import Layout from "../Components/Layout";
import HomePage from "../Pages/HomePage";
import LoginPage from "../Pages/LoginPage";
import ProductManagerPage from "../Pages/ProductManagerPage";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/login",
                element: <LoginPage />
            },
            {
                path: "/manager",
                element: (
                    <ProtectedRoute> 
                        <ProductManagerPage />
                    </ProtectedRoute >
                )
            }
        ]
    }
    
]);

export default router;