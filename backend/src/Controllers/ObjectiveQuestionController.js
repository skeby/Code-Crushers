import ObjectiveQuestion from '../Models/ObjectiveQuestionModel.js';
import Exam from '../Models/ExamModel.js';
import Teacher from '../Models/TeacherModels.js';

export const createObjectiveQuestion = async (req, res) => {
    try {
        const { course, startTime, endTime, questionText, options, correctOption,creator } = req.body;

        if (!questionText || !options || !correctOption || course || startTime || endTime ) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newExam = new Exam({
            questionType: 'objective',
            questionText,
            startTime,
            endTime,
            course,
            creator
        });

        const savedExam= await newExam.save();

        const objectiveQuestion = new ObjectiveQuestion({
            question: savedExam._id,
            options,
            correctOption
        });
        const savedObjectiveQuestion = await objectiveQuestion.save();

        const teacher = await Teacher.findById(creator);
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        teacher.createdExams.push(savedExam._id); 
        await teacher.save();

        

        res.status(201).json({ message: 'Objective question uploaded successfully!', savedObjectiveQuestion });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
