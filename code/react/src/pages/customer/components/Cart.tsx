import React from "react";

type Props = { hidden?: boolean };

const Cart = (props: Props) => {
  return <div className={`${props.hidden ? "hidden" : ""}`}>Cart</div>;
};

export default Cart;
