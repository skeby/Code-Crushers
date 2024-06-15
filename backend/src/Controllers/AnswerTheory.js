import Answer from '../Models/AnswerModel.js'; 

export const submitTheoryAnswer = async (req, res) => {
    const { questionId, answerText} = req.body;

    try {
        const answer = new Answer({
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
