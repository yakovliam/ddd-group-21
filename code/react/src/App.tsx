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
import CutomerAccountPage from "@/pages/customer/account/CustomerAccountPage";
import CustomerOrdersPage from "@/pages/customer/orders/CustomerOrdersPage";
import CustomerCartPage from "@/pages/customer/cart/CustomerCartPage";
import CustomerCreditCardsPage from "./pages/customer/creditcards/CustomerCreditCardsPage";

import CustomerWrapper from "./components/layout/CustomerWrapper";
import StaffWrapper from "./components/layout/StaffWrapper";

import CustomerInfo from "./pages/staff/customerinfo/CustomerInfo";
import Processing from "./pages/staff/processing/Processing";
import Products from "./pages/staff/product/Products";

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
                <Route element={<RoleProtectedRoute roles={["staff"]} />}>
                  <Route path="/staff" element={<StaffWrapper />}>
                    <Route index element={<Navigate to={"products"} />} />
                    <Route path="product">
                      <Route index element={<Products />} />
                      <Route
                        path=":id"
                        element={<p>Staff PRoduct specific page</p>}
                      />
                    </Route>
                    <Route path="customerinfo">
                      <Route index element={<CustomerInfo />} />
                      <Route
                        path=":id"
                        element={<p>Staff customerinfo ind</p>}
                      />
                    </Route>
                    <Route path="processing">
                      <Route index element={<Processing />} />
                      <Route path=":id" element={<p>Staff processing ind</p>} />
                    </Route>
                  </Route>
                </Route>

                <Route path="/customer" element={<CustomerWrapper />}>
                  <Route index element={<Navigate to={"product"} />} />
                  <Route path="products">
                    <Route index element={<CustomerProductsPage />} />
                    <Route
                      path=":id"
                      element={<CustomerProductSpecificPage />}
                    />
                  </Route>

                  <Route path="account" element={<CutomerAccountPage />} />
                  <Route path="orders">
                    <Route index element={<CustomerOrdersPage />} />
                    <Route path=":id" element={<p>Customer order details</p>} />
                  </Route>

                  <Route path="cart" element={<CustomerCartPage />} />

                  <Route
                    path="creditcards"
                    element={<CustomerCreditCardsPage />}
                  />
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
