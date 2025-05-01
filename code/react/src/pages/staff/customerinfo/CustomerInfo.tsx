import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import StatefulTableCell from "@/components/composite/StatefulTableCell";
import DynamicDataTable from "@/components/composite/DynamicDataTable";
import {
  useDeleteStaffCustomer,
  useSetCustomerDefault,
  useStaffCustomers,
} from "@/hooks/use-api";
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
  const deleteMutation = useDeleteStaffCustomer(
    () => {
      console.log("Delete successful");
      // Optionally refetch customers here
    },
    (errorMessage) => {
      console.error("Delete failed:", errorMessage);
    }
  );
  const setMutation = useSetCustomerDefault(
    () => {
      console.log("Set default successful");
      // Optionally refetch customers here
    },
    (errorMessage) => {
      console.error("Set default failed:", errorMessage);
    }
  );
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
  if (isSuccess) {
    console.log("data", data);
  }
  return (
    <div className="flex flex-col items-start gap-4 w-full overflow-x-scroll">
      <h1 className="font-black">Customers Table</h1>

      {isSuccess && (
        <DynamicDataTable
          data={data || []}
          columns={columns}
          columnHelper={columnHelper}
          handleSave={(object) => setMutation.mutate(object)}
          handleDelete={(id) => deleteMutation.mutate(id)}
        />
      )}
    </div>
  );
};
export default CustomerInfo;
