import Button from "@/components/ui/Button";
import Shop from "./components/Shop";
import { useState } from "react";
import Order from "./components/Order";
import Cart from "./components/Cart";
import Account from "./components/Account";

const CustomerPage = () => {
  const [hideShop, setHideShop] = useState(false);
  const [hideOrders, setHideOrders] = useState(true);
  const [hideCart, setHideCart] = useState(true);
  const [hideAccount, setHideAccount] = useState(true);
  const handleHide = (component: string) => () => {
    setHideShop(component !== "shop");
    setHideOrders(component !== "order");
    setHideCart(component !== "cart");
    setHideAccount(component !== "account");
  };
  return (
    <div>
      <div className="flex p-4 justify-center gap-4">
        <Button onClick={handleHide("account")}>Account</Button>
        <Button onClick={handleHide("shop")}>Shop</Button>
        <Button onClick={handleHide("order")}>Orders</Button>
        <Button onClick={handleHide("cart")}>Cart</Button>
      </div>
      <Shop hidden={hideShop} />
      <Order hidden={hideOrders} />
      <Cart hidden={hideCart} />
      <Account hidden={hideAccount} />
    </div>
  );
};

export default CustomerPage;
