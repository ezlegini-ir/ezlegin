"use server";

import { database } from "@ezlegin/database";

export const getPostById = async (postId: string) => {
  return await database.post.findUnique({
    where: { id: +postId },
    include: {
      image: true,
    },
  });
};
