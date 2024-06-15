import express from 'express'

import { LoginTeacher, RegisterTeacher } from '../Controllers/TeacherController.js'

const router = express.Router()

router.post('/registerTeacher', RegisterTeacher)
router.post('/loginTeacher', LoginTeacher );

export default router;