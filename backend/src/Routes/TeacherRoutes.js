import express from 'express'

import { GetAllTeachers, GetTeacherById, LoginTeacher, RegisterTeacher } from '../Controllers/TeacherController.js'

const TeacherRouter = express.Router()

TeacherRouter.post('/registerTeacher', RegisterTeacher)
TeacherRouter.post('/loginTeacher', LoginTeacher );
TeacherRouter.get('/getTeacherById/:teacherId', GetTeacherById)
TeacherRouter.get('/getAllTeachers', GetAllTeachers)
export default TeacherRouter;