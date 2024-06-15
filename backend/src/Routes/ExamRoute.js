import express from 'express'

import { submitObjectiveAnswer } from '../Controllers/AnswerObjectives.js'
import { submitTheoryAnswer } from '../Controllers/AnswerTheory.js'


const AnswerRouter = express.Router()

AnswerRouter.post('/answerObjective',submitObjectiveAnswer )
AnswerRouter.post('/answerTheory',submitTheoryAnswer )


export default AnswerRouter;