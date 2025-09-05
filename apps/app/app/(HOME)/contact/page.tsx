import ContactForm from "@/components/forms/ContactForm";
import PageTitle from "@ezlegin/ui/components/PageTitle";
import RecaptchaWrapper from "@ezlegin/ui/components/RecaptchaWrapper";
import SocialsIcon from "@ezlegin/ui/components/SocialsIcon";
import { Mail, Phone } from "lucide-react";
import { Metadata } from "next";

const page = () => {
  return (
    <div>
      <PageTitle
        title={"Contact with iGraphical"}
        description={"On this page, you can contact iGraphical"}
      />

      <div className="flex flex-wrap md:flex-nowrap gap-10 lg:gap-20 justify-between">
        <div className="w-full lg:w-2/5 space-y-4">
          <h2 className="text-center md:text-right">Contact Methods</h2>

          <p className="text-center md:text-right">
            To receive the quickest response, please fill out the contact form
            so we can review your request quickly and accurately.
            <br />
            You can also contact us by phone or email, but we recommend filling
            out the form to get the best response. 🚀
          </p>

          <SocialsIcon />

          <div className="border rounded-sm p-3 text-sm text-gray-500 flex justify-between items-center">
            <h3 className="text-base font-medium flex gap-2 items-center">
              <Mail size={18} />
              Email
            </h3>

            <a href="mailto:igraphical.ir@gmail.com">igraphical.ir@gmail.com</a>
          </div>
          <div className="border rounded-sm p-3 text-sm text-gray-500 flex justify-between items-center">
            <h3 className="text-base font-medium flex gap-2 items-center">
              <Phone size={18} />
              Contact Number
            </h3>

            <a href="tel:09357452859">{"0935-745-2859"}</a>
          </div>
        </div>

        <div className="w-full lg:w-3/5 space-y-3">
          <h2 className="text-center md:text-right">Contact Form</h2>

          <RecaptchaWrapper
            recaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
          >
            <ContactForm />
          </RecaptchaWrapper>
        </div>
      </div>
    </div>
  );
};

export default page;

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "If you need support, advice, or want to collaborate, get in touch with us. iGraphical's contact information includes email, phone number, social networks, and contact form.",
};
