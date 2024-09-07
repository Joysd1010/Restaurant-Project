import { Outlet } from "react-router-dom";
import Header from "../Header&Footer/Header";
import Footer from "../Header&Footer/Footer";

const Layout = () => {
  return (
    <div className=" text-darkOlive bg-white">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
