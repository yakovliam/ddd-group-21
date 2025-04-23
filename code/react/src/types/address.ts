import { AddressType } from "./addresstype";
import { UserAccount } from "./useraccount";

export type Address = {
  id: number;
  userAccount: UserAccount;
  addressType: AddressType;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
};
