import React, { ChangeEvent } from 'react';

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
    <div>
      <textarea
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
      />
    </div>
  );
};

export default Question;
