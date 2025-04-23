import { CreditCard } from "./creditcard";
import { Customer } from "./customer";
import { OrderStatus } from "./orderstatus";

export interface CustomerOrder {
  id: number;
  customer: Customer;
  orderDate: string;
  orderStatus: OrderStatus;
  creditCard: CreditCard;
  totalAmount: number;
}

export interface CustomerOrderPage {
  content: CustomerOrder[];
}
