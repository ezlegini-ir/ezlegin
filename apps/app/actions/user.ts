"use server";

import { getUserById } from "@/data/user";
import { ProfileFormType, RegisterUserFormType } from "@/lib/validationSchema";
import { database } from "@ezlegin/database";
import { deleteCloudFile, uploadCloudFile } from "@ezlegin/utils";
import bcrypt from "bcrypt";
import { UploadApiResponse } from "cloudinary";

//* CREATE --------------------------------------------------------

export async function registerUser(data: RegisterUserFormType) {
  const { email, fullName, password } = data;

  try {
    const existingUser = await database.user.findFirst({
      where: {
        email,
      },
    });

    if (existingUser)
      return { error: "A user with this email already exists." };

    const hashedPassword = await bcrypt.hash(password, 10);

    await database.user.create({
      data: {
        email: email.toLowerCase(),
        name: fullName,
        password: hashedPassword,
      },
    });

    return { success: "User Created Successfully" };
  } catch (error) {
    return { error: "Error 500: " + error };
  }
}

//* UPDATE --------------------------------------------------------

export const updateUserProfile = async (data: ProfileFormType, id: number) => {
  const { firstName, lastName, image, nationalId } = data;

  try {
    // USER LOOP UP
    const existingUser = await getUserById(id);
    if (!existingUser) return { error: "user not found" };

    await database.$transaction(async (tx) => {
      if (!existingUser.nationalId) {
        const existingUserByNationalCode = await tx.user.findFirst({
          where: { nationalId },
        });

        if (existingUserByNationalCode)
          throw new Error("با این کد ملی کاربری دیگر ثبت نام کرده است.");
      }

      const updatedUser = await tx.user.update({
        where: { id },
        data: {
          firstName,
          lastName,
          nationalId: !existingUser.nationalId ? nationalId : undefined,
          fullName: `${firstName} ${lastName}`,
        },
        include: { image: true },
      });

      if (image && image instanceof File) {
        const buffer = Buffer.from(await image.arrayBuffer());
        const { secure_url, public_id, format, bytes } = (await uploadCloudFile(
          buffer,
          {
            folder: "user",
            resource_type: "image",
            width: 300,
          }
        )) as UploadApiResponse;

        if (updatedUser.image)
          await deleteCloudFile(updatedUser.image.public_id);

        await tx.image.upsert({
          where: { userId: updatedUser.id },
          update: {
            url: secure_url,
            type: "USER",
            public_id,
            format,
            size: bytes,
          },
          create: {
            url: secure_url,
            public_id,
            format,
            type: "USER",
            size: bytes,
            user: {
              connect: {
                id: updatedUser.id,
              },
            },
          },
        });
      }

      return updatedUser;
    });

    return { success: "با موفقیت ذخیره شد" };
  } catch (error) {
    return { error: String(error) };
  }
};

export const confirmCredential = async (
  userId: number,
  phone?: string,
  email?: string
) => {
  try {
    const existingUser = await database.user.findFirst({
      where: { id: userId },
    });
    if (!existingUser) throw new Error("کاربر یافت نشد.");

    await database.user.update({
      where: { id: userId },
      data: { phone, phoneVerified: true },
    });

    return { success: "شماره تماس با موفقیت تایید شد." };
  } catch (error) {
    return { error: String(error) };
  }
};
