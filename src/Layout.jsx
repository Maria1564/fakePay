import { Outlet } from "react-router";
import Header from "./components/Navbar";

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
