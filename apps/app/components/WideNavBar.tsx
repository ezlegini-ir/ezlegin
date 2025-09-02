import EzleginLogo from "@ezlegin/ui/components/EzleginLogo";
import { Button } from "@ezlegin/ui/components/ui/button";
import UserBar from "@ezlegin/ui/components/UserBar";
import Link from "next/link";
import { NavbarProps } from "./NavBar";
import { User } from "lucide-react";

const WideNavBar = ({ user, isThereItemsInCart }: NavbarProps) => {
  return (
    <div className="flex justify-between items-center">
      <Link href={"/"}>
        <EzleginLogo width={130} height={28} />
      </Link>

      {!user ? (
        <Link href={"/panel"}>
          <Button>
            <User /> User Panel
          </Button>
        </Link>
      ) : (
        <UserBar user={user} />
      )}
    </div>
  );
};

export default WideNavBar;
