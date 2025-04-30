import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useCreateAddress } from "@/hooks/use-api";
import { Address } from "@/types/address";
import { AddressType } from "@/types/addresstype";
import { useState } from "react";
import { useNavigate } from "react-router";

const CustomerAddressesNewPage = () => {
  const navigate = useNavigate();

  const mutation = useCreateAddress(
    () => {
      navigate("/customer/addresses");
    },
    (message) => {
      alert(message);
    }
  );

  const [addressType, setAddressType] = useState<AddressType | null>(null);
  const [streetAddress, setStreetAddress] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [state, setState] = useState<string | null>(null);
  const [postalCode, setPostalCode] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);
  const [isDefault, setIsDefault] = useState<string | null>(null);

  const createAddress = () => {
    if (
      addressType === null ||
      streetAddress === null ||
      city === null ||
      state === null ||
      postalCode === null ||
      country === null ||
      isDefault === null
    ) {
      alert("Please fill out all fields.");
      return;
    }

    const newAddress: Address = {
      id: -1,
      userAccountId: "",
      addressType,
      streetAddress,
      city,
      state,
      postalCode,
      country,
      isDefault: (isDefault === "true" && true) || false,
    };

    mutation.mutate(newAddress);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1>Customer Addresses New Page</h1>

      <Input
        onChange={(e) => setAddressType(e.target.value as AddressType)}
        placeholder="Address Type"
      />

      <Input
        onChange={(e) => setStreetAddress(e.target.value)}
        placeholder="Street Address"
      />

      <Input onChange={(e) => setCity(e.target.value)} placeholder="City" />

      <Input onChange={(e) => setState(e.target.value)} placeholder="State" />

      <Input
        onChange={(e) => setPostalCode(e.target.value)}
        placeholder="Postal Code"
      />

      <Input
        onChange={(e) => setCountry(e.target.value)}
        placeholder="Country"
      />

      <Input
        onChange={(e) => setIsDefault(e.target.value)}
        placeholder="Is Default"
      />

      <Button onClick={createAddress}>Create Address</Button>
    </div>
  );
};

export default CustomerAddressesNewPage;
