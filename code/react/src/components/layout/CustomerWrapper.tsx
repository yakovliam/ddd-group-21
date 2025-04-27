import { Outlet, useNavigate } from "react-router";
import Button from "../ui/Button";

const CustomerWrapper = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex p-4 justify-center gap-4">
        <Button onClick={() => navigate("/customer/products")}>Products</Button>
        <Button onClick={() => navigate("/customer/cart")}>Cart</Button>
        <Button onClick={() => navigate("/customer/account")}>Account</Button>
      </div>
      <Outlet />
    </div>
  );
};

export default CustomerWrapper;
