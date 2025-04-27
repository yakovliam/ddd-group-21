export interface CreditCard {
  id: number;
  customer: number;
  cardNumber: string;
  cardholderName: string;
  expirationDate: string;
  cvv: string;
  paymentAddressId: number;
  isDefault: boolean;
}
