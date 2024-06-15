import React, { ChangeEvent } from 'react';
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

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

    return (
        <div className='mb-5 ' >
            {/* <textarea
        name="questionText"
        value={question.questionText}
        onChange={handleQuestionChange}
        placeholder="Enter your question here"
      />
      <textarea
        name="answerText"
        value={question.answerText}
        onChange={handleQuestionChange}
        placeholder="Enter the answer here"
      /> */}

            <div className=" p-3 bg-gray-100 rounded-lg ">

                <div className="grid w-full gap-1.5 mb-2">
                    <Label htmlFor="message">Question</Label>
                    <Textarea name="questionText" value={question.questionText} onChange={handleQuestionChange} placeholder="Enter your question here" id="message" />
                </div>
                <div className="grid w-full gap-1.5">
                    <Label htmlFor="message">Marking Guide (Solution)</Label>
                    <Textarea name="answerText" value={question.answerText} onChange={handleQuestionChange} placeholder="Enter the answer here" id="message" />
                </div>

            </div>
        </div>
    );
};

export default Question;
