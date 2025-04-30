import CreditCardCard from "@/components/composite/CreditCardCard";
import Button from "@/components/ui/Button";
import ToastProvider from "@/components/ui/ToastProvider";
import {
  useCreditCards,
  useDeleteCreditCard,
  useSetCreditCardDefault,
} from "@/hooks/use-api";
import useToast from "@/hooks/use-toast";
import { CreditCard } from "@/types/creditcard";
import { useNavigate } from "react-router";

const CustomerCreditCardsPage = () => {
  const navigate = useNavigate();
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

  return (
    <div>
      <ToastProvider state={providerState} />
      <h1>Credit Cards</h1>
      <Button onClick={() => navigate("/customer/creditcards/new")}>New</Button>
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
    </div>
  );
};

export default CustomerCreditCardsPage;
