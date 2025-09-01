"use server";

import { getUserByEmail } from "@/data/user";
import { database } from "@ezlegin/database";
import { sendResetPasswordEmail } from "@ezlegin/utils";
import { addMinutes } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

export const sendResetPasswordToken = async (email: string) => {
  try {
    const existingUser = await getUserByEmail(email);
    if (!existingUser)
      throw new Error("There is no user with this Email address.");

    const existingToken = await database.resetPasswordToken.findFirst({
      where: {
        user: {
          email,
        },
      },
    });

    if (existingToken)
      await database.resetPasswordToken.delete({
        where: {
          id: existingToken.id,
        },
      });

    const hashedToken = await bcrypt.hash(uuidv4(), 10);

    const newToken = await database.resetPasswordToken.create({
      data: {
        expires: addMinutes(new Date(), 5),
        token: hashedToken,
        userId: existingUser.id,
      },
    });

    await sendResetPasswordEmail(existingUser.email, newToken.token);

    return { success: `Reset Link Sent to ${existingUser.email}` };
  } catch (error) {
    return { error: (error as Error).message };
  }
};
