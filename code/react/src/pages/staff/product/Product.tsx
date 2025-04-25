import React from "react";

type Props = {
  hide: boolean;
};

const Product = (props: Props) => {
  return <div className={`${props.hide ? "hidden" : ""}`}>Product</div>;
};

export default Product;
