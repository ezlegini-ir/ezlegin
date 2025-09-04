"use server";

import { isHumanOrNot } from "@ezlegin/utils";
import { database } from "@ezlegin/database";
import { convertPersianDigitsToEnglish } from "@ezlegin/utils";

export const verifyCertificate = async (
  serial: string,
  recaptchaToken: string
) => {
  try {
    await isHumanOrNot(recaptchaToken);

    const normalizedSerial = convertPersianDigitsToEnglish(serial);

    const certificate = await database.certificate.findFirst({
      where: { serial: normalizedSerial },
      include: {
        enrollment: {
          include: {
            user: true,
            course: true,
          },
        },
      },
    });

    if (certificate) {
      return {
        success: "This Certificate is valid and registered in our system.",
        certificate,
      };
    } else {
      return {
        error: "This Certificate is not valid and registered in our system. ",
      };
    }
  } catch (error) {
    return { error: String(error) };
  }
};
