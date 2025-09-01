import LoginForm from "@/components/forms/login/LoginForm";
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
      <div className="w-8/12 bg-background rounded-xl flex items-center justify-center">
        <LoginForm />
      </div>

      <div className="w-5/12  bg-red-500 text-background relative rounded-xl">
        hi
      </div>
    </div>
  );
};

export default page;
