"use server";

import { signIn } from "@ezlegin/auth";

export const GoogleOAuthSignIn = async () => {
  await signIn("google");
};
