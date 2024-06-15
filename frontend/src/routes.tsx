import { createBrowserRouter } from "react-router-dom";
import Layout from "@/components/Layout";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import TestConstruct from "@/pages/teacher-pages/TestConstruct";
import StudentOverview from "@/pages/teacher-pages/StudentOverview";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import TeacherRoute from "@/components/layout/TeacherRoute";
import StudentRoute from "./components/layout/StudentRoute";
import ExamPage from "./pages/student-pages/ExamPage";
import ResultPage from "./pages/student-pages/ResultPage";
import ErrorPage from "./pages/ErrorPage";

export const router = createBrowserRouter([
  { path: "login", element: <Login />, errorElement: <ErrorPage /> },
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "teacher/setup-test",
        element: (
          <ProtectedRoute>
            <TeacherRoute>
              <TestConstruct />
            </TeacherRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "teacher/student-overview",
        element: (
          <ProtectedRoute>
            <TeacherRoute>
              <StudentOverview />
            </TeacherRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "student/exam",
        element: (
          <ProtectedRoute>
            <StudentRoute>
              <ExamPage />
            </StudentRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "student/result",
        element: (
          <ProtectedRoute>
            <StudentRoute>
              <ResultPage />
            </StudentRoute>
          </ProtectedRoute>
        ),
      },
    ],
  },
]);