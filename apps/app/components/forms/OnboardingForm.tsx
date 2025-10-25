"use client";

import {
  onboardingFormSchema,
  OnboardingFormType,
} from "@/lib/validationSchema";
import Loader from "@ezlegin/ui/components/Loader";
import { Button } from "@ezlegin/ui/components/ui/button";
import { Card, CardContent, CardHeader } from "@ezlegin/ui/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ezlegin/ui/components/ui/form";
import { Input } from "@ezlegin/ui/components/ui/input";
import { useLoading } from "@ezlegin/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { CountrySelectInput } from "./login/CountrySelectInput";

const OnboardingForm = () => {
  // HOOKS
  const { loading, setLoading } = useLoading();

  const form = useForm<OnboardingFormType>({
    mode: "onChange",
    resolver: zodResolver(onboardingFormSchema),
    defaultValues: {
      fullName: "",
      country: "",
    },
  });
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const onSubmit = async (data: OnboardingFormType) => {
    setLoading(true);
  };

  return (
    <Card className="p-5 max-w-lg w-full">
      <CardHeader className="text-center">
        <h3>Welcome Aboard!👋</h3>
        <p className="text-muted-foreground text-sm">
          Please tell us a bit more about yourself.
        </p>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input autoFocus placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <CountrySelectInput
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-8 space-y-3">
              <Button
                disabled={!form.formState.isValid || loading}
                className="w-full"
                type="submit"
              >
                <Loader loading={loading} />
                Complete
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default OnboardingForm;
