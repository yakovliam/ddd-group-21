import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {
  useCreateProduct,
  useModifyProduct,
  useProducts,
} from "@/hooks/use-api";
import { Product } from "@/types/product";
import { useState } from "react";
import { useNavigate } from "react-router";

const Products = () => {
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    name: "",
    brand: "",
    description: "",
    size: "",
    weight: 0,
    currentPrice: 0,
    imageUrl: "",
    productType: "",
    category: {
      id: 0,
      categoryName: "",
    },
  });
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [name, setName] = useState("");

  const mutation = useCreateProduct(
    (data) => {
      console.log("Product created successfully", data);
    },
    (error) => {
      console.error("Error creating product", error);
    }
  );
  const modifymutation = useModifyProduct(
    (data) => {
      console.log("Product updated successfully", data);
    },
    (error) => {
      console.error("Error updating product", error);
    }
  );
  const { data, isSuccess, refetch } = useProducts({
    page,
    limit,
    name,
  });

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-4">
      <h1> Products Page</h1>

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
      <div className="flex flex-row">
        <div className="m-3">
          <div className="flex justify-center">Create new Product</div>
          <div>be sure to have created a suplier and warehouse before hand</div>
          <div className="flex flex-col items-center gap-4 col-span-1">
            <Input
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              placeholder="name"
            />
            <Input
              type="number"
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  category: { id: Number(e.target.value), categoryName: "" },
                })
              }
              placeholder="category ID"
            />
            <Input
              onChange={(e) =>
                setNewProduct({ ...newProduct, brand: e.target.value })
              }
              placeholder="brand"
            />
            <Input
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              placeholder="description"
            />
            <Input
              onChange={(e) =>
                setNewProduct({ ...newProduct, size: e.target.value })
              }
              placeholder="size"
            />
            <Input
              type="number"
              onChange={(e) =>
                setNewProduct({ ...newProduct, weight: Number(e.target.value) })
              }
              placeholder="weight"
            />
            <Input
              type="number"
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  currentPrice: Number(e.target.value),
                })
              }
              placeholder="current price"
            />
            <Input
              onChange={(e) =>
                setNewProduct({ ...newProduct, imageUrl: e.target.value })
              }
              placeholder="image URL"
            />
            <Input
              onChange={(e) =>
                setNewProduct({ ...newProduct, productType: e.target.value })
              }
              placeholder="product type"
            />
            <Input
              onChange={(e) =>
                setNewProduct({ ...newProduct, productType: e.target.value })
              }
              placeholder="warehouse ID"
            />
            <Input
              onChange={(e) =>
                setNewProduct({ ...newProduct, productType: e.target.value })
              }
              placeholder="supplier ID"
            />
            <Input
              onChange={(e) =>
                setNewProduct({ ...newProduct, productType: e.target.value })
              }
              placeholder="stock"
            />
            <Input
              onChange={(e) =>
                setNewProduct({ ...newProduct, productType: e.target.value })
              }
              placeholder="unit size"
            />
            <Button
              onClick={() => {
                console.log("Creating new product", newProduct);
                mutation.mutate(newProduct);
              }}
            >
              Create NewProduct
            </Button>
          </div>
        </div>
        {/* update product information*/}
        <div className="m-3">
          <div>Update product</div>
          <div className="flex flex-col items-center gap-4 col-span-1">
            <Input
              onChange={(e) =>
                setNewProduct({ ...newProduct, id: Number(e.target.value) })
              }
              placeholder="id"
            />
            <Input
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              placeholder="name"
            />
            <Input
              type="number"
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  category: { id: Number(e.target.value), categoryName: "" },
                })
              }
              placeholder="category ID"
            />
            <Input
              onChange={(e) =>
                setNewProduct({ ...newProduct, brand: e.target.value })
              }
              placeholder="brand"
            />
            <Input
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              placeholder="description"
            />
            <Input
              onChange={(e) =>
                setNewProduct({ ...newProduct, size: e.target.value })
              }
              placeholder="size"
            />
            <Input
              type="number"
              onChange={(e) =>
                setNewProduct({ ...newProduct, weight: Number(e.target.value) })
              }
              placeholder="weight"
            />
            <Input
              type="number"
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  currentPrice: Number(e.target.value),
                })
              }
              placeholder="current price"
            />
            <Input
              onChange={(e) =>
                setNewProduct({ ...newProduct, imageUrl: e.target.value })
              }
              placeholder="image URL"
            />
            <Input
              onChange={(e) =>
                setNewProduct({ ...newProduct, productType: e.target.value })
              }
              placeholder="product type"
            />
            <Input
              onChange={(e) =>
                setNewProduct({ ...newProduct, productType: e.target.value })
              }
              placeholder="warehouse ID"
            />
            <Input
              onChange={(e) =>
                setNewProduct({ ...newProduct, productType: e.target.value })
              }
              placeholder="supplier ID"
            />
            <Input
              onChange={(e) =>
                setNewProduct({ ...newProduct, productType: e.target.value })
              }
              placeholder="stock"
            />
            <Button
              onClick={() => {
                console.log("Creating new product", newProduct);
                modifymutation.mutate(newProduct);
              }}
            >
              Update Product
            </Button>
          </div>
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
        <p>{product.id}</p>
      </div>
    </div>
  );
};

export default Products;
