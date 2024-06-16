import express from 'express'

import { LoginTeacher, RegisterTeacher } from '../Controllers/TeacherController.js'

const TeacherRouter = express.Router()

TeacherRouter.post('/registerTeacher', RegisterTeacher)
TeacherRouter.post('/loginTeacher', LoginTeacher );

export default TeacherRouter;