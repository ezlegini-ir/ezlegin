import SocialsIcon from "@ezlegin/ui/components/SocialsIcon";
import { Separator } from "@ezlegin/ui/components/ui/separator";
import { Copyright } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="pt-20 space-y-2">
      <div className="flex justify-between md:items-center items-start">
        <div className="flex justify-between w-full">
          <ul className="flex flex-wrap gap-10">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <SocialsIcon />
        </div>
      </div>

      <Separator />

      <div className="text-xs md:flex-row flex-col items-center gap-1 text-muted-foreground flex justify-between">
        <p>
          Read{" "}
          <Link href={"/terms-and-conditions"} className="underline">
            Terms and Privacy Policy
          </Link>{" "}
          of Ezlegin.com
        </p>

        <p className="flex items-center gap-2">
          <Copyright size={18} />
          All rights reserved for Ezlegin.com
        </p>
      </div>
    </div>
  );
};

const menuItems = [
  { label: "Home", href: "/" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
  { label: "Privacy Policy", href: "/terms-and-conditions" },
];

export default Footer;
