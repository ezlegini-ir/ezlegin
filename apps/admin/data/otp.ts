"use server";

import { database } from "@ezlegin/database";

export const getOtpByEmail = async (email: string) => {
  return await database.otp.findFirst({
    where: {
      email,
    },
  });
};
