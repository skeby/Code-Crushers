import Answer from '../Models/AnswerModel.js'; 

export const submitTheoryAnswer = async (req, res) => {
    const { questionId, answerText} = req.body;

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
            answerText,
            questionType: 'theory'
        });

       
        await answer.save();

        res.status(201).json({ message: 'Answer submitted successfully' });
    } catch (error) {
        console.error('Error submitting answer:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
