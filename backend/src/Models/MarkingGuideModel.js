import mongoose from 'mongoose';

const MarkingGuideSchema = new mongoose.Schema({
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Theory',
        required: true
    },
    guide: {
        type: String,
        required: true
    }
});

const MarkingGuide = mongoose.model('MarkingGuide', MarkingGuideSchema);
export default MarkingGuide;

