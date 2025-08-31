"use server";

import { database } from "@ezlegin/database";

export const getReviewByUserIdAndCourseId = async (
  userId: number,
  courseId: number
) => {
  return await database.review.findFirst({
    where: { userId, courseId },
  });
};
