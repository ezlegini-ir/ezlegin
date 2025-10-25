"use client";

import RecaptchaWrapper from "@ezlegin/ui/components/RecaptchaWrapper";
import { Dispatch, SetStateAction, useState } from "react";
import InputForm from "./InputForm";
import RegisterForm from "./RegisterForm";
import ResetPasswordInputForm from "./ResetPasswordInputForm";
import { User } from "@ezlegin/database";

interface Props {
  redirectTo?: string;
  onSuccess?: () => void;
}

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

export type LoginSteps =
  | "INPUT"
  | "FORGOTPASSWORD"
  | "PREREGISTER"
  | "REGISTER";

const LoginForm = ({ redirectTo, onSuccess }: Props) => {
  // HOOKS
  const [loginStep, setLoginStep] = useState<LoginSteps>("INPUT");

  return (
    <div className="md:w-[350px] mx-auto">
      <RecaptchaWrapper
        recaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
      >
        {loginStep === "INPUT" && (
          <InputForm
            setLoginStep={setLoginStep}
            onSuccess={onSuccess}
            redirectTo={redirectTo}
          />
        )}

        {loginStep === "FORGOTPASSWORD" && (
          <ResetPasswordInputForm setLoginStep={setLoginStep} />
        )}

        {loginStep === "PREREGISTER" && (
          <RegisterForm
            setLoginStep={setLoginStep}
            redirectTo={redirectTo}
            onSuccess={onSuccess}
          />
        )}
      </RecaptchaWrapper>
    </div>
  );
};

export default LoginForm;
