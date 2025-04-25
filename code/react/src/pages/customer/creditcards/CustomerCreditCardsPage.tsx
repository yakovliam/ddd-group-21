import { useCreditCards } from "@/hooks/use-api";
import { CreditCard } from "@/types/creditcard";

const CustomerCreditCardsPage = () => {
  const { data, isSuccess } = useCreditCards();

  const deleteCard = (id: number) => {};

  const setDefault = (id: number) => {};

  return (
    <div className="flex flex-col items-center gap-4">
      <h1>Customer Credit Cards Page</h1>

      <div className="w-full grid grid-cols-4 gap-4">
        <div className="col-span-3">
          {isSuccess && (
            <div className="grid grid-cols-4 gap-4">
              {data?.map((card: CreditCard) => {
                return (
                  <CreditCardCard
                    key={card.id}
                    creditCard={card}
                    deleteCard={() => deleteCard(card.id)}
                    setDefault={() => setDefault(card.id)}
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

const CreditCardCard = ({
  creditCard,
  deleteCard,
  setDefault,
}: {
  creditCard: CreditCard;
  deleteCard: () => void;
  setDefault: () => void;
}) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="p-5">
        <h5
          className="mb-2 text-2xl font-bold tracking-tight text-blue-500 underline dark:text-white cursor-pointer"
          onClick={() => {
            deleteCard();
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
          {creditCard.cardNumber}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {creditCard.expirationDate}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {creditCard.cvv}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {creditCard.isDefault}
        </p>
      </div>
    </div>
  );
};

export default CustomerCreditCardsPage;
