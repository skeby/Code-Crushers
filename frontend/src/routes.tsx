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
    element: (
      <Layout>
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </Layout>
    ),
  },
  { path: "/login", element: <Login /> },
  { path: "/setup-test", element: <TestConstruct /> },
  { path: "/student-overview", element: <StudentOverview /> },
]);

