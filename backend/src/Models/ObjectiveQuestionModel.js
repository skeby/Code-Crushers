import mongoose from 'mongoose';

const ObjectiveQuestionSchema = new mongoose.Schema({
    questionType: {
        type:String,
        required: true,
        default:'objective'
    },
    question: {
        type: String,
        required: true
    },
    options: {
        a: { type: String, required: true },
        b: { type: String, required: true },
        c: { type: String, required: true },
        d: { type: String, required: true },
    },
    correctOption: {
        type: String,
        enum: ['a', 'b', 'c', 'd'],
        required: true
    }
});

const ObjectiveQuestion = mongoose.model('Objective', ObjectiveQuestionSchema);
export default ObjectiveQuestion;




