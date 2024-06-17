import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/state/store";
import { TakeExamFields, TakeExamSchema } from "@/static/schema";
import { User } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const ExamOverview = () => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const takeExamForm = useForm<TakeExamFields>({
    resolver: zodResolver(TakeExamSchema),
    defaultValues: {
      examId: "",
    },
  });

  const { registeredCourses } = user as User<"student">;
  const { handleSubmit, control } = takeExamForm;

  const onTakeExamFormSubmit: SubmitHandler<TakeExamFields> = (data) => {
    navigate(data.examId);
  };

  return (
    <div className="flex flex-col items-center">
      {registeredCourses?.length === 0 ? (
        <p className="mb-4 font-semibold">No exams available</p>
      ) : (
        <div className="flex w-full flex-col gap-y-4">
          {registeredCourses?.map((course, i) => (
            <Card key={i} className="flex justify-between">
              <CardHeader className="flex justify-between p-3 sm:items-center gap-4 sm:flex-row w-full">
                <div>
                  <CardTitle className="text-base">
                    {course.toUpperCase()}
                  </CardTitle>
                </div>
                <Dialog>
                  <DialogTrigger asChild className="!mt-0">
                    <Button variant={"outline"}>Take Exam</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{course.toUpperCase()} Exam</DialogTitle>
                      <DialogDescription>
                        Note that the exam begins automatically immediately you
                        click the{" "}
                        <span className="font-semibold text-primary">
                          Take Exam
                        </span>{" "}
                        button
                      </DialogDescription>
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
          ))}
        </div>
      )}
    </div>
  );
};

export default ExamOverview;
