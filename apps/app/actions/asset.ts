"use server";

import { database } from "@ezlegin/database";

export const addDownloadCount = async (assetId: number) => {
  try {
    await database.asset.update({
      where: { id: assetId },
      data: {
        downloadCount: { increment: 1 },
      },
    });

    return { success: "Download Count incremented Successfully." };
  } catch (error) {
    console.log(error);
    return { error: "Something Happended. Please Try again Later." };
  }
};
