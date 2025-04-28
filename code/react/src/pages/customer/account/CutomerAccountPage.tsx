import AddressCard from "@/components/composite/AddressCard";
import CreditCardCard from "@/components/composite/CreditCardCard";
import Button from "@/components/ui/Button";
import ToastProvider from "@/components/ui/ToastProvider";
import {
  useAddresses,
  useCreditCards,
  useDeleteAddress,
  useDeleteCreditCard,
  useSetAddressDefault,
  useSetCreditCardDefault,
} from "@/hooks/use-api";
import useEasyAuth from "@/hooks/use-easy-auth";
import useToast from "@/hooks/use-toast";
import { Address } from "@/types/address";
import { CreditCard } from "@/types/creditcard";
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
  const { openToast, providerState } = useToast();

  const { data: creditCards, isSuccess: isCreditCardsSuccess } =
    useCreditCards();
  const deleteCreditCardMutation = useDeleteCreditCard(
    () => {
      openToast("Success", "Credit card deleted successfully");
    },
    (message) => {
      openToast("Error", "Failed to delete credit card: " + message);
    }
  );

  const setCreditCardDefaultMutation = useSetCreditCardDefault(
    () => {
      openToast("Success", "Credit card set as default successfully");
    },
    (message) => {
      openToast("Error", "Failed to set credit card as default: " + message);
    }
  );

  const { data: addresses, isSuccess: isAddressesSuccess } = useAddresses();
  const deleteAddressMutation = useDeleteAddress(
    () => {
      openToast("Success", "Address deleted successfully");
    },
    (message) => {
      openToast("Error", "Failed to delete address: " + message);
    }
  );
  const setAddressDefaultMutation = useSetAddressDefault(
    () => {
      openToast("Success", "Address set as default successfully");
    },
    (message) => {
      openToast("Error", "Failed to set address as default: " + message);
    }
  );

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
      <ToastProvider state={providerState} />
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
      <h1>Credit Cards</h1>
      <div className="w-full grid grid-cols-4 gap-4">
        <div className="col-span-3">
          {isCreditCardsSuccess && (
            <div className="grid grid-cols-4 gap-4">
              {creditCards?.map((card: CreditCard) => {
                return (
                  <CreditCardCard
                    key={card.id}
                    creditCard={card}
                    _delete={() => deleteCreditCardMutation.mutate(card.id)}
                    setDefault={() =>
                      setCreditCardDefaultMutation.mutate(card.id)
                    }
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
      <h1>Addresses</h1>
      <div className="w-full grid grid-cols-4 gap-4">
        <div className="col-span-3">
          {isAddressesSuccess && (
            <div className="grid grid-cols-4 gap-4">
              {addresses?.map((address: Address) => {
                return (
                  <AddressCard
                    key={address.id}
                    address={address}
                    _delete={() => deleteAddressMutation.mutate(address.id)}
                    setDefault={() =>
                      setAddressDefaultMutation.mutate(address.id)
                    }
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default CutomerAccountPage;
