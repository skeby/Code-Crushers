import HiglightedText from "@/components/HiglightedText";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
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
import { Input } from "@/components/ui/input";
import { TakeExamFields, TakeExamSchema } from "@/static/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription } from "@radix-ui/react-dialog";
import { LightbulbIcon } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const ExamOverview = () => {
  const navigate = useNavigate();

  const takeExamForm = useForm<TakeExamFields>({
    resolver: zodResolver(TakeExamSchema),
    defaultValues: {
      examId: "",
    },
  });

  const { handleSubmit, control } = takeExamForm;

  const onTakeExamFormSubmit: SubmitHandler<TakeExamFields> = (data) => {
    navigate(data.examId);
  };

  return (
    <div className="flex flex-col items-center">
      {/* {registeredCourses?.length === 0 ? ( */}
      {/* <p className="mb-4 font-semibold">No exams available</p> */}
      {/* // ) : ( */}
      <div className="flex w-full flex-col gap-y-4 items-center">
        {/* {registeredCourses?.map((course, i) => ( */}
        <Card className="flex justify-between max-w-[500px] w-full">
          <CardHeader className="flex p-3 items-center gap-4 w-full">
            {/* <div>
                  <CardTitle className="text-base">
                    {course.toUpperCase()}
                  </CardTitle>
                </div> */}
            <Dialog>
              <DialogTrigger asChild className="!mt-0">
                <Button variant={"outline"} className="w-full">
                  Take An Exam
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Take an Exam</DialogTitle>
                  <DialogDescription className="py-3 flex flex-row items-center gap-x-2 text-sm">
                    <LightbulbIcon className="text-muted-foreground flex-shrink-0" />
                    <div className="!m-0 leading-5 text-primary">
                      <p>
                        Please utilize this examId already made available for
                        your testing purposes.
                      </p>
                      <div className="font-semibold flex items-center gap-x-2 mt-1.5">
                        <HiglightedText>
                          6672b5984ebb9d5479efe605
                        </HiglightedText>
                      </div>
                    </div>
                  </DialogDescription>
                  {/* <DialogDescription>
                    Note that the exam begins automatically immediately you
                    click the{" "}
                    <span className="font-semibold text-primary">
                      Take Exam
                    </span>{" "}
                    button
                  </DialogDescription> */}
                  <Form {...takeExamForm}>
                    <form
                      onSubmit={handleSubmit(onTakeExamFormSubmit)}
                      id={`take-exam-form`}
                    >
                      <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                          <FormField
                            control={control}
                            name="examId"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Exam ID</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter the exam id given by your teacher"
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
                <DialogFooter className="mt-4 sticky bottom-0">
                  <Button
                    // loading={isTakeExamPending}
                    type="submit"
                    className="w-full"
                    form={`take-exam-form`}
                  >
                    Take Exam
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
        </Card>
        {/* ))} */}
      </div>
      {/* // )} */}
    </div>
  );
};

export default ExamOverview;
