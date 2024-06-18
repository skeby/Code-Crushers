import express from 'express'

import { createTheoryQuestion } from '../Controllers/TheoryQuestionController.js'
import { createObjectiveQuestion } from '../Controllers/ObjectiveQuestionController.js'
import authMiddleware, {} from '../Middlewares/Authorization.js'

const QuestionRouter = express.Router()

Questionrouter.post('/createTheory',authMiddleware,createTheoryQuestion )
Questionrouter.post('/createObjective',authMiddleware, createObjectiveQuestion );

export default QuestionRouter;