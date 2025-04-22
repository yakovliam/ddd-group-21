//'query.data' is of type 'unknown'.ts(18046)

/* eslint-disable @typescript-eslint/no-explicit-any */

import LoadingText from "@/components/loading/LoadingText";
import Input from "@/components/ui/Input";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const CustomerProductsPage = () => {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);

  const query = useQuery<any>({
    queryKey: ["/products", offset, limit],
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <h1>Customer Products Page</h1>

      {query.isLoading && <LoadingText />}

      <Input placeholder="Search" />

      <div className="flex items-center gap-4">
        <Input
          placeholder="Limit"
          onChange={(e) => {
            setLimit(Number(e.target.value));
          }}
        />

        <Input
          placeholder="Offset"
          onChange={(e) => setOffset(Number(e.target.value))}
        />
      </div>

      {query.isSuccess && (
        <div className="grid grid-cols-4 gap-4">
          {query.data.content.map((product: any) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
      )}
    </div>
  );
};

type Product = {
  name: string;
  brand: string;
  description: string;
  size: string;
  weight: number;
  currentPrice: number;
  imageUrl: string;
};

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img src={product.imageUrl + "?random=" + product.weight} alt="" />
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
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
