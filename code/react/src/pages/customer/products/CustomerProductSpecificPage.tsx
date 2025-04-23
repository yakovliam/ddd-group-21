import { useProductSpecific } from "@/api/api";
import Button from "@/components/ui/Button";
import { useCartStore } from "@/store/store";
import { Product } from "@/types/product";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useParams } from "react-router";
import { v4 as uuidv4 } from "uuid";

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
  const addToCart = useCartStore((state) => state.addToCart);
  const { id } = useParams();

  const { isSuccess, data: product } = useProductSpecific(id as string);

  const table = useReactTable({
    data: product ? [product] : [],
    columns, // Column definitions
    getCoreRowModel: getCoreRowModel(), // Method to compute rows based on core data
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <h1>Customer Product Page</h1>

      <Button
        onClick={() => {
          if (!product) {
            alert("Product not found");
            return;
          }

          addToCart({
            id: uuidv4(),
            productId: String(product.id),
            name: product.name,
            price: product.currentPrice,
            quantity: 1,
          });

          alert("Product added to cart");
        }}
      >
        Add To Cart
      </Button>

      <div className="w-full grid grid-cols-4 gap-4">
        <div className="flex flex-col items-center gap-4 col-span-1">
          <p>Product Id: {id}</p>
        </div>
        <div className="col-span-3">
          {isSuccess && (
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
