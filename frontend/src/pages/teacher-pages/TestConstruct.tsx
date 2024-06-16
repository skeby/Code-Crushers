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
import { CreateExamFields, CreateExamSchema } from "@/static/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/state/store";
import { User } from "@/types";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TimeSelector from "@/components/TimeSelector";

const TestConstruct = () => {
  const { mutate: createExam, isPending: isCreateExamPending } = useMutation({
    mutationFn: (data: CreateExamFields) =>
      apiCall({ ...data, creator: user?.id }, paths.teacher.createExam, "post"),
  });

  const createExamForm = useForm<CreateExamFields>({
    resolver: zodResolver(CreateExamSchema),
    defaultValues: {
      course: "",
    },
  });

  const { user } = useAppSelector((state) => state.auth);

  const { createdExams } = user as User<"Teacher">;

  const { handleSubmit, control } = createExamForm;

  const onCreateExamFormSubmit: SubmitHandler<CreateExamFields> = (data) => {
    createExam(data);
  };

  return (
    <div className="flex flex-col items-center">
      {createdExams?.length === 0 ? (
        <p className="mb-4 font-semibold">
          No tests available. Click on the button below to create a test.
        </p>
      ) : (
        <div className="flex w-full flex-col gap-y-2 mb-4">
          {createdExams?.map((createdExam, i) => (
            <Card key={i} className="flex justify-between">
              <CardHeader className="flex justify-between sm:items-center gap-4 sm:flex-row w-full">
                <div>
                  <CardTitle className="text-xl">{createdExam}</CardTitle>
                  <CardDescription>Questions Created:</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant={"outline"}>Add Question</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Question</DialogTitle>
                      <DialogDescription>
                        Add a question here.
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
      <Dialog>
        <DialogTrigger asChild>
          <div
            className={
              createdExams?.length === 0
                ? ""
                : "fixed bottom-20 px-4 py-4 rounded-xl shadow-header backdrop-blur-[1px] bg-secondary/50"
            }
          >
            <Button variant={"outline"}>
              {createdExams?.length === 0
                ? "Create an exam"
                : "Create new exam"}
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Exam</DialogTitle>
            <DialogDescription>Create an exam here.</DialogDescription>
            <Form {...createExamForm}>
              <form
                onSubmit={handleSubmit(onCreateExamFormSubmit)}
                id="create-exam-form"
              >
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <FormField
                      control={control}
                      name="course"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Course Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter the name of the course"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <FormField
                      control={control}
                      name="startTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Time</FormLabel>
                          <FormControl>
                            <TimeSelector
                              onTimeChange={(time) => field.onChange(time)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <FormField
                      control={control}
                      name="endTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Time</FormLabel>
                          <FormControl>
                            <TimeSelector
                              onTimeChange={(time) => field.onChange(time)}
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
              loading={isCreateExamPending}
              type="submit"
              className="w-full"
              form="create-exam-form"
            >
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TestConstruct;
