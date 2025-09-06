"use server";

export const verifyOtp = async (otp: string, email: string) => {
  console.log(otp, email);
  return { error: "Authentication was successful!" };
};
