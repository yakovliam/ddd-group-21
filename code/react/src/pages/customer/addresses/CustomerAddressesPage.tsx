import AddressCard from "@/components/composite/AddressCard";
import Button from "@/components/ui/Button";
import ToastProvider from "@/components/ui/ToastProvider";
import {
  useAddresses,
  useDeleteAddress,
  useSetAddressDefault,
} from "@/hooks/use-api";
import useToast from "@/hooks/use-toast";
import { Address } from "@/types/address";
import { useNavigate } from "react-router";

const CustomerAddressesPage = () => {
  const navigate = useNavigate();
  const { openToast, providerState } = useToast();

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

  return (
    <div>
      <ToastProvider state={providerState} />
      <h1>Addresses</h1>
      <Button onClick={() => navigate("/customer/addresses/new")}>New</Button>
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

export default CustomerAddressesPage;
