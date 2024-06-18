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
import ExamOverview from "./pages/student-pages/ExamOverview";
import TakeExam from "./pages/student-pages/TakeExam";
import { apiCall } from "./services";
import { paths } from "./services/static";

export const router = createBrowserRouter([
  { path: "login", element: <Login />, errorElement: <ErrorPage /> },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "teacher/setup-test",
        element: (
          <TeacherRoute>
            <TestConstruct />
          </TeacherRoute>
        ),
      },
      {
        path: "teacher/student-overview",
        element: (
          <TeacherRoute>
            <StudentOverview />
          </TeacherRoute>
        ),
      },
      {
        path: "student/exam",
        element: (
          <StudentRoute>
            <ExamPage />
          </StudentRoute>
        ),
        children: [
          {
            index: true,
            element: <ExamOverview />,
          },
          {
            path: ":examId",
            element: <TakeExam />,
            loader: ({ params }) => {
              const { examId } = params;
              return apiCall(
                {},
                `${paths.student.getExamById}/${examId}`,
                "get"
              );
            },
          },
        ],
      },
      {
        path: "student/result",
        element: (
          <StudentRoute>
            <ResultPage />
          </StudentRoute>
        ),
      },
    ],
  },
]);
