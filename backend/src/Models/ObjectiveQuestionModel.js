import mongoose from 'mongoose';

const ObjectiveQuestionSchema = new mongoose.Schema({
    questionType: {
        type: String,
        required: true,
        default: 'objective'
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
    questionId:{
        type:String
    },
    course: {
        type: String,
        required: true
    },
    options: {
        type: {
            a: { type: String, required: true },
            b: { type: String, required: true },
            c: { type: String, required: true },
            d: { type: String, required: true }
        },
        required: true
    },
    correctOption: {
        type: String,
        enum: ['a', 'b', 'c', 'd'],
        required: true
    }
});

const ObjectiveQuestion = mongoose.model('ObjectiveQuestions', ObjectiveQuestionSchema);

export default ObjectiveQuestion;





