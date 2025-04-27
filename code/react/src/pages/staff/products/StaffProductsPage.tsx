import { useCreateProduct, useProducts } from "@/hooks/use-api";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { CreateProduct, Product } from "@/types/product";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import * as Toast from "@radix-ui/react-toast";
import ProductCard from "@/components/composite/ProductCard";

const StaffProductsPage = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [name, setName] = useState("");
  const [product, setProduct] = useState<CreateProduct>({
    name: "",
    brand: "",
    description: "",
    size: "",
    weight: 0,
    currentPrice: 0,
    imageUrl: "",
    categoryId: 0,
    productType: "",
  });
  const { data, isSuccess, refetch } = useProducts({
    page,
    limit,
    name,
  });

  const [toastIsOpen, setToastIsOpen] = useState(false);
  const timerRef = useRef(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const navigate = useNavigate();

  const onEvent = (
    isSuccess: boolean,
    _product?: Product,
    message?: string
  ) => {
    setToastIsOpen(true);
    timerRef.current = window.setTimeout(() => {
      setToastIsOpen(false);
    }, 5000);

    if (isSuccess) {
      refetch();
      setMessage("Product created successfully");
    } else {
      setMessage(message || "Failed to create product");
    }
  };

  const mutation = useCreateProduct(
    (data) => {
      onEvent(true, data, undefined);
    },
    (message) => {
      onEvent(false, undefined, message);
    }
  );

  return (
    <div className="flex flex-col items-center gap-4">
      <h1>Products Page</h1>

      <Toast.Provider swipeDirection="right">
        <Toast.Root
          className="ToastRoot border border-black bg-gray-200"
          open={toastIsOpen}
          onOpenChange={setToastIsOpen}
        >
          <Toast.Title className="ToastTitle">{message && message}</Toast.Title>
        </Toast.Root>
        <Toast.Viewport className="fixed bottom-0 right-0 flex flex-col p-8 gap-3 w-96 max-w-screen m-0 list-none !z-50" />
      </Toast.Provider>

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
                    showDelete
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div>
        <div>Create new Product</div>
        <div className="flex flex-col items-center gap-4 col-span-1">
          <Input
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            placeholder="name"
          />

          <Input
            onChange={(e) => setProduct({ ...product, brand: e.target.value })}
            placeholder="brand"
          />

          <Input
            placeholder="Category id"
            type="number"
            onChange={(e) =>
              setProduct({
                ...product,
                categoryId: Number(e.target.value),
              })
            }
          />

          <Input
            placeholder="description"
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
          />
          <Input
            placeholder="size"
            onChange={(e) => setProduct({ ...product, size: e.target.value })}
          />
          <Input
            placeholder="weight"
            onChange={(e) =>
              setProduct({ ...product, weight: Number(e.target.value) })
            }
          />
          <Input
            placeholder="price"
            onChange={(e) =>
              setProduct({ ...product, currentPrice: Number(e.target.value) })
            }
          />
          <Input
            placeholder="imageUrl"
            onChange={(e) =>
              setProduct({ ...product, imageUrl: e.target.value })
            }
          />
          <Input
            placeholder="product type"
            onChange={(e) =>
              setProduct({ ...product, productType: e.target.value })
            }
          />
          <Button
            onClick={() => {
              mutation.mutate(product);
            }}
          >
            Create Product
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StaffProductsPage;
