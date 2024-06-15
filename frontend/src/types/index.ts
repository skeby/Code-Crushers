export type UserType = "Student" | "Teacher";

export interface User<T extends UserType> {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  status: string;
  type: T;
  matricNumber?: T extends "Student" ? string : never;
  registrationNumber?: T extends "Teacher" ? string : never;
}

export type Theme = "dark" | "light" | "system";
