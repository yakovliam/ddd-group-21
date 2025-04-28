import { Address } from "@/types/address";

const AddressCard = ({
  address,
  _delete,
  setDefault,
}: {
  address: Address;
  _delete: () => void;
  setDefault: () => void;
}) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="p-5">
        <h5
          className="mb-2 text-2xl font-bold tracking-tight text-blue-500 underline dark:text-white cursor-pointer"
          onClick={() => {
            _delete();
          }}
        >
          Delete Address
        </h5>
        <h5
          className="mb-2 text-2xl font-bold tracking-tight text-blue-500 underline dark:text-white cursor-pointer"
          onClick={() => {
            setDefault();
          }}
        >
          Set Default
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Street Address: {address.streetAddress}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          City: {address.city}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          State: {address.state}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Country: {address.country}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Postal Code: {address.postalCode}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Address Type: {address.addressType}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Is Default: {address.default ? "Yes" : "No"}
        </p>
      </div>
    </div>
  );
};

export default AddressCard;
