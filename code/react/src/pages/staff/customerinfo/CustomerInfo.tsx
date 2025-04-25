import React from "react";

type Props = {
  hide: boolean;
};

const CustomerInfo = (props: Props) => {
  return <div className={`${props.hide ? "hidden" : ""}`}>CustomerInfo</div>;
};

export default CustomerInfo;
