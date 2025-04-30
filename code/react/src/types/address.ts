import { AddressType } from "./addresstype";

export type Address = {
  id: number;
  userAccountId: string;
  addressType: AddressType;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
};
