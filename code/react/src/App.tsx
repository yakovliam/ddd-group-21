import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router";
import AuthenticationContextWrapper from "@/components/auth/AuthenticationContextWrapper";
import HomePage from "@/pages/home/HomePage";
import Layout from "@/components/auth/layout/Layout";
import useEasyAuth from "@/hooks/use-easy-auth";
import Loading from "./components/loading/Loading";
import LoginPage from "./pages/login/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthenticationContextWrapper />}>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />

            <Route element={<ReverseProtectedRoute />}>
              <Route path="/login" element={<LoginPage />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/protected" element={<h1>Protected Page</h1>} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
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
