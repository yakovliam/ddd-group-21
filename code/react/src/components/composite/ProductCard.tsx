import { Product } from "@/types/product";

const ProductCard = ({
  product,
  navigate,
  showDelete = false,
}: {
  product: Product;
  navigate: (path: string) => void;
  showDelete?: boolean;
}) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img src={product.imageUrl + "?random=" + product.weight} alt="" />
      <div className="p-5">
        <h5
          className="mb-2 text-2xl font-bold tracking-tight text-blue-500 underline dark:text-white cursor-pointer"
          onClick={() => {
            navigate("/customer/products/" + product.id);
          }}
        >
          {product.name} - {product.brand}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {product.description}
        </p>
        {showDelete && (
          <h5
            className="mb-2 text-2xl font-bold tracking-tight text-red-500 underline dark:text-white cursor-pointer"
            onClick={() => {
              navigate("/staff/products/" + product.id + "/delete");
            }}
          >
            Delete
          </h5>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
