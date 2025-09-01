"use client";

import RecaptchaWrapper from "@ezlegin/ui/components/RecaptchaWrapper";
import { useState } from "react";
import InputForm from "./InputForm";
import RegisterForm from "./RegisterForm";

interface Props {
  redirectTo?: string;
  onSuccess?: () => void;
}

const LoginForm = ({ redirectTo, onSuccess }: Props) => {
  // HOOKS
  const [loginStep, setLoginStep] = useState<
    "INPUT" | "FORGOTPASSWORD" | "REGISTER" | "PREREGISTER"
  >("INPUT");
  const [inputFormValue, setInputFormValue] = useState("");

  return (
    <div className="w-[350px] mx-auto">
      <RecaptchaWrapper
        recaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
      >
        {loginStep === "INPUT" && (
          <InputForm
            setLoginStep={setLoginStep}
            setInputFormValue={setInputFormValue}
          />
        )}

        {loginStep === "PREREGISTER" && (
          <RegisterForm
            setLoginStep={setLoginStep}
            inputFormValue={inputFormValue}
            redirectTo={redirectTo}
            onSuccess={onSuccess}
          />
        )}
      </RecaptchaWrapper>
    </div>
  );
};

export default LoginForm;
