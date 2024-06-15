import { createBrowserRouter } from "react-router-dom";
import Layout from "@/components/Layout";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import TestConstruct from "./pages/teacher-pages/TestConstruct";
import StudentOverview from "./pages/teacher-pages/StudentOverview";
import ProtectedRoute from "./components/layout/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (<Layout />),
    children: [
      {
        path: "/", element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>)
      },
      { path: "login", element: <Login /> },
      {
        path: "setup-test", element: (
        <ProtectedRoute>
          <TestConstruct />
        </ProtectedRoute>
        )
      },
      {
        path: "student-overview", element: (
        <ProtectedRoute>
          <StudentOverview />
        </ProtectedRoute>)
      },
    ],
  },
]);
