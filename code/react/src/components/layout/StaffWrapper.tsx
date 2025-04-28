import { Outlet, useNavigate } from "react-router";
import Button from "../ui/Button";

const StaffWrapper = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex p-4 justify-center gap-4">
        <Button onClick={() => navigate("/staff/customerinfo")}>
          CustomerInfo
        </Button>
        <Button onClick={() => navigate("/staff/processing")}>
          Processing
        </Button>
        <Button onClick={() => navigate("/staff/products")}>Products</Button>
        <Button onClick={() => navigate("/staff/logistics")}>Logistics</Button>
      </div>
      <Outlet />
    </div>
  );
};

export default StaffWrapper;
