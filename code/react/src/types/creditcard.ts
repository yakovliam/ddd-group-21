export interface CreditCard {
  id: number;
  customerId: number;
  cardNumber: string;
  cardholderName: string;
  expirationDate: string;
  cvv: string;
  paymentAddressId: number;
  default: boolean;
}

export interface CreateCreditCard {
  id: number;
  customerId: number;
  cardNumber: string;
  cardholderName: string;
  expirationDate: string;
  cvv: string;
  paymentAddressId: number;
  isDefault: boolean;
}
