import express from 'express'

import { LoginStudent, RegisterStudent } from '../Controllers/StudentController.js'

const StudentRouter = express.Router()

StudentRouter .post('/registerStudent', RegisterStudent)
StudentRouter .post('/loginStudent', LoginStudent );

export default StudentRouter ;