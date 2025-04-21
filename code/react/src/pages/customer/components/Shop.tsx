import React from "react";
import Product from "./Product";

type Props = {
  hidden?: boolean;
};
const Shop = (props: Props) => {
  const arr = [
    {
      key: 1,
      name: "Banana",
      price: 10,
      img: "https://nutritionsource.hsph.harvard.edu/wp-content/uploads/2018/08/bananas-1354785_1920.jpg",
    },
    {
      key: 2,
      name: "Product 2",
      price: 20,
      img: "https://via.placeholder.com/150",
    },
    {
      key: 3,
      name: "Product 3",
      price: 30,
      img: "https://via.placeholder.com/150",
    },
    {
      key: 4,
      name: "Product 4",
      price: 40,
      img: "https://via.placeholder.com/150",
    },
  ];
  return (
    <div
      className={`${
        props.hidden
          ? "hidden"
          : " w-full justify-center items-center grid grid-cols-4 gap-4"
      }`}
    >
      {arr.map((item) => (
        <Product {...item} />
      ))}
    </div>
  );
};

export default Shop;
