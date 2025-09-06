import LoginForm, { LoginSteps } from "@/components/forms/login/LoginForm";
import { User } from "@ezlegin/database";
import EzleginLogoSquare from "@ezlegin/ui/components/EzleginLogoSquare";
import { Card } from "@ezlegin/ui/components/ui/card";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";

export interface LoginFormsProps {
  setLoginStep: Dispatch<SetStateAction<LoginSteps>>;
  loginStep?: LoginSteps;
  setInputFormValue?: Dispatch<React.SetStateAction<string>>;
  inputFormValue?: string;
  setIsNewUser?: Dispatch<React.SetStateAction<boolean>>;
  isNewUser?: boolean;
  redirectTo?: string;
  onSuccess?: () => void;
  setNewUser?: Dispatch<SetStateAction<User | undefined>>;
}

const page = async () => {
  return (
    <div className="w-full flex justify-center gap-3  h-full">
      <div className="hidden md:flex w-5/12 text-background relative rounded-xl overflow-hidden items-end justify-center pb-10">
        <div className="absolute -right-96 -top-52 h-[800px] w-[800px] bg-blue-950/70 rounded-full blur-[100px] " />
        <div className="absolute -right-40 -top-40 h-[400px] w-[400px] bg-blue-900/80 rounded-full blur-[100px] " />

        <div className="relative z-10 flex flex-col items-center text-center space-y-3">
          <Link href={"/"} className="block">
            <EzleginLogoSquare size={70} />
          </Link>

          <h2 className="text-xl text-foreground font-medium">
            Learn Without Limits!
          </h2>
          <p className="text-muted-foreground text-xs max-w-sm">
            Sign in to access your courses, track your progress, and unlock
            knowledge that helps you grow your skills and achieve your goals.
          </p>
        </div>
      </div>

      <Card className="md:w-8/12 bg-background rounded-xl flex items-center justify-center p-4">
        <LoginForm />
      </Card>
    </div>
  );
};

export default page;
