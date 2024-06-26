"use server";
import { connectDB } from "@/config/db";
import { USER } from "@/model/user.model";
import { signupSchema } from "@/schema/signup.schema";
import bycrypt from "bcrypt";
import { z } from "zod";

export async function signUp({ data }: { data: z.infer<typeof signupSchema> }) {
  // validate field
  const validationResult = signupSchema.safeParse({
    fullName: data.fullName,
    username: data.username,
    email: data.email,
    password: data.password,
  });

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }
  await connectDB();
  // hash Password
  const hashPassword = await bycrypt.hash(data.password, 10);
  // create user
  const user = await USER.create({
    username: data.username,
    fullName: data.fullName,
    email: data.email,
    password: hashPassword,
  });

  return {
    success: true,
  };
}
