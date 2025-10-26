import { z } from "zod";

const requiredMessage = "Required";

//! LOGIN FORM
export const loginFormSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8, { message: requiredMessage }),
});
export type LoginFormType = z.infer<typeof loginFormSchema>;
// --------------
export const otpFormSchema = z.object({
  otp: z.string().min(6),
});
export type OtpType = z.infer<typeof otpFormSchema>;

//! QA FORM
export const QaFormSchema = z.object({
  message: z.string(),
  file: z.instanceof(File).optional(),
});
export type QaFormType = z.infer<typeof QaFormSchema>;
