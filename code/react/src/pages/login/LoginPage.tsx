import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import useEasyAuth from "@/hooks/use-easy-auth";
import { useState } from "react";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const { authContext } = useEasyAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const redirectToLogin = () => {
    authContext.signinResourceOwnerCredentials({
      username: username,
      password: password,
    });
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1>Login Page</h1>

      <div className="flex flex-col gap-2 w-sm">
        <Input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div
        className="cursor-pointer underline"
        onClick={() => navigate("/register")}
      >
        register?
      </div>
      <Button onClick={redirectToLogin}>Login</Button>
    </div>
  );
};

export default LoginPage;
