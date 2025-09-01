import LoginForm from "@/components/forms/login/LoginForm";
import EzleginLogoSquare from "@ezlegin/ui/components/IgraphLogoSquare";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";

export interface LoginFormsProps {
  setLoginStep: Dispatch<SetStateAction<"INPUT" | "OTP" | "REGISTER">>;
  setInputFormValue?: Dispatch<React.SetStateAction<string>>;
  inputFormValue?: string;
  setIsNewUser?: Dispatch<React.SetStateAction<boolean>>;
  isNewUser?: boolean;
  redirectTo?: string;
  onSuccess?: () => void;
}

const page = () => {
  return (
    <div className="w-full flex gap-3  h-full">
      <div className="w-5/12  bg-gray-950 text-background relative rounded-xl overflow-hidden flex items-end justify-center pb-10">
        <div className="absolute -right-96 -top-52 h-[800px] w-[800px] bg-blue-950/70 rounded-full blur-[100px] " />
        <div className="absolute -right-40 -top-40 h-[400px] w-[400px] bg-blue-900/80 rounded-full blur-[100px] " />

        <div className="relative z-10 flex flex-col items-center text-center space-y-3">
          <Link href={"/"} className="block">
            <EzleginLogoSquare size={70} />
          </Link>

          <h2 className="text-xl font-medium">Learn Without Limits!</h2>
          <p className="text-muted-foreground text-xs max-w-sm">
            Sign in to access your courses, track your progress, and unlock
            knowledge that helps you grow your skills and achieve your goals.
          </p>
        </div>
      </div>

      <div className="w-8/12 bg-background rounded-xl flex items-center justify-center border">
        <LoginForm />
      </div>
    </div>
  );
};

export default page;
