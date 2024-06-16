const host = window.location.hostname;
const isLocal = host === "localhost" || host === "127.0.0.1";

// TODO: Change name of local storage key after project name has been decided
export const APP_NAME = "Script";
export const AUTH_TOKEN = `${APP_NAME.toLowerCase()}-auth-token${
  isLocal ? "-local" : ""
}`;
export const USER = `${APP_NAME.toLowerCase()}-user${isLocal ? "-local" : ""}`;

export const loginTabs = ["Student", "Teacher"];
export const teacherPages = [
  {
    name: "Dashboard",
    path: "",
  },
  {
    name: "Setup Test",
    path: "teacher/setup-test",
  },
  {
    name: "Student Overview",
    path: "teacher/student-overview",
  },
];
export const studentPages = [
  {
    name: "Dashboard",
    path: "",
  },
  {
    name: "Exam",
    path: "student/exam",
  },
  {
    name: "Result",
    path: "student/result",
  },
];
