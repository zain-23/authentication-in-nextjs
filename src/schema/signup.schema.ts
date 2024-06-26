import { z } from "zod";

export const signupSchema = z.object({
  fullName: z.string({
    required_error: "full name is required",
    invalid_type_error: "full name must be a string",
  }),
  username: z
    .string({
      required_error: "username is required",
      invalid_type_error: "username must be a string",
    })
    .toLowerCase()
    .trim()
    .min(5, { message: "Must be 5 or more characters long" }),
  email: z
    .string({
      required_error: "email is required",
      invalid_type_error: "email must be a string",
    })
    .email({ message: "Invalid email address" }),
  password: z
    .string({
      required_error: "password is required",
      invalid_type_error: "password must be a string",
    })
    .min(8, { message: "Must be 8 or more characters long" })
    .max(16, { message: "Must be less than 16 characters" }),
});
