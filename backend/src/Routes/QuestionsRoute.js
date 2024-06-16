import express from 'express'

import { createTheoryQuestion } from '../Controllers/TheoryQuestionController.js'
import { createObjectiveQuestion } from '../Controllers/ObjectiveQuestionController.js'
import { addTheoryQuestion } from '../Controllers/LoadOnlyTheory.js'
import authMiddleware, {} from '../Middlewares/Authorization.js'

const Questionrouter = express.Router()

Questionrouter.post('/createTheory',authMiddleware,createTheoryQuestion )
Questionrouter.post('/createObjective',authMiddleware, createObjectiveQuestion );
Questionrouter.post('/addTheoryQuestions',authMiddleware, addTheoryQuestion )

export default Questionrouter;