import Answer from '../Models/AnswerModel.js';
import ObjectiveQuestion from '../Models/ObjectiveQuestionModel.js';
import Exam from '../Models/ExamModel.js';
import Student from '../Models/StudentModel.js';

export const submitObjectiveAnswer = async (req, res) => {
    const { studentId, questionId, selectedOption, examId,course } = req.body;

    try {
       
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const exam = await Exam.findById(examId);
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }

        const question = await ObjectiveQuestion.findById(questionId);
        if (!question || question.course !== exam.course) {
            return res.status(404).json({ message: 'Question not found or does not match exam course' });
        }

        const isCorrect = question.correctOption === selectedOption;

        const answer = new Answer({
            studentId,
            course,
            questionId,
            selectedOption,
            isCorrect,
            questionType: 'objective'
        });
        await answer.save();

        const score = isCorrect ? 1 : 0;

        const studentExamIndex = student.scores.findIndex(score => score.examId.toString() === examId && score.questionType === 'objective');
        if (studentExamIndex !== -1) {
            student.scores[studentExamIndex].score += score;
        } else {
            student.takenExams.push({
                examId: exam._id,
                course: exam.course,
                score: score
            });
        }
        exam.objectiveQuestions.push(questionId);
        
         // Add student to the exam's students array if not already added
         if (!exam.student.includes(studentId)) {
            exam.student.push(studentId);
        }
        await exam.save();
        await student.save();
        const totalPossibleObjectiveScore = 50;
        const totalObjectiveScore = student.scores
            .filter(score => score.examId.toString() === examId && score.questionType === 'objective')
            .reduce((total, score) => total + score.score, 0);
        
        const objectivePercentage = (totalObjectiveScore / totalPossibleObjectiveScore) * 100;

        

        res.status(201).json({ message: 'Answer submitted successfully', score,question,objectivePercentage});
    } catch (error) {
        console.error('Error submitting answer:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
