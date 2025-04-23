import Input from "@/components/ui/Input";
import { Product, ProductPage } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";

const CustomerProductsPage = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [name, setName] = useState("");

  const query = useQuery<ProductPage>({
    queryKey: ["/products", page, limit, name],
  });

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-4">
      <h1>Customer Products Page</h1>

      <div className="w-full grid grid-cols-4 gap-4">
        <div className="flex flex-col items-center gap-4 col-span-1">
          <Input
            onChange={(e) => setName(e.target.value)}
            placeholder="Search By Name"
          />

          <Input
            placeholder="Limit"
            onChange={(e) => {
              setLimit(Number(e.target.value));
            }}
          />

          <Input
            placeholder="Page"
            onChange={(e) => setPage(Number(e.target.value))}
          />
        </div>
        <div className="col-span-3">
          {query.isSuccess && (
            <div className="grid grid-cols-4 gap-4">
              {query.data.content.map((product: Product) => {
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    navigate={navigate}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({
  product,
  navigate,
}: {
  product: Product;
  navigate: (path: string) => void;
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
          {product.name}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {product.description}
        </p>
      </div>
    </div>
  );
};

export default CustomerProductsPage;
