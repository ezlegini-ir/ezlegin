"use client";

import { sendOtp } from "@/actions/login/otp";
import { updateUserProfile } from "@/actions/user";
import CardBox from "@/app/panel/components/CardBox";
import { getUserByEmail } from "@/data/user";
import { profileFormSchema, ProfileFormType } from "@/lib/validationSchema";
import { User } from "@ezlegin/database";
import Loader from "@ezlegin/ui/components/Loader";
import { Badge } from "@ezlegin/ui/components/ui/badge";
import { Button } from "@ezlegin/ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@ezlegin/ui/components/ui/dialog";
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
import { BadgeCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import ConfirmEmailForm from "./ConfirmCredentialForm";

interface Props {
  user: User;
}

const UserProfileForm = ({ user }: Props) => {
  // HOOKS
  const router = useRouter();
  const { loading, setLoading } = useLoading();
  const { loading: sendEmailOtpLoading, setLoading: setSendEmailOtpLoading } =
    useLoading();
  const [openOtpForm, setOpenOtpForm] = useState(false);
  const [email, setEmail] = useState("");

  const form = useForm<ProfileFormType>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
    defaultValues: {
      email: user.email,
      name: user.name,
    },
  });

  const onSubmit = async (data: ProfileFormType) => {
    setLoading(true);

    const res = await updateUserProfile(data, user.id);

    if (res.error) {
      toast.error(res.error);
      setLoading(false);
    }

    if (res.success) {
      toast.success(res.success);
      setLoading(false);
      router.refresh();
    }
  };

  const emailInputValue = form.getValues("email");

  const sendEmailConfirmOtp = async (email: string) => {
    setSendEmailOtpLoading(true);
    setEmail(email);

    const existingUser = await getUserByEmail(email);
    if (existingUser && existingUser.emailVerified) {
      toast.warning("There is already a user with this Email.");
      setSendEmailOtpLoading(false);
      return;
    }

    const res = await sendOtp({ email, userId: user.id });

    if (res.error) {
      toast.error(res.error);
      setSendEmailOtpLoading(false);
      return;
    }

    toast.success("Verification Code Sent.");

    setOpenOtpForm(true);
    setSendEmailOtpLoading(false);
  };

  return (
    <CardBox title="Personal Information" className="max-w-sm mx-auto">
      <Dialog open={openOtpForm} onOpenChange={setOpenOtpForm}>
        <DialogContent className="sm:max-w-sm">
          <DialogTitle />
          <ConfirmEmailForm
            userId={user.id}
            email={email}
            setOpenOtpForm={setOpenOtpForm}
          />
        </DialogContent>
      </Dialog>

      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input className="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <div className="flex justify-between items-center">
                    <span>Email</span>
                    <ConfirmField
                      loading={sendEmailOtpLoading}
                      identifier={emailInputValue}
                      isVerified={!!user.emailVerified}
                      sendConfirmOtp={sendEmailConfirmOtp}
                    />
                  </div>
                </FormLabel>
                <FormControl>
                  <Input disabled={!!user.emailVerified} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={!form.formState.isDirty || loading}
            className="w-full flex gap-2"
            type="submit"
          >
            {<Loader loading={loading} />}
            Save Changes
          </Button>
        </form>
      </Form>
    </CardBox>
  );
};

const ConfirmField = ({
  isVerified,
  identifier,
  loading: sendOtpLoading,
  sendConfirmOtp,
}: {
  isVerified: boolean;
  identifier: string;
  loading: boolean;
  sendConfirmOtp: (identifier: string) => void;
}) => {
  return isVerified ? (
    <Badge variant={"green"} className="text-green-500 text-xs gap-1 px-2">
      <BadgeCheck size={16} />
      Verified
    </Badge>
  ) : (
    <Button
      disabled={sendOtpLoading}
      onClick={() => sendConfirmOtp(identifier)}
      size={"sm"}
      type="button"
      variant={"lightBlue"}
    >
      <Loader loading={sendOtpLoading} />
      Verify Email
    </Button>
  );
};

export default UserProfileForm;
