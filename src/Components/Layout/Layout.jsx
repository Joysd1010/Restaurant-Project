import { Outlet } from "react-router-dom";
import Header from "../Header&Footer/Header";
import Footer from "../Header&Footer/Footer";

const Layout = () => {
  return (
    <div className=" text-[#556B2F] bg-[#FFF8E1]">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
