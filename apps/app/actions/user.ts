"use server";

import { getSessionUser, getUserById } from "@/data/user";
import {
  OnboardingFormType,
  ProfileFormType,
  RegisterUserFormType,
} from "@/lib/validationSchema";
import { database } from "@ezlegin/database";
import bcrypt from "bcrypt";

//* CREATE --------------------------------------------------------

export async function registerUser(data: RegisterUserFormType) {
  const { email, password } = data;

  try {
    const existingUser = await database.user.findFirst({
      where: { email },
    });

    if (existingUser) throw new Error("A user with this email already exists.");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await database.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
      },
    });

    return { success: "User Created Successfully", user: newUser };
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export async function compeleteOnboarding(data: OnboardingFormType) {
  const { fullName, country } = data;
  try {
    const user = await getSessionUser();
    if (!user) return { error: "Unauthorized, Please login again." };

    await database.user.update({
      where: { id: user.id },
      data: {
        name: fullName,
        country,
        onboardingCompleted: true,
      },
    });

    return { success: "Onboarding Completed Successfully" };
  } catch (error) {
    return { error: String(error) };
  }
}

//* UPDATE --------------------------------------------------------

export const updateUserProfile = async (data: ProfileFormType, id: number) => {
  const { email, name, country } = data;

  try {
    // USER LOOP UP
    const existingUser = await getUserById(id);
    if (!existingUser) return { error: "user not found" };

    await database.$transaction(async (tx) => {
      const updatedUser = await tx.user.update({
        where: { id },
        data: {
          name,
          email,
          country,
        },
      });

      return updatedUser;
    });

    return { success: "User Updated Successfully" };
  } catch (error) {
    return { error: String(error) };
  }
};
