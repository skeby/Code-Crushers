import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true
  },
  marking_guide: {
    type: String,
    required: true
  }
});

const AllTheorySchema = new mongoose.Schema({
  questionType: {
    type: String,
    required: true,
    default: 'theory'
  },
  questions: [QuestionSchema],
  course: {
    type: String,
    required: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true
  }
});

const AllTheory = mongoose.model('AllTheory', AllTheorySchema);

export default AllTheory;