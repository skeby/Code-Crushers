import express from 'express'
import { GetAllStudents, GetStudentById, LoginStudent, RegisterStudent } from '../Controllers/StudentController.js'

const StudentRouter = express.Router()

StudentRouter .post('/registerStudent', RegisterStudent)
StudentRouter .post('/loginStudent', LoginStudent );
StudentRouter.get('/getStudentById/:studentId', GetStudentById)
StudentRouter.get('/getAllStudents', GetAllStudents)

export default StudentRouter ;