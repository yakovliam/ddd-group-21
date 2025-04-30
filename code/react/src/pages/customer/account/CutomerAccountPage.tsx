import Button from "@/components/ui/Button";
import useEasyAuth from "@/hooks/use-easy-auth";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const columns = [
  {
    header: "Email",
    accessorKey: "profile.email",
  },
  {
    header: "First Name",
    accessorKey: "profile.given_name",
  },
  {
    header: "Last Name",
    accessorKey: "profile.family_name",
  },
  {
    header: "Username",
    accessorKey: "profile.preferred_username",
  },
  {
    header: "Subject",
    accessorKey: "profile.sub",
  },
];

const CutomerAccountPage = () => {
  const { user } = useEasyAuth();

  const table = useReactTable({
    data: user ? [user] : [],
    columns, // Column definitions
    getCoreRowModel: getCoreRowModel(), // Method to compute rows based on core data
  });

  const goToAccountManagmentPage = () => {
    const url = import.meta.env.VITE_AUTHORITY + "/account";
    window.location.replace(url);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1>Customer Account Page</h1>
      <Button onClick={goToAccountManagmentPage}>Edit Account</Button>
      <div className="w-full flex items-center">
        <table>
          <thead>
            {/* Render table headers */}
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th colSpan={header.colSpan} key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {/* Render table rows */}
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default CutomerAccountPage;
