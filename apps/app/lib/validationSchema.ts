import z from "zod";

const requiredText = "This field is required";
export const ticketDepartment = [
  "TECHNICAL",
  "FINANCE",
  "COURSE",
  "SUGGEST",
] as const;

//! User Forms
export const loginFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid Email!" })
    .trim()
    .min(1, requiredText),
  password: z.string().min(1, requiredText).trim(),
});
export type LoginFormType = z.infer<typeof loginFormSchema>;

// --------------

export const otpSchema = z.object({
  otp: z.string().min(6, { message: "کد احراز هویت 5 رقمی می باشد" }),
});
export type OtpType = z.infer<typeof otpSchema>;

// --------------

export const registerUserFormSchema = z.object({
  fullName: z.string().min(2, { message: "Minimum 3 characters" }).trim(),

  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),

  password: z.string().min(8, { message: "Minimum 8 characters" }),
});
export type RegisterUserFormType = z.infer<typeof registerUserFormSchema>;

// --------------

export const resetPasswordFormSchema = z.object({
  email: z.string().min(1, { message: requiredText }),
});

export type ResetPasswordFormType = z.infer<typeof resetPasswordFormSchema>;

// --------------

export const profileFormSchema = z.object({
  image: z.instanceof(File).optional(),
  firstName: z
    .string()
    .min(3, { message: "حداقل 3 حرف" })
    .regex(/^[\u0600-\u06FF\s]+$/, "فقط حروف فارسی مجاز است")
    .trim(),
  lastName: z
    .string()
    .min(3, { message: "حداقل 3 حرف" })
    .regex(/^[\u0600-\u06FF\s]+$/, "فقط حروف فارسی مجاز است")
    .trim(),
  phone: z
    .string()
    .min(1, { message: requiredText })
    .min(11, "شماره تماس باید  11 رقم باشد و با صفر شروع شود")
    .regex(/^0[0-9]{10,14}$/, "شماره باید با 0 شروع شود و فقط عدد باشد")
    .trim(),
  email: z
    .string()
    .min(1, { message: requiredText })
    .email({ message: "ایمیل نامعتبر است" }),
  nationalId: z.string().min(1, { message: requiredText }).max(10),
});
export type ProfileFormType = z.infer<typeof profileFormSchema>;

//! CART FORM
export const discountFormSchema = z.object({
  code: z.string().min(1),
});
export type DiscountFormType = z.infer<typeof discountFormSchema>;

// --------------

export const paymentFormSchema = z.object({
  cardNumber: z.string().min(1, { message: "شماره کارت الزامی می باشد" }),
});
export type PaymentFormType = z.infer<typeof paymentFormSchema>;

//! CONTACT FORM
export const contactFormSchema = z.object({
  fullName: z.string().min(1, { message: requiredText }),
  phone: z
    .string()
    .min(1, { message: requiredText })
    .min(10, { message: "شماره تماس باید 10 رقمی باشد" }),
  email: z.string().min(1, { message: requiredText }).email(),
  subject: z.string().min(1, { message: requiredText }),
  message: z.string().min(1, { message: requiredText }),
});
export type ContactFormType = z.infer<typeof contactFormSchema>;

//! COURSE RATING FORM
export const courseReviewFormSchema = z.object({
  rating: z.number().min(1, { message: "لطفا برای این دوره امتیازی ثبت کنید" }),
  review: z.string().min(1, { message: requiredText }),
});
export type CourseReviewFormType = z.infer<typeof courseReviewFormSchema>;

//! TICKET FORM
export const ticketFormSchema = z.object({
  subject: z.string().min(1, { message: requiredText }),
  department: z.enum(ticketDepartment),
  message: z.string().min(1, { message: requiredText }),
  file: z.instanceof(File).optional(),
});
export type TicketFormType = z.infer<typeof ticketFormSchema>;

// --------------

export const ticketMessageFormSchema = z.object({
  message: z.string().min(1, { message: requiredText }),
  file: z.instanceof(File).optional(),
});
export type TicketMessageFormType = z.infer<typeof ticketMessageFormSchema>;

//! CLASSROAM FORM
export const askTutorFormSchema = z.object({
  message: z.string().min(1, { message: requiredText }),
  file: z.instanceof(File).optional(),
});
export type AskTutorFormType = z.infer<typeof askTutorFormSchema>;

//! COMMENT FORM
export const commentFormSchema = z.object({
  content: z.string().min(1, { message: requiredText }),
  postId: z.number(),
  fullName: z.string(),
  userId: z.number().optional(),
});
export type CommentFormType = z.infer<typeof commentFormSchema>;
