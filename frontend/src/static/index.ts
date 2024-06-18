const host = window.location.hostname;
const isLocal = host === "localhost" || host === "127.0.0.1";

// TODO: Change name of local storage key after project name has been decided
export const APP_NAME = "Grade AI";
export const APP_NAME_TWO = APP_NAME.replace(/\s/g, "-").toLowerCase();
export const AUTH_TOKEN = `${APP_NAME_TWO}-auth-token${
  isLocal ? "-local" : ""
}`;
export const USER = `${APP_NAME_TWO}-user${isLocal ? "-local" : ""}`;

export const loginTabs = ["Student", "Teacher"];
export const questionTabs = ["Theory", "Objective"];
export const teacherPages = [
  {
    name: "Dashboard",
    path: "",
  },
  {
    name: "Setup Exam",
    path: "teacher/setup-exam",
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
  "12:00 AM",
  "12:30 AM",
  "1:00 AM",
  "1:30 AM",
  "2:00 AM",
  "2:30 AM",
  "3:00 AM",
  "3:30 AM",
  "4:00 AM",
  "4:30 AM",
  "5:00 AM",
  "5:30 AM",
  "6:00 AM",
  "6:30 AM",
  "7:00 AM",
  "7:30 AM",
  "8:00 AM",
  "8:30 AM",
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
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
];

export const examOptions: ["a", "b", "c", "d"] = ["a", "b", "c", "d"];
