// import TheoryQuestion from '../Models/TheoryQuestionModel.js';
import Teacher from '../Models/TeacherModels.js';
// import Exam from '../Models/ExamModel.js';
import AllTheory from '../Models/AllTheory.js';

export const addTheoryQuestion = async (req, res) => {
  try {
    const { questions, course, creator } = req.body;

    if (!questions || !creator || !course) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const teacher = await Teacher.findOne({ email: creator });

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    const newTheoryQuestionSet = new AllTheory({
      questionType: 'theory',
      course,
      creator: teacher._id,
      questions: questions.map((question) => ({
        questionText: question.questionText,
        marking_guide: question.answerText,
      })),
    });

    const savedQuestionSet = await newTheoryQuestionSet.save();

    teacher.createdExams.push(savedQuestionSet._id);
    await teacher.save();

    res
      .status(201)
      .json({
        message: 'Theory question uploaded successfully!',
        savedQuestionSet,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
