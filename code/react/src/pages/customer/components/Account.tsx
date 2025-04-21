import React from "react";

type Props = { hidden?: boolean };

const Account = (props: Props) => {
  return <div className={`${props.hidden ? "hidden" : ""}`}>Account</div>;
};

export default Account;
