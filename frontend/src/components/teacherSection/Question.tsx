import React, { ChangeEvent } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface QuestionProps {
    index: number;
    question: {
        questionText: string;
        answerText: string;
    };
    setQuestion: React.Dispatch<React.SetStateAction<{ questionText: string; answerText: string }[]>>;
}

const Question: React.FC<QuestionProps> = ({ index, question, setQuestion }) => {
    const handleQuestionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setQuestion((prevQuestions) =>
            prevQuestions.map((q, i) => (i === index ? { ...q, [name]: value } : q))
        );
    };

    const isQuestionValid = () => {
        return question.questionText.trim() !== '';
    };

    const isMarkingGuideValid = () => {
        return question.answerText.trim() !== '';
    };

    const isFormValid = () => {
        return isQuestionValid() || isMarkingGuideValid();
    };

    return (
        <div className='mb-5'>
            <div className="p-3 bg-gray-100 rounded-lg">

                <div className="grid w-full gap-1.5 mb-2">
                    <Label htmlFor={`question-${index}`}>Question</Label>
                    <Textarea name="questionText" value={question.questionText} onChange={handleQuestionChange} placeholder="Enter your question here" id={`question-${index}`} />
                   
                </div>
                <div className="grid w-full gap-1.5">
                    <Label htmlFor={`answer-${index}`}>Marking Guide (Solution)</Label>
                    <Textarea name="answerText" value={question.answerText} onChange={handleQuestionChange} placeholder="Enter the answer here" id={`answer-${index}`} />
                   
                </div>

            </div>
            {!isFormValid() ? (
                <p className="text-red-500 mt-2">Please enter both a question and marking guide</p>
            ) : !isMarkingGuideValid() ? (
                        <p className="text-red-500 mt-1">Please enter a marking guide</p>
                    ) : !isQuestionValid() && (
                        <p className="text-red-500 mt-1">Please enter a question</p>
                    )}
        </div>
    );
};

export default Question;
