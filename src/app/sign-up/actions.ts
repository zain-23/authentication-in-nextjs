"use server";
import { USER } from "@/model/user.model";
import { connectDB } from "@/config/db";
import { signupSchema } from "@/schema/signup.schema";
import { z } from "zod";
import bycrypt from "bcrypt";
import { createSession } from "@/lib/session";
// import mongoose from "mongoose";
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
  console.log(user);

  // create session
  await createSession(user._id);
}
