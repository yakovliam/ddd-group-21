import { OrderStatus } from "./orderstatus";

export interface CustomerOrder {
  id: number;
  customerId: number;
  orderDate: string;
  orderStatus: OrderStatus;
  creditCardId: number;
  totalAmount: number;
}

export interface CustomerOrderPage {
  content: CustomerOrder[];
}
