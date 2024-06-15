import MarkingGuide from '../Models/MarkingGuideModel.js';
import TheoryQuestion from '../Models/TheoryQuestionModel.js';

export const uploadMarkingGuide = async (req, res) => {
    try {
        const { questionId, guide } = req.body;

        if (!questionId || !guide) {
            return res.status(400).json({ message: 'Question ID and guide are required' });
        }

        const theoryQuestion = await TheoryQuestion.findById(questionId);
        if (!theoryQuestion) {
            return res.status(404).json({ message: 'Theory question not found' });
        }

        const newMarkingGuide = new MarkingGuide({
            questionId,
            guide
        });

        await newMarkingGuide.save();
        res.status(201).json({ message: 'Marking guide uploaded successfully!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
