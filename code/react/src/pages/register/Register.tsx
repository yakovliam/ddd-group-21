import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import useEasyAuth from "@/hooks/use-easy-auth";
import { useState } from "react";
import { useNavigate } from "react-router";

const Register = () => {
  const { authContext } = useEasyAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    username: "",
    password: "",
  });

  const signup = () => {
    //post to keycloak and server
    navigate("/customers");
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1>Login Page</h1>

      <div className="flex flex-col gap-2 w-sm">
        <Input
          type="text"
          placeholder="firstname"
          onChange={(e) => setUser({ ...user, firstName: e.target.value })}
        />
        <Input
          type="text"
          placeholder="Lastname"
          onChange={(e) => setUser({ ...user, lastName: e.target.value })}
        />
        <Input
          type="text"
          placeholder="Email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <Input
          type="text"
          placeholder="phone"
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
        />
        <Input
          type="text"
          placeholder="username"
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
      </div>
      <div
        className="cursor-pointer underline"
        onClick={() => navigate("/login")}
      >
        login?
      </div>
      <Button onClick={signup}>Signup</Button>
    </div>
  );
};

export default Register;
