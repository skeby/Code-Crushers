import { createBrowserRouter } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import TestConstruct from "./pages/teacher-pages/TestConstruct";
import Layout from "@/components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "login", element: <Login /> },
      { path: "setup-test", element: <TestConstruct /> },
    ],
  },
]);
