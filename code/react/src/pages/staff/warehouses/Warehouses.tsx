import React from "react";

type Props = {};

const Warehouses = (p) => {
  return (
    <div>
      <div>
        <div>Warehouses</div>
        <Warehouse />
      </div>
      <div>
        <div>suppliers</div>
        <Supplier />
      </div>
    </div>
  );
};

const Warehouse = () => {
  return <div className="border p-2 flex">Warehouse</div>;
};

const Supplier = () => {
  return <div className="border p-2 flex ">Supplier</div>;
};
export default Warehouses;
