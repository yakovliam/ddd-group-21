import Button from "@/components/ui/Button";
import useEasyAuth from "@/hooks/use-easy-auth";

const LoginPage = () => {
  const { authContext } = useEasyAuth();

  const redirectToLogin = () => {
    authContext.signinRedirect();
  };

  return (
    <div>
      <h1>Login Page</h1>
      <Button onClick={redirectToLogin}>Login</Button>
    </div>
  );
};

export default LoginPage;
