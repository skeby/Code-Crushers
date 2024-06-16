import express from 'express'

import { createTheoryQuestion } from '../Controllers/TheoryQuestionController.js'
import { createObjectiveQuestion } from '../Controllers/ObjectiveQuestionController.js'
import { addTheoryQuestion } from '../Controllers/LoadOnlyTheory.js'
import authMiddleware, {} from '../Middlewares/Authorization.js'
import { createExam } from '../Controllers/ExamController.js'

const QuestionRouter= express.Router()


Questionrouter.post('/addTheoryQuestions',authMiddleware, addTheoryQuestion );
// Questionrouter.get('/getTheoryQuestions', authMiddleware, getTheoryQuestions) ;
QuestionRouter.post('/createExam',authMiddleware, createExam)
QuestionRouter.post('/createTheory',authMiddleware,createTheoryQuestion )
QuestionRouter.post('/createObjective',authMiddleware, createObjectiveQuestion );


export default QuestionRouter;