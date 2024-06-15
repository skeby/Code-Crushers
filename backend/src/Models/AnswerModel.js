import mongoose from 'mongoose';

 const AnswerSchema = new mongoose.Schema({
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    },
    answerText: {
        type: String,
        required: function() {
            return this.questionType === 'theory';
        }
    },
    selectedOption: {
        type: String,
        enum: ['a', 'b', 'c', 'd', 'e'],
        required: function() {
            return this.questionType === 'objective';
        }
    },
    questionType: {
        type: String,
        enum: ['theory', 'objective'],
        required: true
    }
});

const Answer = mongoose.model('Answer', AnswerSchema);

export default Answer


