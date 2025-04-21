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
        Go To Login
      </Button>
    </div>
  );
};

export default HomePage;
