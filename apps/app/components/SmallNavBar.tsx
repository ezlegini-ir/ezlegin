import Avatar from "@ezlegin/ui/components/Avatar";
import EzleginLogoSquare from "@ezlegin/ui/components/IgraphLogoSquare";
import { Button } from "@ezlegin/ui/components/ui/button";
import { User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavbarProps } from "./NavBar";

const SmallNavBar = ({ user, isThereItemsInCart }: NavbarProps) => {
  const pathName = usePathname();
  const showProfileButton = pathName.startsWith("/courses/");

  return (
    <div className="px-2">
      <div className="flex justify-between">
        <Link href={"/"}>
          <EzleginLogoSquare size={48} />
        </Link>

        <div className="flex gap-2 text-gray-500">
          {user ? (
            <Link href={"/panel"}>
              <Button variant={"outline"}>
                <Avatar src={user.image} size={25} />
                {user.name}
              </Button>
            </Link>
          ) : (
            showProfileButton && (
              <Link href={"/panel"}>
                <Button size={"icon"} variant={"outline"}>
                  <User className="scale-125" />
                </Button>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SmallNavBar;
