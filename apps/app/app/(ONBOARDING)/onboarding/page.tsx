import OnboardingForm from "@/components/forms/onboarding/OnboardingForm";
import { getSessionUser } from "@/data/user";
import { sendOtpEmail } from "@ezlegin/utils";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  if (user?.onboardingCompleted) redirect("/panel");

  if (!user.emailVerified) {
    await sendOtpEmail({ email: user?.email, userId: user?.id });
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <OnboardingForm user={user} />
    </div>
  );
};

export default page;
