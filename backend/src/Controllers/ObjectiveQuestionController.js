import ObjectiveQuestion from '../Models/ObjectiveQuestionModel.js';
import Exam from '../Models/ExamModel.js';
import Teacher from '../Models/TeacherModel.js';

export const createObjectiveQuestion = async (req, res) => {
    try {
        const { course, examId, questionText, options, correctOption, creator } = req.body;

        if (!questionText || !options || !correctOption || !course || !examId) {
            return res.status(400).json({ message: 'All fields are required' });
        }
          
        const existingQuestion = await ObjectiveQuestion.findOne({ questionText, examId });
        if (existingQuestion) {
            return res.status(400).json({ message: 'This question already exists in this exam' });
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
        if(newQuestion.course !== exam.course ){
            return res.status(404).json({ message: 'course does not match the exam course' });
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

export const GetObjectiveById = async (req, res) => {
    try {
        const objectiveId = req.params.objectiveId; 
  
        const Objective= await ObjectiveQuestion.findById(objectiveId);
        if (!Objective) {
            return res.status(404).json({ message: 'Objective not found' });
        }
        res.status(200).json(Objective);
    } catch (error) {
        console.error('Error fetching Objective by ID:', error);
        res.status(500).json({ message: 'Server error' });
    }
  };
  
  
  export const GetAllObjectives = async (req, res) => {
    try {
        const Objectives = await ObjectiveQuestion.find();
  
        if (Objectives.length === 0) {
            return res.status(404).json({ message: 'No Objectives found' });
        }
        res.status(200).json(Objectives);
    } catch (error) {
        console.error('Error fetching all Objectives:', error);
        res.status(500).json({ message: 'Server error' });
    }
  };
