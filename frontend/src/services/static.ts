const user = "/user";

export const paths = {
  teacher: {
    register: `${user}/registerTeacher`,
    login: `${user}/loginTeacher`,
    createTheory: `${user}/createTheory`,
    createObjective: `${user}/createObjective`,
    createExam: `${user}/createExam`,
    addTheoryQuestions: `${user}/addTheoryQuestions`,
  },
  student: {},
};
