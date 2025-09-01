import { LoginSteps } from "@/components/forms/login/LoginForm";
import ResetPasswordForm from "@/components/forms/login/ResetPasswordForm";
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
}

interface Props {
  searchParams: Promise<{ token: string; email: string }>;
}

const page = async ({ searchParams }: Props) => {
  const { token, email } = await searchParams;
  return (
    <div className="h-full">
      <div className="h-full w-full max-w-screen-sm mx-auto bg-background rounded-xl flex items-center justify-center border">
        <div>
          <ResetPasswordForm token={token} email={email} />
        </div>
      </div>
    </div>
  );
};

export default page;
