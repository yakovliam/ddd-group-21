import Button from "@/components/ui/Button";
import useEasyAuth from "@/hooks/use-easy-auth";

const RegisterPage = () => {
  const { authContext } = useEasyAuth();

  const redirectToLogin = () => {
    authContext.signinRedirect({
      scope: "untrusted-audience openid email profile",
    });
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1>Register Page</h1>
      <Button onClick={redirectToLogin}>Register</Button>
    </div>
  );
};

export default RegisterPage;
