import z from "zod";

export const validation = {
  required: "*This field is required",
  email: "*Please enter a valid email address",
  number: "*Please enter a valid number",
  password: {
    length: "*Password must be at least 8 characters",
    number: "*Password must have a number",
    specialChar: "*Password must have a special character",
  },
};

export const UserLoginSchema = z.object({
  email: z.string().email({ message: validation.email }),
  password: z
    .string()
    .regex(/(?=.*[\W_])/, validation.password.specialChar)
    .min(8, validation.password.length)
    .regex(/(?=.*\d)/, validation.password.number),
});

export type UserLoginFields = z.infer<typeof UserLoginSchema>;
