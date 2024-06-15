import TheoryQuestion from '../Models/TheoryQuestionModel.js';
import Teacher from '../Models/TeacherModels.js';
import Exam from '../Models/ExamModel.js';

export const createTheoryQuestion = async (req, res) => {
    try {
        const { course, startTime, endTime, questionText, creator } = req.body;

        if (!questionText || !creator || !endTime || !startTime || !course) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newExam = new Exam({
            questionType: 'theory',
            questionText,
            startTime,
            endTime,
            course,
            creator
        });

        const savedExam = await newExam.save();

        const theoryQuestion = new TheoryQuestion({
            question: savedExam._id
        });

        const savedTheoryQuestion = await theoryQuestion.save();

        const teacher = await Teacher.findById(creator);
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        teacher.createdExams.push(savedExam._id);
        await teacher.save();

        res.status(201).json({ message: 'Theory question uploaded successfully!', savedTheoryQuestion });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
