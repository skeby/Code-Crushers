export type Role = "student" | "teacher";

export interface User<T extends Role> {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: T;
  takenExams?: T extends "student" ? TakenExam[] : never;
  registeredCourses?: T extends "student" ? string[] : never;
  createdExams?: T extends "teacher" ? CreatedExams : never;
  department?: T extends "teacher" ? string : never;
  // matricNumber?: T extends "student" ? string : never;
  // registrationNumber?: T extends "teacher" ? string : never;
}

export type CreatedExams = (string | null)[];

export interface TakenExam {
  examId: string;
  course: string;
  score: number;
  feedback?: string;
}

export type Theme = "dark" | "light" | "system";

export interface QuestionResult {
  id: string;
  question: string;
  answer: string;
  score: number;
  feedback: string;
}

export interface TeacherQuestion {
  id: string;
  text: string;
  guidelines: string[];
  createdBy: string;
  createdAt: Date;
}

export interface StudentQuestion {
  id: string;
  text: string;
}

export interface StudentExam {
  _id: string;
  course: string;
  startTime: Date;
  endTime: Date;
  objectiveQuestions: string[];
  theoryQuestions: string[];
}

export interface StudentAnswer {
  questionId: string;
  answer: string;
}

export interface StudentExamResult {
  title: string;
  totalScore: number;
  questions: QuestionResult[];
}
