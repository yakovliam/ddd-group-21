import Button from "@/components/ui/Button";
import useEasyAuth from "@/hooks/use-easy-auth";
import { useNavigate } from "react-router";

const HomePage = () => {
  const navigate = useNavigate();
  const { authContext } = useEasyAuth();

  return (
    <div className="flex flex-col items-center gap-4">
      <h1>Home Page</h1>

      {authContext.user ? (
        <div className="flex flex-col items-center gap-4">
          <p>You're logged in as {authContext.user?.profile.email}</p>
          <Button
            onClick={() => {
              navigate("/customer/products");
            }}
          >
            Customer Products
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Button
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>
          <Button
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </Button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
