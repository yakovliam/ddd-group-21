import { Address } from "./address";

export interface CreditCard {
  id: number;
  customer: number;
  cardNumber: string;
  cardholderName: string;
  expirationDate: string;
  cvv: string;
  paymentAddress: Address;
  isDefault: boolean;
}
