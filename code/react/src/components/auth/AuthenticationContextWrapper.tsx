import useEasyAuth from "@/hooks/use-easy-auth";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

const AuthenticationTools = () => {
    const { authContext } = useEasyAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (authContext.user?.expired) {
            authContext.signoutSilent();
            return;
        }

        // if exipired, redirect to login
        return authContext.events.addAccessTokenExpired(() => {
            navigate("/login");
        });
    }, [authContext, navigate]);

    useEffect(() => {
        // start auto sign in renew
        return authContext.startSilentRenew();
    }, [authContext]);

    useEffect(() => {
        return authContext.events.addAccessTokenExpiring(() => {
            alert("Access token expiring. Refreshing...");
        });
    }, [authContext]);

    useEffect(() => {
        return authContext.events.addUserLoaded(() => {
            navigate(location.pathname, { replace: true });
        });
    }, [authContext, navigate, location]);

    return <Outlet />;
};

export default AuthenticationTools;
