import CountDown from "@/components/Countdown";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { apiCall } from "@/services";
import { paths } from "@/services/static";
import { setHasFinished, setHasStarted } from "@/state/slices/uiSlice";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { questionTabs } from "@/static";
import { exam } from "@/static/sample";
import { StudentAnswer, StudentExam, StudentQuestion } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLoaderData, useLocation } from "react-router-dom";

const ExamPage = () => {
  const { questions } = exam;
  const data = useLoaderData() as StudentExam;
  const {
    _id: id,
    course,
    startTime,
    endTime,
    objectiveQuestions,
    theoryQuestions,
  } = data;
  const [currentTheoryQuestion, setCurrentTheoryQuestion] = useState(
    theoryQuestions[0]
  );
  const [currentObjectiveQuestion, setCurrentObjectiveQuestion] = useState(
    objectiveQuestions[0]
  );
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => apiCall(data, paths.student.answerObjective, "post"),
    onSuccess: () => {
      setCurrentObjectiveQuestion(
        objectiveQuestions[currentObjectiveIndex + 1]
      );
    },
  });
  console.log(mutate, isPending);
  const {
    data: objective,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["objective"],
    queryFn: () => {
      queryClient.invalidateQueries({
        queryKey: ["objective"],
      });
      return apiCall(
        {},
        `${paths.student.getObjectiveById}/${currentObjectiveQuestion}`,
        "get"
      );
    },
    enabled: false,
  });
  console.log(objective, isLoading, isFetching);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const startTimeDate = new Date(startTime);
  const endTimeDate = new Date(endTime);
  const { hasStarted, hasFinished } = useAppSelector((state) => state.ui);
  const { toast } = useToast();
  const [countdownTime, setCountDownTime] = useState(
    Math.floor((endTimeDate.getTime() - startTimeDate.getTime()) / 1000)
  );
  const [currentQuestion, setCurrentQuestion] = useState<StudentQuestion>(
    questions[0]
  );

  console.log(currentQuestion, setCurrentQuestion);
  const [answers, setAnswers] = useState<StudentAnswer[]>(
    questions.map((question) => ({ questionId: question.id, answer: "" }))
  );

  if (!data) {
    throw new Error("This exam does not exist.");
  }

  const currentIndex = questions.findIndex(
    (question) => question === currentQuestion
  );
  const currentTheoryIndex = theoryQuestions.findIndex(
    (question) => question === currentTheoryQuestion
  );
  const currentObjectiveIndex = objectiveQuestions.findIndex(
    (question) => question === currentObjectiveQuestion
  );

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const displayDate =
    formatDate(startTimeDate) === formatDate(endTimeDate)
      ? `Date: ${formatDate(startTimeDate)}`
      : `Date: ${formatDate(startTimeDate)} - ${formatDate(endTimeDate)}`;

  const handleNextClick = <T extends any[]>(
    questions: T,
    currentIndex: number,
    setCurrentQuestion: React.Dispatch<React.SetStateAction<T[number]>>
  ) => {
    if (currentIndex + 1 >= questions.length) {
      handleSubmit();
    } else {
      setCurrentQuestion(questions[currentIndex + 1]);
    }
  };
  // const handlePreviousClick = <T extends any[]>(
  //   questions: T,
  //   currentIndex: number,
  //   setCurrentQuestion: React.Dispatch<React.SetStateAction<T[number]>>
  // ) => {
  //   if (currentIndex - 1 < 0) {
  //     return;
  //   }
  //   setCurrentQuestion(questions[currentIndex - 1]);
  // };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex].answer = e.target.value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    //the students email or id
    // the course name
    // time of exam start
    //time of exam end
    // array of the answers

    dispatch(setHasFinished(true));
    setCountDownTime(0);
    console.log(answers);
  };

  useEffect(() => {
    if (location.pathname !== `/student/exam/${id}`) {
      handleSubmit();
    }
  }, [location.pathname]);

  useEffect(() => {
    refetch();
  }, [currentObjectiveIndex]);

  return (
    <div className="flex flex-col items-center gap-y-9">
      {!hasFinished ? (
        <div className="flex items-center flex-col justify-center">
          <p>{displayDate}</p>
          <p className="mr-2">
            {!hasStarted ? "Time:" : "Time Left:"}{" "}
            <CountDown
              startCountdown={hasStarted}
              time={countdownTime}
              setTime={setCountDownTime}
              onCountdownEnd={() => {
                toast({
                  title: "Time's up!",
                  description: "The exam has ended.",
                  duration: 3000,
                });
                handleSubmit();
              }}
            />
          </p>
        </div>
      ) : (
        <div>Exam completed</div>
      )}
      <div className="flex items-center gap-x-5">
        <p>{course.toUpperCase()}</p>
        {!hasStarted && (
          <Button
            onClick={() => {
              dispatch(setHasStarted(true));
              toast({
                title: "Exam Started",
                description: "You can now start answering the questions.",
                duration: 3000,
              });
            }}
          >
            Click to Start
          </Button>
        )}
      </div>
      {hasStarted && !hasFinished && (
        <Tabs
          defaultValue="theory"
          className="w-full items-center flex flex-col"
        >
          <TabsList className="grid w-full grid-cols-2 mb-5 max-w-[600px]">
            {questionTabs.map((tab, i) => (
              <TabsTrigger key={i} value={tab.toLowerCase()}>
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
          {questionTabs.map((tab, i) => (
            <TabsContent
              key={i}
              value={tab.toLowerCase()}
              className="max-w-[600px] w-full"
            >
              <Card className="h-full w-full sm:h-auto transition-all sm:block flex-col flex duration-500">
                <CardHeader>
                  <CardTitle>
                    Question{" "}
                    {tab === "Theory"
                      ? currentTheoryIndex + 1
                      : currentObjectiveIndex + 1}
                  </CardTitle>
                  {/* <CardDescription>Some description</CardDescription> */}
                </CardHeader>
                {tab === "Theory" ? (
                  objectiveQuestions.length > 0 ? (
                    <CardContent className="flex flex-col gap-y-5">
                      <p>{currentQuestion.text}</p>
                      <div className="grid w-full gap-y-2.5">
                        <Label htmlFor="message">Answer</Label>
                        <Textarea
                          value={answers[currentIndex].answer}
                          onChange={handleAnswerChange}
                          placeholder="Enter your answer here"
                        />
                      </div>
                    </CardContent>
                  ) : (
                    <p>No theory questions available</p>
                  )
                ) : objectiveQuestions.length > 0 ? (
                  <CardContent className="flex flex-col gap-y-5"></CardContent>
                ) : (
                  <p>No objective questions available</p>
                )}
                <CardFooter className="flex-grow gap-x-2 items-end sm:items-center">
                  {/* <Button
                    className="w-full"
                    form={"answer-form"}
                    variant={"outline"}
                    disabled={currentIndex - 1 < 0}
                    onClick={() => {
                      if (tab === "Theory") {
                        handlePreviousClick(
                          theoryQuestions,
                          currentTheoryIndex,
                          setCurrentTheoryQuestion
                        );
                      } else {
                        handlePreviousClick(
                          objectiveQuestions,
                          currentObjectiveIndex,
                          setCurrentObjectiveQuestion
                        );
                      }
                    }}
                  >
                    Previous
                  </Button> */}
                  {currentIndex + 1 < questions.length ? (
                    <Button
                      className="w-full"
                      form={"answer-form"}
                      onClick={() => {
                        if (tab === "Theory") {
                          handleNextClick(
                            theoryQuestions,
                            currentTheoryIndex,
                            setCurrentTheoryQuestion
                          );
                        } else {
                          handleNextClick(
                            objectiveQuestions,
                            currentObjectiveIndex,
                            setCurrentObjectiveQuestion
                          );
                        }
                      }}
                    >
                      Next
                    </Button>
                  ) : (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className="w-full" form={"answer-form"}>
                          Submit
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            {countdownTime > 0
                              ? "Are you sure you want to submit?"
                              : "Time is up and exam has been submitted. Click the button below to close the dialog."}
                          </AlertDialogTitle>
                          <AlertDialogDescription className="flex flex-col">
                            {countdownTime > 0 && (
                              <span>
                                You have{" "}
                                <CountDown
                                  startCountdown={hasStarted}
                                  time={countdownTime}
                                />{" "}
                                left.
                              </span>
                            )}
                            {countdownTime > 0 &&
                              answers.filter(
                                (answer) => answer.answer.trim() === ""
                              ).length > 0 && (
                                <span>You have not answered all questions</span>
                              )}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          {countdownTime > 0 && (
                            <AlertDialogAction onClick={() => handleSubmit()}>
                              Continue
                            </AlertDialogAction>
                          )}
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </CardFooter>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
};

export default ExamPage;
