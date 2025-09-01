import { getCartByUserId } from "@/data/cart";
import { getSessionUser } from "@/data/user";
import { Cart, User } from "@ezlegin/database";
import NavBarContent from "./NavBarContent";

export interface CartType extends Cart {
  _count: { cartItem: number };
}

export interface NavbarProps {
  user: User | undefined | null;
  isThereItemsInCart: Boolean;
}

const NavBar = async () => {
  const user = await getSessionUser();
  const cart = await getCartByUserId(user?.id);

  return (
    <>
      <div className="md:hidden sticky top-0 z-50">
        <NavBarContent isWide={false} user={user} cart={cart} />
      </div>
      <div className="hidden md:block sticky top-0 z-50">
        <NavBarContent isWide={true} user={user} cart={cart} />
      </div>
    </>
  );
};

export default NavBar;
