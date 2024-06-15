
import React, { useState } from 'react';
import Question from '@/components/teacherSection/Question';

interface QuestionType {
  questionText: string;
  answerText: string;
}

const TestConstruct: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleNewQuestion = () => {
    setQuestions([...questions, { questionText: '', answerText: '' }]);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div>
      <div>
        <button onClick={handleNewQuestion}>Add Question</button>
      </div>
      <div>
        {questions.map((question, index) => (
          <Question
            key={index}
            index={index}
            question={question}
            setQuestion={setQuestions}
          />
        ))}
      </div>
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      {submitted && (
        <div>
          <h2>Submitted Questions and Answers</h2>
          {questions.map((question, index) => (
            <div key={index}>
              <h3>Question {index + 1}</h3>
              <p><strong>Question:</strong> {question.questionText}</p>
              <p><strong>Answer:</strong> {question.answerText}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestConstruct;
