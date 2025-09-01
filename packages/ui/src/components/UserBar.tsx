"use client";

import { User } from "@ezlegin/database";
import { Button } from "@ezlegin/ui/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ezlegin/ui/components/ui/dropdown-menu";
import { DropdownMenu, DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import {
  ChevronDown,
  Headset,
  LogOut,
  PanelRight,
  TvMinimalPlay,
  User as UserIcon,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Avatar from "./Avatar";

interface Props {
  user: User;
}

const UserBar = ({ user }: Props) => {
  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger asChild className="min-w-[175px]">
        <Button variant={"outline"}>
          <Avatar src={user?.image} size={26} />
          {user?.name}
          <ChevronDown className="text-slate-500" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48">
        <DropdownMenuGroup>
          {menuItems.map((item, index) => (
            <div key={index}>
              <Link href={item.href}>
                <DropdownMenuItem className="cursor-pointer py-2">
                  <item.icon className="text-primary/80" />
                  <span>{item.label}</span>
                </DropdownMenuItem>
              </Link>
            </div>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => signOut()}
          className="text-slate-500 cursor-pointer"
        >
          <LogOut className="text-destructive" />
          <span>خروج</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const menuItems = [
  { label: "داشبورد", href: "/panel", icon: PanelRight },
  { label: "دوره‌های من", href: "/panel/courses", icon: TvMinimalPlay },
  { label: "پشتیبانی", href: "/panel/tickets", icon: Headset },
  { label: "پروفایل", href: "/panel/profile", icon: UserIcon },
];

export default UserBar;
