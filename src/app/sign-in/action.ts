"use server";
import { connectDB } from "@/config/db";
import { createSession } from "@/lib/session";
import { USER } from "@/model/user.model";
import { siginSchema } from "@/schema/signin.schema";
import bcrypt from "bcrypt";
import { z } from "zod";

export const Signin = async ({
  data,
}: {
  data: z.infer<typeof siginSchema>;
}) => {
  const validationResult = siginSchema.safeParse({
    username: data.username,
    password: data.password,
  });

  if (!validationResult.success) {
    return {
      error: validationResult.error.flatten().fieldErrors,
    };
  }
  await connectDB();
  const user = await USER.findOne({ username: data.username });
  if (!user) {
    throw new Error("Incorrect Username");
  }
  const isPasswordCorrect = await bcrypt.compare(data.password, user.password);

  if (!isPasswordCorrect) {
    throw new Error("Incorrect Password");
  }

  await createSession(user._id);
};
