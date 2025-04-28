import { OrderStatus } from "./orderstatus";

export type CustomerOrder = {
  id: number;
  customerId: number;
  orderDate: string;
  orderStatus: OrderStatus;
  creditCardId: number;
  totalAmount: number;
};

export type CustomerOrderPage = {
  content: CustomerOrder[];
};
