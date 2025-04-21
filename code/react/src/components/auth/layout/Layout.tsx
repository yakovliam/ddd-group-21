import { Outlet } from "react-router";

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <p>[Header]</p>

            <div className="flex-grow">
                <Outlet />
            </div>

            <p>[Footer]</p>
        </div>
    );
};

export default Layout;