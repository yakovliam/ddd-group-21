import DynamicDataTable from "@/components/composite/DynamicDataTable";
import StatefulTableCell from "@/components/composite/StatefulTableCell";
import {
  useStaffCustomerOrders,
  useStaffProducts,
  useStocks,
  useSupplierProducts,
  useSuppliers,
  useWarehouses,
} from "@/hooks/use-api";
import { CustomerOrder } from "@/types/customerorder";
import { Product } from "@/types/product";
import { Stock } from "@/types/stock";
import { Supplier } from "@/types/supplier";
import { SupplierProduct } from "@/types/supplierproduct";
import { Warehouse } from "@/types/warehouse";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

const StaffLogisticsPage = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <h1>Staff Logistics Page</h1>

      <div className="flex gap-4 flex-col items-start w-full">
        <ProductsTable />
        <WarehousesTable />
        <SuppliersTable />
        <SupplierProductsTable />
        <StocksTable />
        <CustomerOrdersTable />
      </div>
    </div>
  );
};

const ProductsTable = () => {
  const columnHelper = createColumnHelper<Product>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: ColumnDef<Product, any>[] = [
    columnHelper.accessor("id", {
      header: "Id",
    }),
    columnHelper.accessor("name", {
      header: "Name",
      cell: StatefulTableCell,
    }),
    columnHelper.accessor("brand", {
      header: "Brand",
      cell: StatefulTableCell,
    }),
    columnHelper.accessor("description", {
      header: "Description",
      cell: StatefulTableCell,
    }),
    columnHelper.accessor("size", {
      header: "Size",
      cell: StatefulTableCell,
    }),
    columnHelper.accessor("weight", {
      header: "Weight",
      cell: StatefulTableCell,
    }),
    columnHelper.accessor("currentPrice", {
      header: "Current Price",
      cell: StatefulTableCell,
    }),
    columnHelper.accessor("imageUrl", {
      header: "Image Url",
      cell: StatefulTableCell,
    }),
    columnHelper.accessor("categoryId", {
      header: "Category Id",
      cell: StatefulTableCell,
    }),
    columnHelper.accessor("productType", {
      header: "Product Type",
      cell: StatefulTableCell,
    }),
  ];

  const { data, isSuccess } = useStaffProducts();

  return (
    <div className="flex flex-col items-start gap-4 w-full overflow-x-scroll">
      <h1 className="font-black">Products Table</h1>
      {isSuccess && (
        <DynamicDataTable
          data={data || []}
          columns={columns}
          columnHelper={columnHelper}
          handleSave={(object) => console.log("save", object)}
          handleDelete={(id) => console.log("delete", id)}
        />
      )}
    </div>
  );
};

const WarehousesTable = () => {
  const columnHelper = createColumnHelper<Warehouse>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: ColumnDef<Warehouse, any>[] = [
    columnHelper.accessor("id", {
      header: "Id",
    }),
    columnHelper.accessor("warehouseName", {
      header: "Name",
      cell: StatefulTableCell,
    }),
    columnHelper.accessor("addressId", {
      header: "Address Id",
      cell: StatefulTableCell,
    }),
    columnHelper.accessor("capacity", {
      header: "Capacity",
      cell: StatefulTableCell,
    }),
  ];

  const { data, isSuccess } = useWarehouses();

  return (
    <div className="flex flex-col items-start gap-4 w-full overflow-x-scroll">
      <h1 className="font-black">Warehouses Table</h1>
      {isSuccess && (
        <DynamicDataTable
          data={data || []}
          columns={columns}
          columnHelper={columnHelper}
          handleSave={(object) => console.log("save", object)}
          handleDelete={(id) => console.log("delete", id)}
        />
      )}
    </div>
  );
};

const SuppliersTable = () => {
  const columnHelper = createColumnHelper<Supplier>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: ColumnDef<Supplier, any>[] = [
    columnHelper.accessor("id", {
      header: "Id",
    }),
    columnHelper.accessor("supplierName", {
      header: "Name",
      cell: StatefulTableCell,
    }),
    columnHelper.accessor("addressId", {
      header: "Address",
      cell: StatefulTableCell,
    }),
    columnHelper.accessor("contactName", {
      header: "Contact Name",
      cell: StatefulTableCell,
    }),
    columnHelper.accessor("contactEmail", {
      header: "Contact Email",
      cell: StatefulTableCell,
    }),
    columnHelper.accessor("contactPhone", {
      header: "Contact Phone",
      cell: StatefulTableCell,
    }),
  ];

  const { data, isSuccess } = useSuppliers();

  return (
    <div className="flex flex-col items-start gap-4 w-full overflow-x-scroll">
      <h1 className="font-black">Suppliers Table</h1>
      {isSuccess && (
        <DynamicDataTable
          data={data || []}
          columns={columns}
          columnHelper={columnHelper}
          handleSave={(object) => console.log("save", object)}
          handleDelete={(id) => console.log("delete", id)}
        />
      )}
    </div>
  );
};

