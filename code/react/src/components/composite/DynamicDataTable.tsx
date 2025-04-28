import {
  ColumnDef,
  ColumnHelper,
  flexRender,
  getCoreRowModel,
  RowData,
  useReactTable,
} from "@tanstack/react-table";
import Button from "../ui/Button";
import { useEffect, useState } from "react";

type ObjectWithId = RowData & { id: number };

type DynamicDataTableProps<TData extends ObjectWithId> = {
  columns: ColumnDef<TData>[];
  columnHelper: ColumnHelper<TData>;
  data: TData[];
  handleSave: (row: TData) => void;
  handleDelete: (id: number) => void;
};

const DynamicDataTable = <TData extends ObjectWithId>({
  columns,
  columnHelper,
  data,
  handleSave,
  handleDelete,
}: DynamicDataTableProps<TData>) => {
  const [localData, setData] = useState<TData[]>([]);

  useEffect(() => {
    if (!data) return;
    setData(data);
  }, [data]);

  const saveAction = (id: number) => {
    const row = localData.find((r) => r.id === id);
    if (!row) return;
    handleSave(row);
  };

  const columnsWithAction = [
    ...columns,
    columnHelper.display({
      id: "action",
      header: "Action",
      cell: (info) => (
        <Button onClick={() => saveAction(info.row.original.id)}>Save</Button>
      ),
    }),
    columnHelper.display({
      id: "delete",
      header: "Delete",
      cell: (info) => (
        <Button onClick={() => handleDelete(info.row.original.id)}>
          Delete
        </Button>
      ),
    }),
  ];

  const table = useReactTable({
    data: data,
    columns: columnsWithAction,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex: number, columnId: string, value: string) => {
        setData((old: TData[]) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
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
      <tfoot>
        {table.getFooterGroups().map((footerGroup) => (
          <tr key={footerGroup.id}>
            {footerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.footer,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  );
};

export default DynamicDataTable;
