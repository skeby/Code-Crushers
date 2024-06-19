import express from "express";

import {
  GetAllTheories,
  GetTheoryById,
  createTheoryQuestion,
} from "../Controllers/TheoryQuestionController.js";
import {
  GetAllObjectives,
  GetObjectiveById,
  createObjectiveQuestion,
} from "../Controllers/ObjectiveQuestionController.js";
import { authMiddleware } from "../Middlewares/Authorization.js";
import {
  GetAllExams,
  GetExamById,
  createExam,
} from "../Controllers/ExamController.js";

const AIRouter = express.Router();

// AIRouter.post('/getObjectiveById/:objectiveId', getAiR)
// QuestionRouter.get('/getAllObjectives', GetAllObjectives)

export default AIRouter;
