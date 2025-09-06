"use client";

import { verifyOtp } from "@/actions/login/verify-otp";
import CountdownTimer from "@ezlegin/ui/components/CountDown";
import { Button } from "@ezlegin/ui/components/ui/button";
import { CardDescription } from "@ezlegin/ui/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@ezlegin/ui/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@ezlegin/ui/components/ui/input-otp";
import Loader from "@ezlegin/ui/components/Loader";
import { useLoading } from "@ezlegin/utils";
import { OtpType, otpSchema } from "@/lib/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Flex from "@ezlegin/ui/components/Flex";

const ConfirmEmailForm = ({
  email,
  setOpenOtpForm,
}: {
  userId: number;
  email: string;
  setOpenOtpForm: Dispatch<SetStateAction<boolean>>;
}) => {
  // HOOKS
  const router = useRouter();
  const { loading, setLoading } = useLoading();
  const [failedAttempts, setFailedAttempts] = useState(0);

  const form = useForm<OtpType>({
    resolver: zodResolver(otpSchema),
    mode: "onSubmit",
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (data: OtpType) => {
    setLoading(true);

    if (failedAttempts >= 3) {
      toast.warning("Too many attempts, Please try again later.");
      setLoading(false);
      setOpenOtpForm(false);
      return;
    }

    const res = await verifyOtp(data.otp, email);

    if (res.error) {
      toast.error(res.error);
      setLoading(false);
      form.reset();
      setFailedAttempts((prev) => prev + 1);
      return;
    }

    setFailedAttempts(0);

    toast.success("Email Verification Successfull!");
    router.refresh();
    setOpenOtpForm(false);
  };

  const otpValue = form.watch("otp");

  useEffect(() => {
    const autoSubmit = async () => {
      if (otpValue.length === 5) {
        await onSubmit({ otp: otpValue });
      }
    };

    autoSubmit();
  }, [otpValue]);

  return (
    <>
      <Flex className="justify-center mb-3">
        <CardDescription>
          Please insert verification code sent to your email.
        </CardDescription>
      </Flex>

      <div>
        <Form {...form}>
          <form className="space-y-7" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP
                      autoFocus
                      maxLength={5}
                      {...field}
                      pattern={REGEXP_ONLY_DIGITS}
                    >
                      <InputOTPGroup
                        autoFocus
                        className="w-full  flex justify-center "
                      >
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage className="text-center" />
                </FormItem>
              )}
            />

            <CountdownTimer minute={2} progressBar />

            <div>
              <Button
                disabled={!form.formState.isValid || loading}
                className="w-full mb-3"
                type="submit"
              >
                {<Loader loading={loading} />}
                Verify Code
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default ConfirmEmailForm;
