"use server";

import { isHumanOrNot } from "@ezlegin/utils";
import { ContactFormType } from "@/lib/validationSchema";
import { database } from "@ezlegin/database";

export const createContact = async (
  data: ContactFormType,
  recaptchaToken: string
) => {
  const { email, fullName, message, phone, subject } = data;
  try {
    await isHumanOrNot(recaptchaToken);

    await database.contact.create({
      data: {
        email,
        fullName,
        message,
        phone,
        subject,
      },
    });

    return {
      success:
        "Sent successfully! Response time is usually within 24 hours via email.",
    };
  } catch (error) {
    return { error: String(error) };
  }
};
