"use server";

import { isHumanOrNot } from "@ezlegin/utils";
import { CommentFormType } from "@/lib/validationSchema";
import { database } from "@ezlegin/database";

export const createComment = async (
  data: CommentFormType,
  recaptchaToken?: string
) => {
  const { content, fullName, postId, userId } = data;

  try {
    if (recaptchaToken) {
      await isHumanOrNot(recaptchaToken);
    }

    const existingPost = await database.post.findFirst({
      where: { id: postId },
    });
    if (!existingPost) throw new Error("This Post Doesn't Exist anymore.");

    const existingUser = await database.user.findFirst({
      where: { id: userId },
    });

    await database.comment.create({
      data: {
        content,
        authorId: userId || null,
        postId,
        fullName: existingUser ? existingUser.name : fullName,
      },
    });

    return { success: "Your Comment has been sent successfully!" };
  } catch (error) {
    return { error: String(error) };
  }
};
