import Exam from '../Models/ExamModel';

export const addAnswersToExamQuestions = async (req, res) => {
    try {
        const { examId, answers } = req.body;

        const exam = await Exam.findById(examId);
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }

        for (const answer of answers) {
            exam.answers.push({
                questionId: answer.questionId,
                answerText: answer.answerText
            });
        }

        await exam.save();
        res.status(200).json({ message: 'Answers added to exam' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
