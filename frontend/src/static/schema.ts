import z from "zod";

export const validation = {
  required: "*This field is required",
  email: "*Please enter a valid email address",
  number: "*Please enter a valid number",
  password: {
    length: "*Password must be at least 8 characters",
    number: "*Password must have a number",
    // specialChar: "*Password must have a special character",
  },
};

export const UserLoginSchema = z.object({
  username: z.string().min(1, { message: validation.required }),
  password: z
    .string()
    // .regex(/(?=.*[\W_])/, validation.password.specialChar)
    .min(8, validation.password.length),
  // .regex(/(?=.*\d)/, validation.password.number),
});

export const CreateTheorySchema = z.object({
  questionText: z.string().min(1, { message: validation.required }),
  correctAnswer: z.string().min(1, { message: validation.required }),
});

export const CreateObjectiveSchema = z.object({
  questionText: z.string().min(1, { message: validation.required }),
  options: z.object({
    a: z.string().min(1, { message: validation.required }),
    b: z.string().min(1, { message: validation.required }),
    c: z.string().min(1, { message: validation.required }),
    d: z.string().min(1, { message: validation.required }),
  }),
  correctOption: z.string().min(1, { message: validation.required }),
});

export const CreateExamSchema = z.object({
  course: z.string().min(1, { message: validation.required }),
  startTime: z.date({ required_error: validation.required }),
  endTime: z.date({ required_error: validation.required }),
});

export const TakeExamSchema = z.object({
  examId: z.string().min(1, { message: validation.required }),
});

export type UserLoginFields = z.infer<typeof UserLoginSchema>;
export type CreateExamFields = z.infer<typeof CreateExamSchema>;
export type CreateTheoryFields = z.infer<typeof CreateTheorySchema>;
export type CreateObjectiveFields = z.infer<typeof CreateObjectiveSchema>;
export type TakeExamFields = z.infer<typeof TakeExamSchema>;
