import express from 'express'

import { GetAllTheories, GetTheoryById, createTheoryQuestion } from '../Controllers/TheoryQuestionController.js'
import { GetAllObjectives, GetObjectiveById, createObjectiveQuestion } from '../Controllers/ObjectiveQuestionController.js'
import {authMiddleware} from '../Middlewares/Authorization.js'
import { GetAllExams, GetExamById, createExam } from '../Controllers/ExamController.js'

const QuestionRouter= express.Router()

QuestionRouter.post('/createExam',authMiddleware, createExam)
QuestionRouter.post('/createTheory',authMiddleware,createTheoryQuestion )
QuestionRouter.post('/createObjective',authMiddleware, createObjectiveQuestion );
QuestionRouter.get('/getExamById/:examId', GetExamById)
QuestionRouter.get('/getAllExams', GetAllExams)
QuestionRouter.get('/getTheoryById/:theoryId', GetTheoryById)
QuestionRouter.get('/getAllTheories', GetAllTheories)
QuestionRouter.get('/getObjectiveById/:objectiveId', GetObjectiveById)
QuestionRouter.get('/getAllObjectives', GetAllObjectives)


export default QuestionRouter;