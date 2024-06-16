import ObjectiveQuestion from '../Models/ObjectiveQuestionModel.js';
import Exam from '../Models/ExamModel.js';
import Teacher from '../Models/TeacherModel.js';

export const createObjectiveQuestion = async (req, res) => {
    try {
        const { course, examId, questionText, options, correctOption, creator } = req.body;

        if (!questionText || !options || !correctOption || !course || !examId) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newQuestion = new ObjectiveQuestion({
            questionType: 'objective',
            examId,
            question: questionText,
            course,
            options,
            correctOption
        });

        const savedQuestion = await newQuestion.save();

        const exam = await Exam.findById(examId);
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }

        exam.objectiveQuestions.push(savedQuestion._id);
        await exam.save();

        const teacher = await Teacher.findById(creator);
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        teacher.createdExams.push(exam._id);
        await teacher.save();

        res.status(201).json({ message: 'Objective question uploaded successfully!', savedQuestion });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
