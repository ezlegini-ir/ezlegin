import LoginForm from "@/components/forms/login/LoginForm";
import EzleginLogo from "@ezlegin/ui/components/EzleginLogo";
import { Card } from "@ezlegin/ui/components/ui/card";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex flex-col gap-5 items-center">
      <Link href={"#"}>
        <EzleginLogo lightMode />
      </Link>

      <Card className="p-5 w-full space-y-3">
        <LoginForm />
      </Card>
    </div>
  );
};

export default page;
