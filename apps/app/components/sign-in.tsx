"use client";

import { GoogleOAuthSignIn } from "@/actions/login/oAuth";
import { googleLogo } from "@/public";
import Loader from "@ezlegin/ui/components/Loader";
import { Button } from "@ezlegin/ui/components/ui/button";
import { useLoading } from "@ezlegin/utils";
import Image from "next/image";

export default function OAuthSignInForm({
  type,
}: {
  type?: "SIGNIN" | "SIGNUP";
}) {
  const { loading, setLoading } = useLoading();

  const onSignIn = async () => {
    setLoading(true);
    await GoogleOAuthSignIn();
  };

  return (
    <Button
      onClick={onSignIn}
      disabled={loading}
      variant={"outline"}
      className="w-full"
      type="submit"
    >
      <Image alt="Google Logo" src={googleLogo} width={18} height={18} />
      {type === "SIGNUP" ? "Sign Up with Google" : "Sign In with Google"}
      <Loader loading={loading} />
    </Button>
  );
}
