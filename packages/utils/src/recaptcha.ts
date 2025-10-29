"use server";

import axios from "axios";

export async function isHumanOrNot(token: string) {
  const secret = process.env.RECAPTCHA_SECRET_KEY!;

  const { data } = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify`,
    null,
    {
      params: {
        secret,
        response: token,
      },
    }
  );

  const isHuman = data.success && data.score > 0.5;

  if (!isHuman) {
    throw new Error("You've Recognized as a Bot, Please Try Again later...");
  }
}
