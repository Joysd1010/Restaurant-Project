import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [menu, setMenu] = useState(true);
  const handleMenuOpen = () => {
    setMenu(false);
  };
  const handleMenuClose = () => {
    setMenu(true);
  };
  return (
    <div className=" sticky top-0 flex items-center justify-between md:mx-28 px-5 shadow-lg shadow-yellow-200 bg-[#FFF8E1]">
      {/* ------------------Logo section------------------------------- */}
      <div>
        <img
          src="https://i.postimg.cc/5Nx5y7HG/Beige-green-modern-lime-fruit-logo-2.png"
          className="w-28"
          alt="Logo"
        />
      </div>
      {/* -----------------------NavLink Section------------------------------------ */}
      <div
        className={`flex md:static md:shadow-none  shadow-lg shadow-yellow-200 bg-[#FFF8E1] absolute  text-[#333333] top-28 text-[18px] md:flex-row sm:flex-col flex-col justify-between items-start md:items-center gap-2 md:gap-4 ${
          menu
            ? " right-[450px] duration-700 "
            : " right-0 md:px-0 px-10  py-2 duration-700"
        }`}
      >
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive
              ? "group p-4 font-bold  md:text-xl text-[#556B2F] duration-300"
              : "group p-4 md:text-xl  duration-300"
          }
        >
          <p>Home</p>
          <hr className="w-1 border-2 hidden  sm:block border-gray-300 group-hover:w-full group-hover:border-gray-500 transition-all duration-300" />
        </NavLink>

        <NavLink
          to={"/menu"}
          className={({ isActive }) =>
            isActive
              ? "group p-4 font-bold  md:text-xl text-[#556B2F] duration-300"
              : "group p-4 md:text-xl  duration-300"
          }
        >
          <p>Menu</p>
          <hr className="w-1 border-2 hidden  sm:block border-gray-300 group-hover:w-full group-hover:border-gray-500 transition-all duration-300" />
        </NavLink>
        <NavLink
          to={"/offer"}
          className={({ isActive }) =>
            isActive
              ? "group p-4 font-bold  md:text-xl text-[#556B2F] duration-300"
              : "group p-4 md:text-xl  duration-300"
          }
        >
          <p>Offers</p>
          <hr className="w-1 border-2 hidden  sm:block border-gray-300 group-hover:w-full group-hover:border-gray-500 transition-all duration-300" />
        </NavLink>

        <NavLink
          to={"/offer"}
          className={({ isActive }) =>
            isActive
              ? "group p-4 font-bold  md:text-xl text-[#556B2F] duration-300"
              : "group p-4 md:text-xl  duration-300"
          }
        >
          <p>About Us</p>
          <hr className="w-1 border-2 hidden  sm:block border-gray-300 group-hover:w-full group-hover:border-gray-500 transition-all duration-300" />
        </NavLink>
        <NavLink
          to={"/offer"}
          className={({ isActive }) =>
            isActive
              ? "group p-4 font-bold  md:text-xl text-[#556B2F] duration-300"
              : "group p-4 md:text-xl  duration-300"
          }
        >
          <p>Contact Us</p>
          <hr className="w-1 border-2 hidden  sm:block border-gray-300 group-hover:w-full group-hover:border-gray-500 transition-all duration-300" />
        </NavLink>
      </div>

      <div className=" md:hidden ml-5">
        {menu ? (
          <div className=" rotate-270 duration-300  rounded-lg">
            <IoMenu onClick={handleMenuOpen} size={30} />
          </div>
        ) : (
          <div className=" rotate-90 duration-300  rounded-lg">
            <RxCross1 onClick={handleMenuClose} size={30} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
