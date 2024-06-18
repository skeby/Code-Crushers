import CountDown from "@/components/Countdown";
import ScreenLoader from "@/components/ScreenLoader";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { apiCall } from "@/services";
import { paths } from "@/services/static";
import { setHasFinished, setHasStarted } from "@/state/slices/uiSlice";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { questionTabs } from "@/static";
import { StudentExam } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

interface AnswerTheoryRequest {
  questionId: string;
  answerText: string;
  studentId: string;
  examId: string;
  course: string;
}

interface AnswerObjectiveRequest {
  questionId: string;
  selectedOption: string;
  examId: string;
  studentId: string;
  course: string;
}

const ExamPage = () => {
  const { toast } = useToast();
  // React Router Loader
  const data = useLoaderData() as StudentExam;
  if (!data) {
    const message = "This exam does not exist.";
    toast({
      title: message,
      description: "Ensure to use to right exam id.",
      duration: 6000,
    });
    throw new Error(message);
  }
  const {
    _id: id,
    course,
    startTime,
    endTime,
    objectiveQuestions,
    theoryQuestions,
  } = data;

  // React States
  const [currentTheoryQuestion, setCurrentTheoryQuestion] = useState<
    string | null
  >(theoryQuestions[0]);
  const [currentObjectiveQuestion, setCurrentObjectiveQuestion] = useState<
    string | null
  >(objectiveQuestions[0]);
  const [currentTheoryAnswer, setCurrentTheoryAnswer] = useState("");
  const [currentObjectiveAnswer, setCurrentObjectiveAnswer] = useState("");

  // React Query Mutations/Queries
  const { mutate: postObjective, isPending: objectivePending } = useMutation({
    mutationFn: (data: AnswerObjectiveRequest) =>
      apiCall(data, paths.student.answerObjective, "post"),
    onSuccess: () => {
      if (currentObjectiveIndex < objectiveQuestions.length - 1) {
        setCurrentObjectiveAnswer("");
        setCurrentObjectiveIndex((prev) => {
          const newObjectiveIndex = prev + 1;
          setCurrentObjectiveQuestion(objectiveQuestions[newObjectiveIndex]);
          return newObjectiveIndex;
        });
      } else {
        if (!currentTheoryQuestion) dispatch(setHasFinished(true));
        setCurrentObjectiveQuestion(null);
      }
    },
  });

  const { mutate: postTheory, isPending: theoryPending } = useMutation({
    mutationFn: (data: AnswerTheoryRequest) =>
      apiCall(data, paths.student.answerTheory, "post"),
    onSuccess: () => {
      if (currentTheoryIndex < theoryQuestions.length - 1) {
        setCurrentTheoryAnswer("");
        setCurrentTheoryIndex((prev) => {
          const newTheoryIndex = prev + 1;
          setCurrentTheoryQuestion(theoryQuestions[newTheoryIndex]);
          return newTheoryIndex;
        });
      } else {
        if (!currentObjectiveQuestion) dispatch(setHasFinished(true));
        setCurrentTheoryQuestion(null);
      }
    },
  });

  const {
    data: objective,
    isLoading: objectiveLoading,
    isFetching: objectiveFetching,
    refetch,
  } = useQuery({
    queryKey: [currentObjectiveQuestion],
    queryFn: () => {
      if (
        currentObjectiveQuestion !== null &&
        currentObjectiveQuestion !== undefined
      )
        return apiCall(
          {},
          `${paths.student.getObjectiveById}/${currentObjectiveQuestion}`,
          "get"
        );
      return null;
    },
  });

  const {
    data: theory,
    isLoading: theoryLoading,
    isFetching: theoryFetching,
    refetch: refetchTheory,
  } = useQuery({
    queryKey: [currentTheoryQuestion],
    queryFn: () => {
      if (currentTheoryQuestion !== null && currentTheoryQuestion !== undefined)
        return apiCall(
          {},
          `${paths.student.getTheoryById}/${currentTheoryQuestion}`,
          "get"
        );
      return null;
    },
  });

  // Redux Dispatch and Selectors
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { hasStarted, hasFinished } = useAppSelector((state) => state.ui);
  const startTimeDate = new Date(startTime);
  const endTimeDate = new Date(endTime);
  const [countdownTime, setCountDownTime] = useState(
    Math.floor((endTimeDate.getTime() - startTimeDate.getTime()) / 1000)
  );
  const [currentObjectiveIndex, setCurrentObjectiveIndex] = useState(
    objectiveQuestions.findIndex(
      (question) => question === currentObjectiveQuestion
    )
  );
  const [currentTheoryIndex, setCurrentTheoryIndex] = useState(
    theoryQuestions.findIndex((question) => question === currentTheoryQuestion)
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

  const handleSubmit = () => {
    setCountDownTime(0);
  };

  useEffect(() => {
    if (hasFinished) {
      handleSubmit();
    }
  }, [hasFinished]);

  useEffect(() => {
    if (currentObjectiveIndex > 0) {
      refetch();
    }
  }, [currentObjectiveIndex]);

  useEffect(() => {
    if (currentTheoryIndex > 0) {
      refetchTheory();
    }
  }, [currentTheoryIndex]);

  return (
    <div className="flex flex-col items-center gap-y-9">
      <ScreenLoader
        loading={
          theoryLoading ||
          theoryFetching ||
          theoryPending ||
          objectiveLoading ||
          objectiveFetching ||
          objectivePending
        }
      />
      {!hasFinished ? (
        <div className="w-full flex-col text-center flex max-w-[600px] gap-y-1">
          <div className="flex items-center sm:flex-row flex-col gap-1  justify-center">
            <p className="px-3 py-1 w-full rounded-lg bg-secondary">
              {displayDate}
            </p>

            <p className="px-3 py-1 w-full rounded-lg bg-secondary">
              Objective: {objectiveQuestions.length}
            </p>
            <p className="px-3 py-1 w-full rounded-lg bg-secondary">
              Theory: {theoryQuestions.length}
            </p>
          </div>
          <p className="px-3 py-1 w-full rounded-lg bg-secondary">
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
                dispatch(setHasFinished(true));
              }}
            />
          </p>
        </div>
      ) : (
        <div>Exam completed</div>
      )}
      <div className="flex items-center flex-col gap-y-5">
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
                {((tab === "Theory" && theoryQuestions.length > 0) ||
                  (tab === "Objective" && objectiveQuestions.length > 0)) && (
                  <CardHeader>
                    <CardTitle>
                      Question{" "}
                      {tab === "Theory"
                        ? currentTheoryIndex + 1
                        : currentObjectiveIndex + 1}
                    </CardTitle>
                    {/* <CardDescription>Some description</CardDescription> */}
                  </CardHeader>
                )}
                {tab === "Theory" ? (
                  theoryQuestions.length > 0 &&
                  currentTheoryQuestion !== null ? (
                    <CardContent>
                      <div className="grid w-full gap-y-2.5">
                        <Label>{theory?.question}</Label>
                        <Textarea
                          // value={answers[currentIndex].answer}
                          value={currentTheoryAnswer}
                          onChange={(e) => {
                            setCurrentTheoryAnswer(e.target.value);
                          }}
                          placeholder="Enter your answer here"
                        />
                      </div>
                    </CardContent>
                  ) : (
                    <CardHeader className="text-center">
                      No theory questions available
                    </CardHeader>
                  )
                ) : objectiveQuestions.length > 0 &&
                  currentObjectiveQuestion !== null ? (
                  <CardContent className="flex flex-col gap-y-5">
                    <Label>{objective.question}</Label>
                    <RadioGroup
                      value={currentObjectiveAnswer}
                      onValueChange={(value) => {
                        setCurrentObjectiveAnswer(value);
                      }}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="a" id="option-a" />
                        <Label htmlFor="option-a">{objective?.options.a}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="b" id="option-b" />
                        <Label htmlFor="option-b">{objective?.options.b}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="c" id="option-c" />
                        <Label htmlFor="option-c">{objective?.options.c}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="d" id="option-d" />
                        <Label htmlFor="option-d">{objective?.options.d}</Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                ) : (
                  <CardHeader>No objective questions available</CardHeader>
                )}
                {((tab === "Theory" && theoryQuestions.length > 0) ||
                  (tab === "Objective" && objectiveQuestions.length > 0)) && (
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
                    <Button
                      className="w-full"
                      form={"answer-form"}
                      onClick={() => {
                        if (tab === "Theory") {
                          if (currentTheoryQuestion !== null) {
                            postTheory({
                              course,
                              questionId: currentTheoryQuestion,
                              answerText: currentTheoryAnswer,
                              studentId: user?.id as string,
                              examId: id,
                            });
                          }
                        } else if (tab === "Objective") {
                          if (currentObjectiveQuestion !== null) {
                            postObjective({
                              course,
                              questionId: currentObjectiveQuestion,
                              selectedOption: currentObjectiveAnswer,
                              studentId: user?.id as string,
                              examId: id,
                            });
                          }
                        }
                      }}
                    >
                      Next
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
};

export default ExamPage;

// {
//   (tab === "Theory" ? currentTheoryIndex : currentObjectiveIndex) + 1 <
//   (tab === "Theory" ? theoryQuestions : objectiveQuestions).length ? (
//     <Button
//       className="w-full"
//       form={"answer-form"}
//       onClick={() => {
//         if (tab === "Theory") {
//           handleNextClick();
//           postTheory({
//             course,
//             questionId: currentTheoryQuestion,
//             answerText: currentTheoryAnswer,
//             studentId: user?.id as string,
//             examId: id,
//           });
//           setCurrentTheoryAnswer("");
//         } else {
//           handleNextClick();
//         }
//       }}
//     >
//       Next
//     </Button>
//   ) : (
//     <AlertDialog>
//       <AlertDialogTrigger asChild>
//         <Button className="w-full" form={"answer-form"}>
//           Submit
//         </Button>
//       </AlertDialogTrigger>
//       <AlertDialogContent>
//         <AlertDialogHeader>
//           <AlertDialogTitle>
//             {countdownTime > 0
//               ? "Are you sure you want to submit?"
//               : "Time is up and exam has been submitted. Click the button below to close the dialog."}
//           </AlertDialogTitle>
//           <AlertDialogDescription className="flex flex-col">
//             {countdownTime > 0 && (
//               <span>
//                 You have{" "}
//                 <CountDown startCountdown={hasStarted} time={countdownTime} />{" "}
//                 left.
//               </span>
//             )}
//             {/* {countdownTime > 0 &&
//             answers.filter(
//               (answer) => answer.answer.trim() === ""
//             ).length > 0 && (
//               <span>You have not answered all questions</span>
//             )} */}
//           </AlertDialogDescription>
//         </AlertDialogHeader>
//         <AlertDialogFooter>
//           <AlertDialogCancel>Cancel</AlertDialogCancel>
//           {countdownTime > 0 && (
//             <AlertDialogAction onClick={() => handleSubmit()}>
//               Continue
//             </AlertDialogAction>
//           )}
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// }
