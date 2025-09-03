"use client";

import { signInUser } from "@/actions/login/signin-user";
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
import { redirect, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const InputForm = ({ setLoginStep }: LoginFormsProps) => {
  // HOOKS
  const { loading, setLoading } = useLoading();

  const form = useForm<LoginFormType>({
    mode: "onChange",
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const onSignIn = async ({ email, password }: LoginFormType) => {
    setLoading(true);

    const res = await signInUser({ email, password });

    if (res.error) {
      toast.error(res.error);
      setLoading(false);
      return;
    }

    if (res.success) {
      toast.success(res.success);
      redirect(callbackUrl ? callbackUrl : "/panel");
    }

    setLoading(false);
  };

  return (
    <div className="space-y-8">
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
        <form className="space-y-4" onSubmit={form.handleSubmit(onSignIn)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input autoFocus placeholder="test@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
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
            Sign In
          </Button>

          <div className="flex gap-3 pt-8">
            <Button
              variant={"outline"}
              onClick={() => setLoginStep("PREREGISTER")}
              className="w-full"
              type="button"
            >
              Create Account
            </Button>
            <Button
              variant={"ghost"}
              onClick={() => setLoginStep("FORGOTPASSWORD")}
              className="w-full"
              type="button"
            >
              Forgot Password?
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default InputForm;
