"use server";

import { database } from "@ezlegin/database";

export const getOtpByIdentifier = async (identifier: string) => {
  return await database.otp.findFirst({
    where: {
      identifier,
    },
  });
};
