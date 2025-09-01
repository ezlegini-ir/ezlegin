"use client";

import { sendOtp } from "@/actions/login/otp";
import { LoginFormsProps } from "@/app/login/page";
import OAuthSignInForm from "@/components/sign-in";
import { LoginFormType, loginFormSchema } from "@/lib/validationSchema";
import Loader from "@ezlegin/ui/components/Loader";
import { Button } from "@ezlegin/ui/components/ui/button";
import { CardDescription, CardTitle } from "@ezlegin/ui/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ezlegin/ui/components/ui/form";
import { Input } from "@ezlegin/ui/components/ui/input";
import { Separator } from "@ezlegin/ui/components/ui/separator";
import { useLoading } from "@ezlegin/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const InputForm = ({
  setLoginStep,
  setInputFormValue,
  setIsNewUser,
}: LoginFormsProps) => {
  // HOOKS
  const router = useRouter();
  const { loading, setLoading } = useLoading();

  const form = useForm<LoginFormType>({
    mode: "onSubmit",
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      phoneOrEmail: "",
    },
  });

  const onSendOtp = async (data: LoginFormType) => {
    setLoading(true);
    setIsNewUser?.(false);

    const res = await sendOtp({ ...data });

    if (res.error) {
      toast.error(res.error);
      setLoading(false);
      return;
    }

    if (res.isNewUser) {
      setIsNewUser?.(res.isNewUser);
    }

    setInputFormValue?.(data.phoneOrEmail);

    toast.success("کد احراز هویت ارسال شد");
    setLoginStep("OTP");
  };

  return (
    <div className="space-y-6 ">
      <div className="text-center space-y-1">
        <CardTitle>
          <h3 className="font-medium">Welcome back to Ezlegin!</h3>
        </CardTitle>
        <CardDescription className="text-xs">
          Please enter your details to sign in your account
        </CardDescription>
      </div>

      <OAuthSignInForm />

      <div className="flex items-center gap-2">
        <Separator className="flex-1 border-gray-300" />
        <span className="text-muted-foreground text-xs">Or sign in with</span>
        <Separator className="flex-1 border-gray-300" />
      </div>

      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSendOtp)}>
          <FormField
            control={form.control}
            name="phoneOrEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input dir="ltr" className="en-digits" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={!form.formState.isValid || loading}
            className="w-full flex gap-2"
            type="submit"
          >
            {<Loader loading={loading} />}
            Continue
          </Button>

          <Button
            variant={"secondary"}
            onClick={() => router.back()}
            className="w-full"
            type="button"
          >
            Return
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default InputForm;
