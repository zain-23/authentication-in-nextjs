"server only";
import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const key = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

const cookieOption = {
  name: "session",
  options: {
    httpOnly: true,
    secure: true,
    sameSite: "lax" as "lax" | "strict" | "none",
    path: "/",
  },
  duration: 24 * 60 * 60 * 1000,
};

export const encrypt = async (payload: JWTPayload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1day")
    .sign(key);
};

export const decrypt = async (session: string) => {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return null;
  }
};

export const createSession = async (userId: string) => {
  const expires = new Date(Date.now() + cookieOption.duration);
  const session = await encrypt({ userId, expires });
  cookies().set(cookieOption.name, session, {
    ...cookieOption.options,
    expires,
  });
  redirect("/profile");
};
export const verifySession = async () => {
  const cookie = cookies().get(cookieOption.name)?.value;
  const session = await decrypt(cookie!);

  if (!session?.id) {
    redirect("/login");
  }
  return {
    userId: session?.id,
  };
};
export const deleteSession = async () => {
  cookies().delete(cookieOption.name);
  redirect("/sign-in")
};
