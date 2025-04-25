import Button from "@/components/ui/Button";
import { useState } from "react";
import Product from "./product/Product";
import Processing from "./customerinfo/processing/Processing";
import CustomerInfo from "./customerinfo/CustomerInfo";

const StaffHomePage = () => {
  const [hideProcessing, setHideProcessing] = useState(false);
  const [hideProducts, setHideProducts] = useState(true);
  const [hideCustomerInfo, setHideCustomerInfo] = useState(true);
  const handleHide = (component: string) => () => {
    setHideProducts(component !== "Products");
    setHideProcessing(component !== "Processing");
    setHideCustomerInfo(component !== "CustomerInfo");
  };
  return (
    <div>
      <div className="flex p-4 justify-center gap-4">
        <Button onClick={handleHide("Products")}>Products</Button>
        <Button onClick={handleHide("Processing")}>Processing</Button>
        <Button onClick={handleHide("CustomerInfo")}>CustomerInfo</Button>
      </div>
      <Product hide={hideProducts} />
      <Processing hide={hideProcessing} />
      <CustomerInfo hide={hideCustomerInfo} />
    </div>
  );
};
export default StaffHomePage;
