import dotenv from "dotenv";
import Exam from "../Models/ExamModel.js";
import Student from "../Models/StudentModel.js";
dotenv.config();

export const canTakeExam = async (req, res, next) => {
    try {
        const { examId } = req.params;
        const studentId = req.user.id;

        if (req.user.role !== 'Student') {
            return res.status(403).json({ message: 'You are not authorized to take this exam' });
        }

        const exam = await Exam.findById(examId);
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }

        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const isRegistered = student.registeredCourses.includes(exam.course);
        if (!isRegistered) {
            return res.status(403).json({ message: 'Student is not registered for this course' });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export default canTakeExam;