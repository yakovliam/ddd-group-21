import Button from "@/components/ui/Button";
import useEasyAuth from "@/hooks/use-easy-auth";

const Header = () => {
  const { authContext } = useEasyAuth();

  const logout = () => {
    authContext.signoutRedirect();
  };

  return (
    <div className="flex items-center justify-between border-b border-gray-300 p-4">
      <div>
        <h1>DDD Shop Group 21</h1>
      </div>
      {authContext.user && (
        <div className="flex items-center gap-4">
          <p>{authContext.user?.profile.name}</p>
          <Button onClick={logout}>Logout</Button>
        </div>
      )}
    </div>
  );
};

export default Header;
