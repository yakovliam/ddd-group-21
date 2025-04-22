import Button from "@/components/ui/Button";
import { useNavigate } from "react-router";

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold text-red-500">Unauthorized</h1>
      <Button
        onClick={() => {
          navigate("/");
        }}
      >
        Go Home
      </Button>
    </div>
  );
};

export default UnauthorizedPage;
