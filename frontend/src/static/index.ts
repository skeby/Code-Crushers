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
export const times = [
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
  "9:30 PM",
  "10:00 PM",
  "10:30 PM",
  "11:00 PM",
  "11:30 PM",
  "12:00 AM",
];
