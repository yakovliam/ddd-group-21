import { useEffect } from "react";
import useEasyAuth from "./use-easy-auth";
import { jwtDecode } from "jwt-decode";

type Roles = string[];

interface JwtPayload {
  realm_access: {
    roles: Roles;
  };
}

type UseAuthRolesHasRole = (role: string) => boolean;
type UseAuthRolesHasAnyRole = (roles: Roles) => boolean;

const useAuthRoles = (): {
  hasRole: UseAuthRolesHasRole;
  hasAnyRole: UseAuthRolesHasAnyRole;
} => {
  const { user } = useEasyAuth();

  const decode = (token: string) => {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.realm_access.roles;
  };

  const hasRole = (role: string): boolean => {
    if (!user) {
      return false;
    }

    return decode(user.access_token).includes(role);
  };

  const hasAnyRole = (roles: Roles): boolean => {
    if (!user) {
      return false;
    }

    const decoded = decode(user.access_token);
    return roles.some((role) => decoded.includes(role));
  };

  return {
    hasRole,
    hasAnyRole,
  };
};

export default useAuthRoles;
