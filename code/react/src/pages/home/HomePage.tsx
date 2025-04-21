import Button from "@/components/ui/Button";
import { useNavigate } from "react-router";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Home Page</h1>
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
  );
};

export default HomePage;
