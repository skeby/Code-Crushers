import Answer from '../Models/AnswerModel.js';
import TheoryQuestion from '../Models/TheoryQuestionModel.js';
import Exam from '../Models/ExamModel.js';
import Student from '../Models/StudentModel.js';

export const submitTheoryAnswer = async (req, res) => {
    const { studentId, questionId, answerText,course,examId } = req.body;

    try {
        
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const question = await TheoryQuestion.findById(questionId);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        const exam = await Exam.findById(question.examId);
        if (!exam || exam.course !== question.course) {
            return res.status(404).json({ message: 'Exam not found or does not match question course' });
        }

        
        const isCorrect = answerText.trim() === question.correctAnswer.trim(); 

        const studentAnswer = new Answer({
            questionId,
            course,
            answerText,
            questionType: 'theory'
        });
        await studentAnswer.save();

         const score = isCorrect ? 5 : 0;

        const studentExamIndex = student.scores.findIndex(score => score.examId.toString() === examId && score.questionType === 'theory');
        if (studentExamIndex !== -1) {
            student.scores[studentExamIndex].score += score;
        } else {
            student.takenExams.push({
                examId: exam._id,
                course: exam.course,
                score: score
            });
        }

       
        const scoreIndex = student.scores.findIndex(sc => sc.examId.toString() === exam._id.toString());
        if (scoreIndex !== -1) {
            student.scores[scoreIndex].score += score;
        } else {
            student.scores.push({
                examId: exam._id,
                course: exam.course,
                score: score
            });
        }
        exam.theoryQuestions.push(questionId);
        
        // Add student to the exam's students array if not already added
        if (!exam.student.includes(studentId)) {
            exam.student.push(studentId);
        }
        await exam.save();
        await student.save();
      
        const totalPossibleTheoryScore = 25; 
        const totalTheoryScore = student.scores
            .filter(score => score.examId.toString() === examId && score.questionType === 'theory')
            .reduce((total, score) => total + score.score, 0);
        
        const theoryPercentage = (totalTheoryScore / totalPossibleTheoryScore) * 100;

        res.status(201).json({ message: 'Answer submitted successfully', question, score,theoryPercentage });
    } catch (error) {
        console.error('Error submitting answer:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};


          

export default submitTheoryAnswer;
