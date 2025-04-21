import React from "react";

type Props = {
  placeholder: string;
  type?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = (props: Props) => {
  return (
    <input
      className="border border-black font-bold px-2"
      type="text"
      {...props}
    />
  );
};

export default Input;
