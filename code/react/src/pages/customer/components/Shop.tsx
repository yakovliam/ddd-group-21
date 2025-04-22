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
      name: "Apple",
      price: 20,
      img: "https://cdn.britannica.com/22/187222-050-07B17FB6/apples-on-a-tree-branch.jpg",
    },
    {
      key: 3,
      name: "Grapes",
      price: 30,
      img: "https://img.imageboss.me/fourwinds/width/425/dpr:2/shop/products/rubyseedlessgrapes.jpg?v=1729716408",
    },
    {
      key: 4,
      name: "Pineapple",
      price: 40,
      img: "https://images.immediate.co.uk/production/volatile/sites/30/2024/06/Pineapple-01-5562ee3.jpg?quality=90&resize=440,400",
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
