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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { exam } from "@/static/sample";
import { StudentAnswer, StudentQuestion } from "@/types";
import { useState } from "react";

const ExamPage = () => {
  const { questions, title, time } = exam;
  const { toast } = useToast();
  const [countdownTime, setCountDownTime] = useState(time);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<StudentQuestion>(
    questions[0]
  );
  const [answers, setAnswers] = useState<StudentAnswer[]>(
    questions.map((question) => ({ questionId: question.id, answer: "" }))
  );
  const currentIndex = questions.findIndex(
    (question) => question === currentQuestion
  );

  const handleNextClick = () => {
    if (currentIndex + 1 >= questions.length) {
      handleSubmit();
    } else {
      setCurrentQuestion(questions[currentIndex + 1]);
    }
  };
  const handlePreviousClick = () => {
    if (currentIndex - 1 < 0) {
      return;
    }
    setCurrentQuestion(questions[currentIndex - 1]);
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex].answer = e.target.value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setHasFinished(true);
    setCountDownTime(0);
    console.log(answers);
  };
  return (
    <div className="flex flex-col items-center gap-y-9">
      {!hasFinished ? (
        <div className="flex items-center justify-center">
          <p className="mr-2">{!hasStarted ? "Time:" : "Time Left:"}</p>
          <CountDown
            startCountdown={hasStarted}
            time={countdownTime}
            setTime={setCountDownTime}
            onCountdownEnd={() => {
              toast({
                title: "Time's up!",
                description: "The exam has ended.",
              });
              handleSubmit();
            }}
          />
        </div>
      ) : (
        <div>Exam completed</div>
      )}
      <div className="flex items-center gap-x-5">
        <p>{title}</p>
        {!hasStarted && (
          <Button
            onClick={() => {
              setHasStarted(true);
              toast({
                title: "Exam Started",
                description: "You can now start answering the questions.",
              });
            }}
          >
            Click to Start
          </Button>
        )}
      </div>
      {hasStarted && !hasFinished && (
        <Card className="sm:w-[500px] w-full h-full sm:h-auto transition-all sm:block flex-col flex duration-500">
          <CardHeader>
            <CardTitle>Question {currentIndex + 1}</CardTitle>
            {/* <CardDescription>Some description</CardDescription> */}
          </CardHeader>
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
          <CardFooter className="flex-grow gap-x-2 items-end sm:items-center">
            <Button
              className="w-full"
              form={"answer-form"}
              variant={"outline"}
              disabled={currentIndex - 1 < 0}
              onClick={() => handlePreviousClick()}
            >
              Previous
            </Button>
            {currentIndex + 1 < questions.length ? (
              <Button
                className="w-full"
                form={"answer-form"}
                onClick={() => handleNextClick()}
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
                        answers.filter((answer) => answer.answer.trim() === "")
                          .length > 0 && (
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
      )}
    </div>
  );
};

export default ExamPage;
