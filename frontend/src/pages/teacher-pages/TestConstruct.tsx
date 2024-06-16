import React, { useState } from "react";
import Question from "@/components/teacherSection/Question";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { apiCall } from "@/services";
import { paths } from "@/services/static";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateTestFields, CreateTestSchema } from "@/static/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";

interface QuestionType {
  questionText: string;
  answerText: string;
}

const TestConstruct: React.FC = () => {
  const { mutate } = useMutation({
    mutationFn: (data) => apiCall(data, paths.teacher.createTheory, "post"),
  });
  console.log(mutate);

  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [submitted, _setSubmitted] = useState<boolean>(false);

  const form = useForm<CreateTestFields>({
    resolver: zodResolver(CreateTestSchema),
    defaultValues: {
      startTime: "",
      endTime: "",
      course: "",
    },
  });

  const { handleSubmit, control } = form;

  const handleNewQuestion = () => {
    setQuestions([...questions, { questionText: "", answerText: "" }]);
  };

  const onSubmit: SubmitHandler<CreateTestFields> = (data) => {
    console.log(data);
  };

  //   const handleSubmit = () => {
  //     //simulate POST request
  //     const allValid = questions.every(
  //       (question) =>
  //         question.questionText.trim() !== "" && question.answerText.trim() !== ""
  //     );

  //     if (allValid) {
  //       toast("Published Questions 🎉");
  //       setSubmitted(true);
  //     } else {
  //       toast(
  //         "Please enter both a question and marking guide for all questions."
  //       );
  //     }
  //   };

  return (
    <div>
      <p className="mb-4 font-semibold">
        No tests available. Click on the button bellow to create a test.
      </p>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Create a test</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Setup Test</DialogTitle>
            <DialogDescription>Dialog to setup a test.</DialogDescription>
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} id="create-test-form">
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <FormField
                      control={control}
                      name="startTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Time</FormLabel>
                          <FormControl>
                            <Input placeholder="" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <FormField
                      control={control}
                      name="course"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Course Name</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Enter the name of the course"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </form>
            </Form>
          </DialogHeader>
          <DialogFooter>
            <Button
              // loading={isPending}
              type="submit"
              className="w-full"
              form="create-test-form"
            >
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="p-3">
        <div className="p-3 flex justify-end">
          <Button onClick={handleNewQuestion}>Add Question</Button>
        </div>

        <div className="flex justify-center items-center">
          <div className="w-[60%]">
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

        <div className="justify-center flex">
          {/* <Button onClick={handleSubmit}>Submit</Button> */}
        </div>

        {submitted && (
          <div>
            <h2>Submitted Questions and Answers</h2>
            {questions.map((question, index) => (
              <div key={index}>
                <h3>Question {index + 1}</h3>
                <p>
                  <strong>Question:</strong> {question.questionText}
                </p>
                <p>
                  <strong>Answer:</strong> {question.answerText}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestConstruct;
