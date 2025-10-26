"use server";

import { database } from "@ezlegin/database";
import bcrypt from "bcryptjs";
import { addMinutes } from "date-fns";

export const generateOtp = async (
  email: string,
  userId?: number,
  adminId?: number,
  tutorId?: number
) => {
  // GENERATE DAYA
  const plainOtp = Math.floor(10000 + Math.random() * 90000).toString();
  const expires = addMinutes(new Date(), 2);

  // LOOK UP USER
  const existingToken = await database.otp.findFirst({
    where: {
      email,
    },
  });

  if (existingToken)
    await database.otp.delete({
      where: { email },
    });

  // HASH OTP
  const hashedOTP = await bcrypt.hash(plainOtp, 10);

  await database.otp.create({
    data: {
      expires,
      email,
      otpCode: hashedOTP,
      userId,
      adminId,
      tutorId,
    },
  });

  return { plainOtp };
};
