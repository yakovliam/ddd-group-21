import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router";
import AuthenticationContextWrapper from "@/components/auth/AuthenticationContextWrapper";
import HomePage from "@/pages/home/HomePage";
import Layout from "@/components/layout/Layout";
import useEasyAuth from "@/hooks/use-easy-auth";
import Loading from "@/components/loading/LoadingScreen";
import LoginPage from "@/pages/login/LoginPage";
import CustomerProductsPage from "@/pages/customer/products/CustomerProductsPage";
import useAuthRoles from "@/hooks/use-auth-roles";
import UnauthorizedPage from "@/pages/unauthorized/UnauthorizedPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useApi from "@/hooks/use-api";

const API_URL = import.meta.env.VITE_BACKEND_URL;

function App() {
  // ky api
  const api = useApi();

  // react-query client
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        queryFn: async ({ queryKey }) => {
          const [resource, offset, limit] = queryKey;
          const url = `${API_URL}${resource}`;

          const searchParams = new URLSearchParams();

          if (limit !== undefined) {
            searchParams.set("size", String(limit));
          }

          if (offset !== undefined) {
            searchParams.set("page", String(offset));
          }

          return api.get(url, { searchParams }).json();
        },
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthenticationContextWrapper />}>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/unauthorized" element={<UnauthorizedPage />} />

              <Route element={<ReverseProtectedRoute />}>
                <Route path="/login" element={<LoginPage />} />
              </Route>

              <Route element={<ProtectedRoute />}>
                <Route element={<RoleProtectedRoute roles={["staff"]} />}>
                  <Route path="/staff" element={<h1>Staff</h1>} />
                </Route>

                <Route path="/customer">
                  <Route index element={<Navigate replace to="products" />} />
                  <Route path="products" element={<CustomerProductsPage />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

/**
 * ProtectedRoute is a route that is only accessible to authenticated users.
 */
const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useEasyAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

type RoleProtectedRouteProps = {
  roles: string[];
};

const RoleProtectedRoute = ({ roles }: RoleProtectedRouteProps) => {
  const { hasAnyRole } = useAuthRoles();

  if (!hasAnyRole(roles)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

/**
 * ReverseProtectedRoute is a route that is only accessible to unauthenticated users.
 */
const ReverseProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useEasyAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default App;
