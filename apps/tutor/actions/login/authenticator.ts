"use server";

import { signIn } from "@ezlegin/auth";
import { redirect } from "next/navigation";

export const authenticator = async (identifier: string) => {
  const signInResponse = await signIn("tutor-login", {
    identifier,
    redirect: false,
  });

  if (signInResponse.error) return { error: "Invalid Credentials" };

  redirect("/");
};
