import { useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [menu, setMenu] = useState(true);

  const handleMenuToggle = () => {
    setMenu(!menu);
  };

  return (
    <div className="sticky top-0 z-30">
      <div className="relative h-20 flex items-center justify-between md:mx-28 px-5 shadow-lg shadow-yellow-200 bg-[#FFF8E1]">
        {/* Overlay div */}
        <div
          className="absolute w-48 bg-Charcoal inset-0 z-10"
          style={{
            clipPath: "polygon(0% 0, 80% 0, 100% 100%, 0 100%)",
          }}
        ></div>

        {/* ------------------Logo section------------------------------- */}
        <div className="z-20">
          <NavLink to={'/'}>
          <img
            src="https://i.postimg.cc/5Nx5y7HG/Beige-green-modern-lime-fruit-logo-2.png"
            className="w-28 relative"
            alt="Logo"
          />
          </NavLink>
        </div>

        {/* -----------------------NavLink Section------------------------------------ */}
        <div
          onClick={() => setMenu(true)}
          className={`z-20 flex md:static md:shadow-none shadow-lg shadow-yellow-200 bg-[#FFF8E1] absolute text-[#333333] top-28 text-[18px] md:flex-row sm:flex-col flex-col justify-between items-start md:items-center gap-2 md:gap-4 ${
            menu ? "right-[450px] duration-700" : "right-0 top-[80px] md:px-0 px-10 py-2 duration-700"
          }`}
        >
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive
                ? "group p-4 font-bold md:text-xl text-[#556B2F] duration-300"
                : "group p-4 md:text-xl duration-300"
            }
          >
            <p>Home</p>
            <hr className="w-1 border-2 hidden sm:block border-gray-300 group-hover:w-full group-hover:border-gray-500 transition-all duration-300" />
          </NavLink>
          <NavLink
            to={"/menu"}
            className={({ isActive }) =>
              isActive
                ? "group p-4 font-bold md:text-xl text-[#556B2F] duration-300"
                : "group p-4 md:text-xl duration-300"
            }
          >
            <p>Menu</p>
            <hr className="w-1 border-2 hidden sm:block border-gray-300 group-hover:w-full group-hover:border-gray-500 transition-all duration-300" />
          </NavLink>
          <NavLink
            to={"/offer"}
            className={({ isActive }) =>
              isActive
                ? "group p-4 font-bold md:text-xl text-[#556B2F] duration-300"
                : "group p-4 md:text-xl duration-300"
            }
          >
            <p>Offers</p>
            <hr className="w-1 border-2 hidden sm:block border-gray-300 group-hover:w-full group-hover:border-gray-500 transition-all duration-300" />
          </NavLink>
          <NavLink
            to={"/about"}
            className={({ isActive }) =>
              isActive
                ? "group p-4 font-bold md:text-xl text-[#556B2F] duration-300"
                : "group p-4 md:text-xl duration-300"
            }
          >
            <p>About Us</p>
            <hr className="w-1 border-2 hidden sm:block border-gray-300 group-hover:w-full group-hover:border-gray-500 transition-all duration-300" />
          </NavLink>
          {/* <NavLink
            to={"/contact"}
            className={({ isActive }) =>
              isActive
                ? "group p-4 font-bold md:text-xl text-[#556B2F] duration-300"
                : "group p-4 md:text-xl duration-300"
            }
          >
            <p>Contact Us</p>
            <hr className="w-1 border-2 hidden sm:block border-gray-300 group-hover:w-full group-hover:border-gray-500 transition-all duration-300" />
          </NavLink> */}
        </div>

        {/* --------------------------------Toggle Switch======================== */}
        <div
          className="md:hidden  z-20 cursor-pointer  w-11 h-11"
          onClick={handleMenuToggle}
        >
          <span
            className={`block absolute w-8 h-1 bg-[#d3531a] rounded-lg transition-all duration-300 ${
              menu ? "top-5" : "top-8 transform rotate-45"
            }`}
          ></span>
          <span
            className={`block absolute w-8 h-1 bg-[#d3531a] rounded-lg transition-all duration-300 ${
              menu ? "top-8" : "opacity-0"
            }`}
          ></span>
          <span
            className={`block absolute w-8 h-1 bg-[#d3531a] rounded-lg transition-all duration-300 ${
              menu ? "top-11" : "top-8 transform -rotate-45"
            }`}
          ></span>
        </div>
      </div>
    </div>
  );
};

export default Header;
