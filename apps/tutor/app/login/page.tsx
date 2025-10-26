import LoginForm from "@/components/forms/login/LoginForm";
import EzleginLogo from "@ezlegin/ui/components/EzleginLogo";

const page = async () => {
  return (
    <div className="flex flex-col gap-5 items-center">
      <EzleginLogo lightMode />

      <div className="card p-5 w-full space-y-3">
        <LoginForm />
      </div>
    </div>
  );
};

export default page;
