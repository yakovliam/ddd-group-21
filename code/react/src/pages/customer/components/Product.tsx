import Button from "@/components/ui/Button";

type Props = {
  key: number;
  name: string;
  price: number;
  img: string;
};

const Product = (props: Props) => {
  return (
    <div
      key={props.key}
      className=" bg-gray-200 m-2 rounded-lg shadow-lg flex justify-center max-h-[400px]"
    >
      <div className=" bg-white rounded-lg shadow-md flex justify-center items-center flex-col p-3">
        <img
          src={props.img}
          alt={props.name}
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="w-full ">
          <h2 className="text-lg font-bold">{props.name}</h2>
          <p className="text-gray-600">${props.price}</p>
          <Button>Add to Cart</Button>
        </div>
      </div>
    </div>
  );
};

export default Product;
