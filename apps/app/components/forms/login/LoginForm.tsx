"use client";

import RecaptchaWrapper from "@ezlegin/ui/components/RecaptchaWrapper";
import { useState } from "react";
import InputForm from "./InputForm";
import RegisterForm from "./RegisterForm";
import ResetPasswordInputForm from "./ResetPasswordInputForm";

interface Props {
  redirectTo?: string;
  onSuccess?: () => void;
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
    <div className="w-[350px] mx-auto">
      <RecaptchaWrapper
        recaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
      >
        {loginStep === "INPUT" && <InputForm setLoginStep={setLoginStep} />}

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
