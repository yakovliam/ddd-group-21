import Button from "@/components/ui/Button";
import { useDeleteProduct } from "@/hooks/use-api";
import useToast from "@/hooks/use-toast";
import { useNavigate, useParams } from "react-router";

const StaffProductDeletePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { openToast, toastProvider } = useToast();

  const mutation = useDeleteProduct(
    () => {
      openToast("Success", "Product deleted successfully");

      setTimeout(() => {
        navigate("/staff/products");
      }, 1000);
    },
    (message: string) => {
      openToast("Error", "Failed to delete product: " + message);

      setTimeout(() => {
        navigate("/staff/products");
      }, 1000);
    }
  );

  if (!id) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {toastProvider}
      <h1>Product Delete Page</h1>
      <p>Product ID: {id}</p>
      <h3>Are you sure you want to delete this product?</h3>
      <Button onClick={() => mutation.mutate(Number(id))}>Yes</Button>
      <Button onClick={() => navigate(`/staff/products`)}>No</Button>
    </div>
  );
};

export default StaffProductDeletePage;
