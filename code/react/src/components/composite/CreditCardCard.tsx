import { CreditCard } from "@/types/creditcard";

const CreditCardCard = ({
  creditCard,
  _delete,
  setDefault,
}: {
  creditCard: CreditCard;
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
          Delete Card
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
          Card Number: {creditCard.cardNumber}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Expiration Date: {creditCard.expirationDate}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          CVV: {creditCard.cvv}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Is Default: {creditCard.isDefault}
        </p>
      </div>
    </div>
  );
};

export default CreditCardCard;
