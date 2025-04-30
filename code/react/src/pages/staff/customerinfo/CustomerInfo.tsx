import React from "react";

import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Product } from "@/types/product";
import StatefulTableCell from "@/components/composite/StatefulTableCell";
import DynamicDataTable from "@/components/composite/DynamicDataTable";
import { useStaffCustomers } from "@/hooks/use-api";
import { Customer } from "@/types/customer";

const CustomerInfo = () => {
  return (
    <div>
      <h1>Customer Info</h1>
      <div className="flex gap-4 flex-col items-start w-full">
        <CustomersTable />
      </div>
    </div>
  );
};

const CustomersTable = () => {
  const columnHelper = createColumnHelper<Customer>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: ColumnDef<Customer, any>[] = [
    columnHelper.accessor("id", {
      header: "Id",
    }),
    columnHelper.accessor("userAccountId", {
      header: "User Account Id",
      cell: StatefulTableCell,
    }),
    columnHelper.accessor("firstName", {
      header: "First Name",
      cell: StatefulTableCell,
    }),
    columnHelper.accessor("lastName", {
      header: "Last Name",
      cell: StatefulTableCell,
    }),
    columnHelper.accessor("accountBalance", {
      header: "Account Balance",
      cell: StatefulTableCell,
    }),
  ];

  const { data, isSuccess } = useStaffCustomers();

  return (
    <div className="flex flex-col items-start gap-4 w-full overflow-x-scroll">
      <h1 className="font-black">Customers Table</h1>
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
export default CustomerInfo;
