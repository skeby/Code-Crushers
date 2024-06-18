const user = "/user";

export const paths = {
  teacher: {
    register: `${user}/registerTeacher`,
    login: `${user}/loginTeacher`,
    createTheory: `${user}/createTheory`,
    createObjective: `${user}/createObjective`,
    createExam: `${user}/createExam`,
    addTheoryQuestions: `${user}/addTheoryQuestions`,
    getAllStudents: `${user}/getAllStudents`,
    getTeacherById: `${user}/getTeacherById`,
    getExamById: `${user}/getExamById`,
    getStudentsByExamId: `${user}/getStudentsByExam`,
  },
  student: {
    register: `${user}/registerStudent`,
    login: `${user}/loginStudent`,
    getExamById: `${user}/getExamById`,
    answerObjective: `${user}/answerObjective`,
    answerTheory: `${user}/answerTheory`,
    getObjectiveById: `${user}/getObjectiveById`,
    getTheoryById: `${user}/getTheoryById`,
    getStudentById: `${user}/getStudentById`,
  },
};
