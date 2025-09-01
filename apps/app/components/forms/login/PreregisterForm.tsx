import OAuthSignInForm from "@/components/sign-in";
import { Button } from "@ezlegin/ui/components/ui/button";
import React from "react";

const PreregisterForm = () => {
  return (
    <div className="space-y-4">
      <OAuthSignInForm />

      <Button variant="outline" className="w-full" disabled>
        SIgn Up With Email
      </Button>
    </div>
  );
};

export default PreregisterForm;
