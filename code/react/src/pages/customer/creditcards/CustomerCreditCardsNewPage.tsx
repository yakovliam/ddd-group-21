import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useCreateCreditCard, useCustomer } from "@/hooks/use-api";
import { CreateCreditCard as CreditCard } from "@/types/creditcard";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";

const CustomerCreditCardsNewPage = () => {
  const navigate = useNavigate();
  const { data: customer } = useCustomer();
  const customerId = useMemo(() => customer?.id, [customer]);

  const mutation = useCreateCreditCard(
    () => {
      navigate("/customer/creditcards");
    },
    (message) => {
      alert(message);
    }
  );

  const [cardNumber, setCardNumber] = useState<string | null>(null);
  const [cardholderName, setCardholderName] = useState<string | null>(null);
  const [expirationDate, setExpirationDate] = useState<string | null>(null);
  const [cvv, setCvv] = useState<string | null>(null);
  const [paymentAddressId, setPaymentAddressId] = useState<number | null>(null);
  const [isDefault, setIsDefault] = useState<string | null>(null);

  const createCreditCard = () => {
    if (!customerId) {
      alert("No customer id found.");
      return;
    }

    console.log(cardholderName);
    console.log(cardNumber);
    console.log(expirationDate);
    console.log(cvv);
    console.log(paymentAddressId);
    console.log(isDefault);

    if (
      cardNumber === null ||
      cardholderName === null ||
      expirationDate === null ||
      cvv === null ||
      paymentAddressId === null ||
      isDefault === null
    ) {
      alert("Please fill out all fields.");
      return;
    }

    const newCreditCard: CreditCard = {
      id: -1,
      customerId,
      cardNumber,
      cardholderName,
      expirationDate,
      cvv,
      paymentAddressId,
      isDefault: (isDefault === "true" && true) || false,
    };

    mutation.mutate(newCreditCard);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1>Customer Credit Cards New Page</h1>

      <Input
        onChange={(e) => setCardNumber(e.target.value)}
        placeholder="Card Number"
      />

      <Input
        onChange={(e) => setCardholderName(e.target.value)}
        placeholder="Cardholder Name"
      />

      <Input
        onChange={(e) => setExpirationDate(e.target.value)}
        placeholder="Expiration Date"
      />

      <Input onChange={(e) => setCvv(e.target.value)} placeholder="CVV" />

      <Input
        onChange={(e) => setPaymentAddressId(Number(e.target.value))}
        placeholder="Payment Address Id"
      />

      <Input
        onChange={(e) => setIsDefault(e.target.value)}
        placeholder="Is Default"
      />

      <Button onClick={createCreditCard}>Create Credit Card</Button>
    </div>
  );
};

export default CustomerCreditCardsNewPage;
