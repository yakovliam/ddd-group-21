import { Product } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useParams } from "react-router";

const columnHelper = createColumnHelper<Product>();

const columns = [
  columnHelper.accessor("id", {
    header: "Id",
  }),
  columnHelper.accessor("name", {
    header: "Name",
  }),
  columnHelper.accessor("brand", {
    header: "Brand",
  }),
  columnHelper.accessor("description", {
    header: "Description",
  }),
  columnHelper.accessor("size", {
    header: "Size",
  }),
  columnHelper.accessor("weight", {
    header: "Weight",
  }),
  columnHelper.accessor("currentPrice", {
    header: "Current Price",
  }),
  columnHelper.accessor("imageUrl", {
    header: "Image",
    cell: (info) => (
      <img src={info.getValue() + "?random=" + info.row.original.weight} />
    ),
  }),
  columnHelper.accessor("category", {
    header: "Category",
    cell: (info) => info.getValue().categoryName,
  }),
];

function CustomerProductSpecificPage() {
  const { id } = useParams();

  const query = useQuery<Product>({
    queryKey: [`/products/${id}`],
  });

  const table = useReactTable({
    data: query.data ? [query.data] : [],
    columns, // Column definitions
    getCoreRowModel: getCoreRowModel(), // Method to compute rows based on core data
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <h1>Customer Product Page</h1>

      <div className="w-full grid grid-cols-4 gap-4">
        <div className="flex flex-col items-center gap-4 col-span-1">
          <p>Product Id: {id}</p>
        </div>
        <div className="col-span-3">
          {query.isSuccess && (
            <table>
              <thead>
                {/* Render table headers */}
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th colSpan={header.colSpan} key={header.id}>
                        {/* Render header content or leave blank if it's a placeholder */}
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header, // Header definition
                              header.getContext() // Context for the header
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
                        {/* Render each cell's content */}
                        {flexRender(
                          cell.column.columnDef.cell, // Cell definition
                          cell.getContext() // Context for the cell
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomerProductSpecificPage;