const SupplierProductsTable = () => {
  const columnHelper = createColumnHelper<SupplierProduct>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: ColumnDef<SupplierProduct, any>[] = [
    columnHelper.accessor("id", {
      header: "Id",
    }),
    columnHelper.accessor("supplierId", {
      header: "Supplier Id",
      cell: StatefulTableCell,
    }),
    columnHelper.accessor("productId", {
      header: "Product Id",
      cell: StatefulTableCell,
    }),
    columnHelper.accessor("price", {
      header: "Price",
      cell: StatefulTableCell,
    }),
    columnHelper.accessor("minimumOrderQuantity", {
      header: "Minimum Order Quantity",
      cell: StatefulTableCell,
    }),
    columnHelper.accessor("leadTimeDays", {
      header: "Lead Time Days",
      cell: StatefulTableCell,
    }),
  ];

  const { data, isSuccess } = useSupplierProducts();

  return (
    <div className="flex flex-col items-start gap-4 w-full overflow-x-scroll">
      <h1 className="font-black">Supplier Products Table</h1>
      {isSuccess && (
        <DynamicDataTable
          data={data || []}
          columns={columns}
          columnHelper={columnHelper}
          handleSave={(object) => console.log("save", object)}
          handleDelete={(id) => console.log("delete", id)}
        />
      )}
    </div>
  );
};

const StocksTable = () => {
  const columnHelper = createColumnHelper<Stock>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: ColumnDef<Stock, any>[] = [
    columnHelper.accessor("id", {
      header: "Id",
    }),
    columnHelper.accessor("productId", {
      header: "Product Id",
      cell: StatefulTableCell,
    }),
    columnHelper.accessor("warehouseId", {
      header: "Warehouse Id",
      cell: StatefulTableCell,
    }),
    columnHelper.accessor("quantity", {
      header: "Quantity",
      cell: StatefulTableCell,
    }),
    columnHelper.accessor("unitSize", {
      header: "Unit Size",
      cell: StatefulTableCell,
    }),
  ];

  const { data, isSuccess } = useStocks();

  return (
    <div className="flex flex-col items-start gap-4 w-full overflow-x-scroll">
      <h1 className="font-black">Stocks Table</h1>
      {isSuccess && (
        <DynamicDataTable
          data={data || []}
          columns={columns}
          columnHelper={columnHelper}
          handleSave={(object) => console.log("save", object)}
          handleDelete={(id) => console.log("delete", id)}
        />
      )}
    </div>
  );
};

const CustomerOrdersTable = () => {
  const columnHelper = createColumnHelper<CustomerOrder>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: ColumnDef<CustomerOrder, any>[] = [
    columnHelper.accessor("id", {
      header: "Id",
    }),
    columnHelper.accessor("customerId", {
      header: "Customer Id",
      cell: StatefulTableCell,
    }),
    columnHelper.accessor("orderDate", {
      header: "Order Date",
      cell: StatefulTableCell,
    }),
    columnHelper.accessor("orderStatus", {
      header: "Order Status",
      cell: StatefulTableCell,
    }),
    columnHelper.accessor("creditCardId", {
      header: "Credit Card Id",
      cell: StatefulTableCell,
    }),
    columnHelper.accessor("totalAmount", {
      header: "Total Amount",
      cell: StatefulTableCell,
    }),
  ];

  const { data, isSuccess } = useStaffCustomerOrders();

  return (
    <div className="flex flex-col items-start gap-4 w-full overflow-x-scroll">
      <h1 className="font-black">Customer Orders Table</h1>
      {isSuccess && (
        <DynamicDataTable
          data={data || []}
          columns={columns}
          columnHelper={columnHelper}
          handleSave={(object) => console.log("save", object)}
          handleDelete={(id) => console.log("delete", id)}
        />
      )}
    </div>
  );
};

export default StaffLogisticsPage;
