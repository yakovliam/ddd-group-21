import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-grow px-32 pb-16">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
