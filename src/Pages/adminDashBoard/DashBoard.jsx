import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Loader from "./components/Loader";
import SliderUpload from "./components/Home_slider_upload";
import RemoveSlider from "./components/RemoveSlider";
import UpdateSlider from "./components/UpdateSlider";
import CategoryUpload from "./components/CategoryUpload";
import DeleteCategory from "./components/DeleteCategory";
import UpdateCategory from "./components/UpdateCategory";
import MenuItemAdding from "./components/menuItemAddd";
import DeleteMenu from "./components/DeleteMenu";
import UpdateMenu from "./components/UpdateMenu";
import SpecialOffer from "./components/SpecialOffer";
import DeleteOffer from "./components/DeleteOffer";
import { useLocation } from "react-router-dom";
import FirstPage from "./components/FirstPage";
import ControlReservation from "./components/ControlReservation";
import ViewReservation from "./components/ViewReservation";
import CollectedEmail from "./components/CollectedEmail";

const DashBoard = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type") ;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Conditional Rendering based on `type`
  const renderContent = () => {
    switch (type) { 
      case "add-menu":
        return <MenuItemAdding />;
      case "delete-menu":
        return <DeleteMenu />;
      case "update-menu":
        return <UpdateMenu />;
      case "add-slider":
        return <SliderUpload />;
      case "delete-slider":
        return <RemoveSlider />;
      case "update-slider":
        return <UpdateSlider />;
      case "add-category":
        return <CategoryUpload />;
      case "delete-category":
        return <DeleteCategory />;
      case "update-category":
        return <UpdateCategory />;
      case "add-offer":
        return <SpecialOffer />;
      case "delete-offer":
        return <DeleteOffer />;
      case "controlReservation":
        return <ControlReservation />;
      case "viewReservation":
        return <ViewReservation />;
      case "email":
        return <CollectedEmail />;
      default:
        return <FirstPage/>;;
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-12 gap-4 h-full bg-transparent">
          {/* Sidebar */}
          <div className="col-span-2 fixed top-0 left-0 z-40">
            <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
          </div>

          {/* Main Content */}
          <div
            className={`col-span-10 col-start-2 flex flex-col transition-all duration-300 ${
              isExpanded && "ml-28"
            }`}
          >
            {/* Main Content Area */}
            <div className={`p-6 mt-16 bg-white ${isExpanded && "ml-28"}`}>
              {renderContent()}
            </div>
          </div>
        </div>
      )}
    </>
  );
};



export default DashBoard;
