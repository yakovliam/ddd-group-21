import Button from "@/components/ui/Button";
import useAuthRoles from "@/hooks/use-auth-roles";
import useEasyAuth from "@/hooks/use-easy-auth";
import { useMemo } from "react";
import { useNavigate } from "react-router";

const Header = () => {
  const { authContext } = useEasyAuth();
  const { hasRole } = useAuthRoles();
  const navigate = useNavigate();

  const logout = () => {
    authContext.signoutRedirect();
  };

  const isStaff = useMemo(() => {
    return hasRole("staff");
  }, [hasRole]);

  return (
    <div className="flex items-center justify-between border-b border-gray-300 p-4">
      <div>
        <h1>DDD Shop Group 21</h1>
      </div>
      {authContext.user && (
        <div className="flex items-center gap-4">
          <p>{authContext.user?.profile.name}</p>
          <Button
            onClick={() => {
              navigate("/customer");
            }}
          >
            Customer
          </Button>
          {isStaff && (
            <Button
              onClick={() => {
                navigate("/staff");
              }}
            >
              Staff
            </Button>
          )}
          <Button onClick={logout}>Logout</Button>
        </div>
      )}
    </div>
  );
};

export default Header;
