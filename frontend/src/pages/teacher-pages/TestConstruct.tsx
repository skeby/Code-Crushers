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
import {
  CreateExamFields,
  CreateExamSchema,
  CreateObjectiveFields,
  CreateObjectiveSchema,
  CreateTheoryFields,
  CreateTheorySchema,
} from "@/static/schema";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { addQuestionTabs, examOptions } from "@/static";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TestConstruct = () => {
  const [openedExam, setOpenedExam] = useState<string | null>(null);
  const { mutate: createExam, isPending: isCreateExamPending } = useMutation({
    mutationFn: (data: CreateExamFields) =>
      apiCall({ ...data, creator: user?.id }, paths.teacher.createExam, "post"),
    onSuccess: () => {
      resetCreateExamForm({
        course: "",
      });
    },
  });

  const { mutate: createTheory, isPending: isCreateTheoryPending } =
    useMutation({
      mutationFn: (data: CreateTheoryFields) =>
        apiCall(
          { ...data, creator: user?.id, examId: openedExam },
          paths.teacher.createTheory,
          "post"
        ),
      onSuccess: () => {
        resetCreateTheoryForm({
          questionText: "",
          course: "",
          correctAnswer: "",
        });
      },
    });

  const { mutate: createObjective, isPending: isCreateObjectivePending } =
    useMutation({
      mutationFn: (data: CreateObjectiveFields) =>
        apiCall(
          { ...data, creator: user?.id, examId: openedExam },
          paths.teacher.createObjective,
          "post"
        ),
      onSuccess: () => {
        resetCreateObjectiveForm({
          questionText: "",
          course: "",
          correctOption: "",
          options: {
            a: "",
            b: "",
            c: "",
            d: "",
          },
        });
      },
    });

  const createExamForm = useForm<CreateExamFields>({
    resolver: zodResolver(CreateExamSchema),
    defaultValues: {
      course: "",
    },
  });

  const createTheoryForm = useForm<CreateTheoryFields>({
    resolver: zodResolver(CreateTheorySchema),
    defaultValues: {
      questionText: "",
      course: "",
      correctAnswer: "",
    },
  });

  const createObjectiveForm = useForm<CreateObjectiveFields>({
    resolver: zodResolver(CreateObjectiveSchema),
    defaultValues: {
      questionText: "",
      course: "",
      correctOption: "",
      options: {
        a: "",
        b: "",
        c: "",
        d: "",
      },
    },
  });

  const { user } = useAppSelector((state) => state.auth);

  const { createdExams } = user as User<"Teacher">;

  const {
    handleSubmit: handleCreateExamFormSubmit,
    control: createExamControl,
    reset: resetCreateExamForm,
  } = createExamForm;

  const {
    handleSubmit: handleCreateTheoryFormSubmit,
    control: createTheoryControl,
    reset: resetCreateTheoryForm,
  } = createTheoryForm;

  const {
    handleSubmit: handleCreateObjectiveFormSubmit,
    control: createObjectiveControl,
    reset: resetCreateObjectiveForm,
  } = createObjectiveForm;

  const onCreateExamFormSubmit: SubmitHandler<CreateExamFields> = (data) => {
    createExam(data);
  };

  const onCreateTheoryFormSubmit: SubmitHandler<CreateTheoryFields> = (
    data
  ) => {
    createTheory(data);
  };

  const onCreateObjectiveFormSubmit: SubmitHandler<CreateObjectiveFields> = (
    data
  ) => {
    createObjective(data);
  };

  return (
    <div className="flex flex-col items-center">
      {createdExams?.length === 0 ? (
        <p className="mb-4 font-semibold">
          No tests available. Click on the button below to create a test.
        </p>
      ) : (
        <div className="flex w-full flex-col gap-y-2 mb-28">
          {createdExams?.map((createdExam, i) => (
            <Card key={i} className="flex justify-between">
              <CardHeader className="flex justify-between sm:items-center gap-4 sm:flex-row w-full">
                <div>
                  <CardTitle className="text-xl">{createdExam}</CardTitle>
                  <CardDescription>Questions Created:</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger
                    asChild
                    onClick={() => setOpenedExam(createdExam)}
                  >
                    <Button variant={"outline"}>Add Question</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Question</DialogTitle>
                      <DialogDescription>
                        Add a question here.
                      </DialogDescription>
                    </DialogHeader>
                    <Tabs defaultValue="theory">
                      <TabsList className="grid w-full grid-cols-2 mb-5">
                        {addQuestionTabs.map((tab, i) => (
                          <TabsTrigger key={i} value={tab.toLowerCase()}>
                            {tab}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                      {addQuestionTabs.map((tab, i) =>
                        tab === "Theory" ? (
                          <TabsContent
                            key={i}
                            value={tab.toLowerCase()}
                            className="h-[380px] overflow-auto"
                          >
                            <DialogHeader>
                              <Form {...createTheoryForm}>
                                <form
                                  onSubmit={handleCreateTheoryFormSubmit(
                                    onCreateTheoryFormSubmit
                                  )}
                                  id={`create-${tab.toLowerCase()}-form`}
                                >
                                  <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                      <FormField
                                        control={createTheoryControl}
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
                                        control={createTheoryControl}
                                        name="questionText"
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>Question</FormLabel>
                                            <FormControl>
                                              <Textarea
                                                placeholder="Enter a question"
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
                                        control={createTheoryControl}
                                        name="correctAnswer"
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>
                                              Correct Answer
                                            </FormLabel>
                                            <FormControl>
                                              <Textarea
                                                placeholder="Enter the correct answer to the question"
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
                                loading={isCreateTheoryPending}
                                type="submit"
                                className="w-full"
                                form={`create-${tab.toLowerCase()}-form`}
                              >
                                Submit
                              </Button>
                            </DialogFooter>
                          </TabsContent>
                        ) : (
                          <TabsContent
                            key={i}
                            value={tab.toLowerCase()}
                            className="h-[380px] overflow-auto"
                          >
                            <DialogHeader>
                              <Form {...createObjectiveForm}>
                                <form
                                  onSubmit={handleCreateObjectiveFormSubmit(
                                    onCreateObjectiveFormSubmit
                                  )}
                                  id={`create-${tab.toLowerCase()}-form`}
                                >
                                  <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                      <FormField
                                        control={createObjectiveControl}
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
                                        control={createObjectiveControl}
                                        name="questionText"
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>Question</FormLabel>
                                            <FormControl>
                                              <Textarea
                                                placeholder="Enter a question"
                                                {...field}
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                    </div>
                                    {examOptions.map((option, i) => (
                                      <div
                                        key={i}
                                        className="flex flex-col space-y-1.5"
                                      >
                                        <FormField
                                          control={createObjectiveControl}
                                          name={`options.${option}`}
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormLabel>
                                                Option {option.toUpperCase()}
                                              </FormLabel>
                                              <FormControl>
                                                <Input
                                                  placeholder="Enter an option"
                                                  {...field}
                                                />
                                              </FormControl>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />
                                      </div>
                                    ))}
                                    <div className="flex flex-col space-y-1.5">
                                      <FormField
                                        control={createObjectiveControl}
                                        name="correctOption"
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>
                                              Correct Option
                                            </FormLabel>
                                            <Select
                                              onValueChange={field.onChange}
                                              defaultValue={field.value}
                                            >
                                              <FormControl>
                                                <SelectTrigger>
                                                  <SelectValue placeholder="Select the correct option" />
                                                </SelectTrigger>
                                              </FormControl>
                                              <SelectContent>
                                                {examOptions.map(
                                                  (option, i) => (
                                                    <SelectItem
                                                      key={i}
                                                      value={option}
                                                    >
                                                      {option.toUpperCase()}
                                                    </SelectItem>
                                                  )
                                                )}
                                              </SelectContent>
                                            </Select>
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
                                loading={isCreateObjectivePending}
                                type="submit"
                                className="w-full"
                                form={`create-${tab.toLowerCase()}-form`}
                              >
                                Submit
                              </Button>
                            </DialogFooter>
                          </TabsContent>
                        )
                      )}
                    </Tabs>
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
                onSubmit={handleCreateExamFormSubmit(onCreateExamFormSubmit)}
                id="create-exam-form"
              >
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <FormField
                      control={createExamControl}
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
                      control={createExamControl}
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
                      control={createExamControl}
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
