import ProductCard from "@/components/composite/ProductCard";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useProducts } from "@/hooks/use-api";
import { Product } from "@/types/product";
import { useState } from "react";
import { useNavigate } from "react-router";

const CustomerProductsPage = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [name, setName] = useState("");

  const { data, isSuccess, refetch } = useProducts({
    page,
    limit,
    name,
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

          <Button
            onClick={() => {
              refetch();
            }}
          >
            Search
          </Button>
        </div>
        <div className="col-span-3">
          {isSuccess && (
            <div className="grid grid-cols-4 gap-4">
              {data?.content.map((product: Product) => {
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

export default CustomerProductsPage;
