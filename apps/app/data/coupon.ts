"use server";

import { database } from "@ezlegin/database";

export const getCouponByCode = async (code: string) => {
  return await database.coupon.findUnique({
    where: { code },
    include: {
      courseExclude: true,
      courseInclude: true,
    },
  });
};
