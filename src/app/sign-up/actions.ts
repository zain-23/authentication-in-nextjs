"use server";
import { connectDB } from "@/config/db";
import { VerificationEmailTemplate } from "@/emailTemplate/verificationEmail.teplate";
import { transporter } from "@/lib/nodemailer";
import { USER } from "@/model/user.model";
import { signupSchema } from "@/schema/signup.schema";
import { render } from "@react-email/components";
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
  // check username and email already exists.
  const isUsernameAlreadyExists = await USER.findOne({
    username: data.username,
  });

  if (isUsernameAlreadyExists) {
    throw new Error("Username already exists");
  }
  const isEmailAlreadyExists = await USER.findOne({ email: data.email });

  if (isEmailAlreadyExists) {
    throw new Error("Email already exists");
  }
  // token expirey is One hour.
  const verificationToken = Math.floor(
    100000 + Math.random() * 900000
  ).toString();
  const verificationTokenExpirey = new Date(Date.now() + 3600000);
  // hash Password.
  const hashPassword = await bycrypt.hash(data.password, 10);
  // create user
  const user = await USER.create({
    username: data.username,
    fullName: data.fullName,
    email: data.email,
    password: hashPassword,
    verificationToken,
    verificationTokenExpirey,
  });

  // Send Verication Email
  const emailHtml = render(
    VerificationEmailTemplate({
      code: user.verificationToken,
      url: `${process.env.SERVER_URL}/verify-user?username=${user.username}`,
    })
  );
  const emailOptions = {
    from: "sandbox.smtp.mailtrap.io",
    to: user.email,
    subject: "Verify your Account",
    html: emailHtml,
  };

  const isemailSend = await transporter.sendMail(emailOptions);
  return {
    success: true,
  };
}
