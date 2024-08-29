import  { useState } from "react";

import {
  Home as HomeIcon,
  Apps as AppsIcon,
  TableChart as TableChartIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  MoreVert as MoreVertIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import PersonIcon from '@mui/icons-material/Person';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import CelebrationTwoToneIcon from '@mui/icons-material/CelebrationTwoTone';
import DateRangeIcon from '@mui/icons-material/DateRange';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { SiFormspree } from "react-icons/si";
import {
  Notifications as NotificationsIcon,
  CalendarToday as CalendarIcon,
  Assignment as TasksIcon,
  Description as DocumentsIcon,
  PhotoLibrary as PhotosIcon,
  MusicNote as MusicIcon,
} from "@mui/icons-material";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

const menuItems = [
 
  {
    name: "Home",
    icon: <HomeIcon className="text-teal-200" />,
    subMenu: [
      { name: "Add slider", path: "/admin-dashboard?type=add-slider" },
      { name: "Delete slider", path: "/admin-dashboard?type=delete-slider" },
      { name: "Update slider", path: "/admin-dashboard?type=update-slider" },
    ],
    id: "apps",
  },
  {
    name: "About",
    icon: <PersonIcon className="text-teal-200" />,
    subMenu: [
      { name: "Add About", path: "/admin-dashboard?type=add-about" },
      { name: "Delete About", path: "/admin-dashboard?type=delete-about" },
      { name: "Update About", path: "/admin-dashboard?type=update-about" },
    ],
    id: "apps",
  },
  {
    name: "Menu",
    icon: <RestaurantMenuIcon className="text-teal-200" />,
    subMenu: [
      { name: "Add Menu", path: "/admin-dashboard?type=add-menu" },
      { name: "Delete Menu", path: "/admin-dashboard?type=delete-menu" },
      { name: "Update Menu", path: "/admin-dashboard?type=update-menu" },
    ],
    id: "apps",
  },
 
  {
    name: "Category",
    icon: <WidgetsIcon className="text-teal-200" />,
    subMenu: [
      { name: "Add Category", path: "/admin-dashboard?type=add-category" },
      { name: "Delete Category", path: "/admin-dashboard?type=delete-category" },
      { name: "Update Category", path: "/admin-dashboard?type=update-category" },
    ],
    id: "apps",
  },
  {
    name: "Offers",
    icon: <CelebrationTwoToneIcon className="text-teal-200" />,
    subMenu: [
      { name: "Add Offer", path: "/admin-dashboard?type=add-offer" },
      { name: "Delete Offer", path: "/admin-dashboard?type=delete-offer" },
    ],
    id: "apps",

  },
 

  }
  ,
  {
    name: "Reservation",
    icon: <DateRangeIcon className="text-teal-200" />,
    subMenu: [
      { name: "View ", path: "/admin-dashboard?type=viewReservation" },
      { name: "Control", path: "/admin-dashboard?type=controlReservation" },
    ],
    id: "apps",
  }

 
];

const Sidebar = ({ isExpanded, setIsExpanded }) => {
  const [expandedMenuIndex, setExpandedMenuIndex] = useState(null);

  const toggleSubMenu = (index) => {
    setExpandedMenuIndex(expandedMenuIndex === index ? null : index);
  };

  const isSelected = (id) => {
    return expandedMenuIndex === id;
  };

  return (
    <div
      className={`flex flex-col h-screen  transition-width font-sans text-[#a8b2d4] duration-300 z-50 ${
        isExpanded
          ? "w-64 px-4 bg-darkOlive backdrop-blur-md border border-white border-opacity-10 shadow-lg"
          : "w-20 bg-darkOlive backdrop-blur-md border border-white border-opacity-10 shadow-lg"
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex items-center justify-between p-4 border-b border-white border-opacity-10">
       <Link  to="/admin-dashboard">

       <div className="text-3xl text-white">
          <img
            src='https://i.postimg.cc/5Nx5y7HG/Beige-green-modern-lime-fruit-logo-2.png'
            className="w-12 h-12 rounded-full object-cover mx-auto"
            alt="Logo"
          />
          <h1 className={` text-center text-28 font-merriweather ${
                  isExpanded ?"block":"hidden"
                } `}>Olive & Lime</h1>
          <h1 className={` text-center text-18 font-merriweather ${
                  isExpanded ?"block":"hidden"
                } `}>Admin Panel</h1>
        </div>
       </Link>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="focus:outline-none text-indigo-700 neumorphism-button"
        ></button>
      </div>
      <nav
        className={`mt-4 flex-1 ${
          isExpanded && "overflow-y-scroll scrollbar-thin"
        }`}
      >
        {menuItems.map((item, index) => (
          <div key={index} className="group flex flex-col p-2">
            {item.subMenu ? (
              <div
                className={`flex items-center p-2 hover:bg-[#16265f] rounded-md w-full transition-all duration-300 cursor-pointer transform hover:translate-x-2 neumorphism ${
                  !isExpanded && "justify-center"
                } ${isSelected(item.id) ? "bg-teal-200" : ""}`}
                onClick={() => toggleSubMenu(index)}
              >
                <div className="flex justify-between items-center w-full">
                  <div className="flex justify-center gap-x-4 items-center">
                    <div className="text-xl">{item.icon}</div>
                    <span
                      className={`ml-4 text-md ${!isExpanded && "hidden"}`}
                    >
                      {item.name}
                    </span>
                  </div>
                  {isExpanded && item.subMenu && (
                    <ExpandMoreIcon
                      className={`text-[#e5e7ef] transform transition-transform ${
                        isSelected(index) ? "rotate-0" : "-rotate-90"
                      }`}
                    />
                  )}
                </div>
              </div>
            ) : (
              <Link
                to={item.path}
                className="group flex items-center p-2 hover:bg-[#16265f] rounded-md w-full transition-all duration-300 cursor-pointer transform hover:translate-x-2 neumorphism"
              >
                <div className="flex justify-center gap-x-4 items-center">
                  <div className="text-xl">{item.icon}</div>
                  <span className={`ml-4 text-md ${!isExpanded && "hidden"}`}>
                    {item.name}
                  </span>
                </div>
              </Link>
            )}
            {isExpanded && expandedMenuIndex === index && item.subMenu && (
              <ul className="ml-8 transition-height duration-500 list-disc list-inside">
                {item.subMenu.map((subItem, subIndex) => (
                  <li
                    key={subIndex}
                    className="p-2 hover:bg-[#16265f] w-full rounded-md text-sm transition-all duration-300 cursor-pointer transform hover:translate-x-1 hover:translate-y-1 neumorphism"
                  >
                    <Link to={subItem.path}>{subItem.name}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
