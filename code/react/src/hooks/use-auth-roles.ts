import { useEffect } from "react";
import useEasyAuth from "./use-easy-auth";
import { jwtDecode } from "jwt-decode";

type Roles = string[];

interface JwtPayload {
  realm_access: {
    roles: Roles;
  };
}

const useAuthRoles = (): Roles => {
  const { user } = useEasyAuth();

  const decode = (token: string) => {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.realm_access.roles;
  };

  useEffect(() => {
    console.log(JSON.stringify(user?.profile));
  }, [user]);

  if (!user) {
    return [];
  }

  return decode(user.access_token);
};

export default useAuthRoles;
