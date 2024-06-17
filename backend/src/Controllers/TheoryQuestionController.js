import TheoryQuestion from "../Models/TheoryQuestionModel.js";
import Teacher from "../Models/TeacherModel.js";
import Exam from "../Models/ExamModel.js";

export const createTheoryQuestion = async (req, res) => {
    try {
        const { course, examId, questionText, creator,correctAnswer } = req.body;

        if (!questionText || !correctAnswer || !course || !examId) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newQuestion = new TheoryQuestion({
            questionType: 'theory',
            examId,
            question: questionText,
            course,
            correctAnswer
        });

        const savedQuestion = await newQuestion.save();

        const exam = await Exam.findById(examId);
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }

        exam.theoryQuestions.push(savedQuestion._id);
        await exam.save();

        const teacher = await Teacher.findById(creator);
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        teacher.createdExams.push(exam._id);
        await teacher.save();

        res.status(201).json({ message: 'Theory question uploaded successfully!', savedQuestion });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const GetTheoryById = async (req, res) => {
    try {
        const theoryId = req.params.theoryId; 
  
        const Theory= await TheoryQuestion.findById(theoryId);
        if (!Theory) {
            return res.status(404).json({ message: 'Theory not found' });
        }
        res.status(200).json(Theory);
    } catch (error) {
        console.error('Error fetching Theory by ID:', error);
        res.status(500).json({ message: 'Server error' });
    }
  };
  
  
  export const GetAllTheories = async (req, res) => {
    try {
        const Theories  = await TheoryQuestion.find();
  
        if (Theories.length === 0) {
            return res.status(404).json({ message: 'No Theories found' });
        }
        res.status(200).json(Theories);
    } catch (error) {
        console.error('Error fetching all Theories :', error);
        res.status(500).json({ message: 'Server error' });
    }
  };
