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
import CustomerProductSpecificPage from "@/pages/customer/products/CustomerProductSpecificPage";
import CustomerOrdersPage from "@/pages/customer/orders/CustomerOrdersPage";
import StaffWrapper from "@/components/layout/StaffWrapper";
import StaffProductsPage from "./pages/staff/products/StaffProductsPage";
import CutomerAccountPage from "./pages/customer/account/CutomerAccountPage";
import CustomerWrapper from "./components/layout/CustomerWrapper";
import CustomerCartPage from "./pages/customer/cart/CustomerCartPage";
import StaffProductDeletePage from "./pages/staff/products/StaffProductDeletePage";
import StaffLogisticsPage from "./pages/staff/logistics/StaffLogisticsPage";

function App() {
  const queryClient = new QueryClient();

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
                <Route
                  path="/staff"
                  element={
                    <RoleProtectedRoute roles={["staff"]}>
                      <StaffWrapper />
                    </RoleProtectedRoute>
                  }
                >
                  <Route index element={<Navigate to={"products"} />} />
                  <Route path="products">
                    <Route index element={<StaffProductsPage />} />
                    <Route path=":id">
                      <Route index element={<p>Staff product id</p>} />
                      <Route
                        path="delete"
                        element={<StaffProductDeletePage />}
                      />
                    </Route>
                  </Route>
                  <Route path="logistics" element={<StaffLogisticsPage />} />
                  <Route path="customerinfo">
                    <Route index element={<p>Staff customerinfo</p>} />
                    <Route path=":id" element={<p>Staff customerinfo id</p>} />
                  </Route>
                  <Route path="processing">
                    <Route index element={<p>Staff processing</p>} />
                    <Route path=":id" element={<p>Staff processing id</p>} />
                  </Route>
                </Route>

                <Route path="/customer" element={<CustomerWrapper />}>
                  <Route index element={<Navigate replace to="products" />} />
                  <Route path="products">
                    <Route index element={<CustomerProductsPage />} />
                    <Route path=":id">
                      <Route index element={<CustomerProductSpecificPage />} />
                    </Route>
                  </Route>

                  <Route path="account" element={<CutomerAccountPage />} />
                  <Route path="orders">
                    <Route index element={<CustomerOrdersPage />} />
                    <Route path=":id" element={<p>Customer order details</p>} />
                  </Route>

                  <Route path="cart" element={<CustomerCartPage />} />
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
  children?: React.ReactNode;
};

const RoleProtectedRoute = ({ roles, children }: RoleProtectedRouteProps) => {
  const { hasAnyRole } = useAuthRoles();

  if (!hasAnyRole(roles)) {
    return <Navigate to="/unauthorized" />;
  }

  return <>{children}</>;
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
