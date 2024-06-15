import { createBrowserRouter } from "react-router-dom";
import Layout from "@/components/Layout";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import TestConstruct from "./pages/teacher-pages/TestConstruct";
import StudentOverview from "./pages/teacher-pages/StudentOverview";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "login", element: <Login /> },
      { path: "setup-test", element: <TestConstruct /> },
      { path: "student-overview", element: <StudentOverview /> },
    ],
  },
]);
