"use server";
import { userEmail } from "@/schema/signup.schema";

export const verifyUser = async ({ email }: { email: string }) => {
  const isValidEmailAddress = userEmail;
};
