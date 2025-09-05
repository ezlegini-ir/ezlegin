"use server";

import { signIn } from "@ezlegin/auth";

export const GoogleOAuthSignIn = async ({
  callbackUrl,
}: {
  callbackUrl: string | null;
}) => {
  await signIn("google", {
    redirectTo: callbackUrl || undefined,
  });
};
