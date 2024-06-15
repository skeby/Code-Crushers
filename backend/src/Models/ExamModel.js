import mongoose from 'mongoose';
import AnswerSchema from './AnswerModel.js';

const ExamSchema = new mongoose.Schema({
    student: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }],
    course: { 
        type: String,
        required: true 
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    score: {
        type: Number,
        default: null
    },
    feedback: {
        type: String,
        default: ''
    },
    creator: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    objectiveQuestions: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ObjectiveQuestion' 
    }],
    theoryQuestions: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'TheoryQuestion' 
    }],
   // answers: [AnswerSchema]
});

const Exam = mongoose.model('Exam', ExamSchema);
export default Exam;
