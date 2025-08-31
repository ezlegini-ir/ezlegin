"use server";

import { database } from "@ezlegin/database";

export const getWalletByUserId = async (userId: number) => {
  return await database.wallet.findFirst({
    where: { userId },
  });
};
