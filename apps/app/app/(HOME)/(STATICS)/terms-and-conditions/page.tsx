import AnimatedTitle from "@/components/animations/AnimatedTitle";
import Title from "@ezlegin/ui/components/Title";
import { Metadata } from "next";

const Page = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <AnimatedTitle
        title={"Ezlegin's Terms and Privacy Policy"}
        subtitle={
          "By registering on the Ezlegin website, you accept Ezlegin's terms and conditions for using the services of this platform. Below are some of the important rules of Ezlegin:"
        }
      />

      <div className="space-y-3 mb-6 text-sm">
        <Title title="Rules" className="text-xl" />
        {rules.map((rule, index) => (
          <p className="card" key={index}>
            {rule}
          </p>
        ))}
      </div>

      <div className="space-y-3 text-sm">
        <Title title="User Privacy" className="text-xl" />
        <div className="card text-sm">
          <pre className="text-sm"> {privacy}</pre>
        </div>
      </div>
    </div>
  );
};

const rules = [
  "Any distribution, reproduction, redistribution, sale, or commercial exploitation of the course content and materials on the Ezlegin website, in any form or platform, is prohibited and will be subject to legal action.",
  "By registering on the Ezlegin website, the user agrees that if they violate the website's rules, Ezlegin has the right to block the user's access and pursue legal action through official authorities and the company's lawyer.",
  "Access to the courses is only available online, and any downloading, screen recording, or distribution of course content by users is prohibited and unauthorized.",
  "Each purchase is solely for the personal and individual use of the buyer, and the user is not permitted under any circumstances to share their account, even with family members.",
  "By registering on the site, the user consents to be part of the SMS club and to receive notifications and related messages from Ezlegin.",
  "The responsibility for the accuracy of the entered information, including the name, surname, and national ID number, lies with the user. If a certificate is issued with incorrect information, Ezlegin will not be responsible for correcting or reissuing the document.",
  "By submitting feedback or participating in the content on the site, the user gives Ezlegin permission to publish their profile picture and display name on the website and the official social media channels of the platform.",
  "Any attempt to infiltrate, hack, manipulate, or disrupt the technical systems or content of the website will be considered a violation and will lead to legal action.",
  "Refunds are only possible in cases where a serious flaw in access or quality of the courses is proven by Ezlegin, and the review will be based on the support team's decision.",
  "All intellectual property rights and ownership of the courses and content provided belong to Ezlegin, and any use outside the established framework will be considered a violation of the author’s rights.",
];

const privacy = `The privacy of users on the Ezlegin website is a top priority. We are committed to fully protecting users' personal information and providing a secure environment for using the site's services. To achieve this, we use various encryption technologies for transmitting data between the user and the server to prevent unauthorized access.

The information we collect from users is used solely to provide better and more accurate services, and no personal information will be shared or sold to third parties.

Ezlegin only requests information from you that is necessary for providing the required services, and any use of user information outside of the scope of these services is unauthorized by Ezlegin.

We continually strive to create a safer environment for our valued users by updating our security infrastructure.`;

export default Page;

export const metadata: Metadata = {
  title: "Terms and Conditions - Ezlegin",
  description:
    "Read Ezlegin's terms and conditions for using our services and learn about our commitment to user privacy.",
};
