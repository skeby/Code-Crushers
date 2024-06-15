
import React, { useState } from 'react';
import Question from '@/components/teacherSection/Question';
import { Button } from "@/components/ui/button"


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
      <div className="p-3  ">
        <div className='p-3 flex justify-end' >
        <Button onClick={handleNewQuestion}> Add Question </Button>
        </div>

        <div className='flex justify-center items-center' >
          <div className='w-[60%]  ' >
            {questions.map((question, index) => (
              <Question
                key={index}
                index={index}
                question={question}
                setQuestion={setQuestions}
              />
            ))}
          </div>
        </div>

        <div className=' justify-center flex ' >
        <Button onClick={handleSubmit}> Submit </Button>
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
    </div>
  );
};

export default TestConstruct;
