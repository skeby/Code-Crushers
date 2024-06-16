export type Role = "Student" | "Teacher";

export interface User<T extends Role> {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  // status: string;
  role: T;
  // exams?: T extends "Student" ? StudentExam[] : never;
  createdExams?: T extends "Teacher" ? CreatedExams : never;
  department?: T extends "Teacher" ? string : never;
  // matricNumber?: T extends "Student" ? string : never;
  // registrationNumber?: T extends "Teacher" ? string : never;
}

export type CreatedExams = (string | null)[];

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
  studentId: string;
  startTime: Date;
  endTime: Date;
  questions: StudentQuestion[];
  answers: StudentAnswer[];
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
