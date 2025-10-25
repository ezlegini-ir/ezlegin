import OnboardingForm from "@/components/forms/OnboardingForm";
import { getSessionUser } from "@/data/user";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const user = await getSessionUser();
  if (user?.onboardingCompleted) redirect("/panel");

  return (
    <div className="flex justify-center items-center h-screen">
      <OnboardingForm user={user} />
    </div>
  );
};

export default page;
