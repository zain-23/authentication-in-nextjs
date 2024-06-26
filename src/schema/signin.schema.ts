import { z } from "zod";

export const siginSchema = z.object({
  username: z
    .string({
      required_error: "username is required",
      invalid_type_error: "username must be a string",
    })
    .toLowerCase()
    .trim()
    .min(5, { message: "Must be 5 or more characters long" }),
  password: z
    .string({
      required_error: "password is required",
      invalid_type_error: "password must be a string",
    })
    .min(8, { message: "Must be 8 or more characters long" })
    .max(16, { message: "Must be less than 16 characters" }),
});
