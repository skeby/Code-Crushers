import mongoose from 'mongoose';

const TheoryQuestionSchema = new mongoose.Schema({
    questionType: {
        type: String,
        required: true,
        default: 'theory'
    },
    examId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam',
        required: true
    },
    question: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    answerText:{
        type: String,
        
    },
    correctAnswer:{
        type: String,
        required: true
    }
});

const TheoryQuestion = mongoose.model('TheoryQuestions', TheoryQuestionSchema);

export default TheoryQuestion;



