"use server";

import { getUserById } from "@/data/user";
import { ProfileFormType, RegisterUserFormType } from "@/lib/validationSchema";
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
