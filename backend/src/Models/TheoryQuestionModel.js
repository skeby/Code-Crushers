import mongoose from 'mongoose';

const TheoryQuestionSchema = new mongoose.Schema({
    questionType: {
        type: String,
        required: true,
        default:'theory'
    },
    question: {
        type: String,
        required: true
    },
});

const TheoryQuestion = mongoose.model('Theory', TheoryQuestionSchema);

export default TheoryQuestion;


