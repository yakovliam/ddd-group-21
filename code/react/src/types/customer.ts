import { UserAccount } from "./useraccount";

export interface Customer {
  id: number;
  userAccount: UserAccount;
  firstName: string;
  lastName: string;
  accountBalance: number;
}
