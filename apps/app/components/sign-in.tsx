"use client";

import { GoogleOAuthSignIn } from "@/actions/login/oAuth";
import { googleLogo } from "@/public";
import Loader from "@ezlegin/ui/components/Loader";
import { Button } from "@ezlegin/ui/components/ui/button";
import { useLoading } from "@ezlegin/utils";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function OAuthSignInForm() {
  const { loading, setLoading } = useLoading();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const onSignIn = async () => {
    setLoading(true);
    await GoogleOAuthSignIn({ callbackUrl });
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
      Sign In / Sign Up with Google
      <Loader loading={loading} />
    </Button>
  );
}
