import  { useState } from "react";
import Logo from "../../../assets/react.svg";
import {
  Home as HomeIcon,
  Apps as AppsIcon,
  Pages as PagesIcon,
  TableChart as TableChartIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  MoreVert as MoreVertIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
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
    icon: <HomeIcon className="text-pink-600" />,
    id: "home",
    path: "/",
  },
  {
    name: "Apps",
    icon: <AppsIcon className="text-teal-800" />,
    subMenu: [
      { name: "Contacts", path: "/" },
      { name: "Ecommerce", path: "/" },
      { name: "Chats", path: "/" },
      { name: "Users", path: "/" },
    ],
    id: "apps",
  },
  {
    name: "Pages",
    icon: <PagesIcon className="text-indigo-600" />,
    id: "pages",
    subMenu: [
      { name: "Not Found", path: "/not-found" },
      { name: "Server Error", path: "/server-error" },
    ],
  },
  {
    name: "Forms",
    icon: <SiFormspree className="text-yellow-600" />,
    id: "forms",
    path: "/forms",
  },
  {
    name: "Tables",
    icon: <TableChartIcon className="text-purple-600" />,
    id: "tables",
    path: "/tables",
  },
  {
    name: "UI",
    icon: <BarChartIcon className="text-blue-600" />,
    id: "ui",
    path: "/ui",
  },
  {
    name: "Charts",
    icon: <LockIcon className="text-red-600" />,
    id: "charts",
    path: "/charts",
  },
  {
    name: "Auth",
    icon: <MoreVertIcon className="text-green-600" />,
    id: "auth",
    path: "/auth",
  },
  {
    name: "Settings",
    icon: <SettingsApplicationsIcon className="text-indigo-600" />,
    id: "settings",
    path: "/settings",
  },
  {
    name: "Profile",
    icon: <AccountCircleIcon className="text-teal-600" />,
    id: "profile",
    path: "/profile",
  },
  {
    name: "Messages",
    icon: <AppsIcon className="text-pink-600" />,
    id: "messages",
    path: "/messages",
  },
  {
    name: "Notifications",
    icon: <NotificationsIcon className="text-yellow-600" />,
    id: "notifications",
    path: "/notifications",
  },
  {
    name: "Calendar",
    icon: <CalendarIcon className="text-purple-600" />,
    id: "calendar",
    path: "/calendar",
  },
  {
    name: "Tasks",
    icon: <TasksIcon className="text-blue-600" />,
    id: "tasks",
    path: "/tasks",
  },
  {
    name: "Documents",
    icon: <DocumentsIcon className="text-red-600" />,
    id: "documents",
    path: "/documents",
  },
  {
    name: "Photos",
    icon: <PhotosIcon className="text-green-600" />,
    id: "photos",
    path: "/photos",
  },
  {
    name: "Videos",
    icon: <AppsIcon className="text-teal-600" />,
    id: "videos",
    path: "/videos",
  },
  {
    name: "Music",
    icon: <MusicIcon className="text-indigo-600" />,
    id: "music",
    path: "/music",
  },
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
          ? "w-64 px-4 bg-[#111c43] backdrop-blur-md border border-white border-opacity-10 shadow-lg"
          : "w-20 bg-[#111c43] backdrop-blur-md border border-white border-opacity-10 shadow-lg"
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex items-center justify-between p-4 border-b border-white border-opacity-10">
        <div className="text-3xl text-white">
          <img
            src={Logo}
            className="w-12 h-12 rounded-full object-cover"
            alt="Logo"
          />
        </div>
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
