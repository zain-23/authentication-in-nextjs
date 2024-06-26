"use server";
import { connectDB } from "@/config/db";
import { decrypt, deleteSession, verifySession } from "@/lib/session";
import { USER } from "@/model/user.model";
import { cookies } from "next/headers";

export const getUserDetails = async () => {
  try {
    const cookie = cookies().get("session")?.value;
    const session = await decrypt(cookie!);

    if (!session?.userId) {
      throw new Error("Invalid session");
    }
    await connectDB();
    const user = await USER.findById(session.userId).select(
      "fullName email username"
    );
    return {
      username: user.username,
      email: user.email,
      fullName: user.fullName,
    };
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  await deleteSession();
};
