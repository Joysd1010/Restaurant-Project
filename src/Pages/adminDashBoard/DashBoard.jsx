import  { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Loader from './components/Loader';
import  SliderUpload from "./components/Home_slider_upload"

const DashBoard = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-12 gap-4 h-screen bg-transparent">
          {/* Sidebar */}
          <div className="col-span-2 fixed top-0 left-0 z-40">
            <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
          </div>

          {/* Main Content */}
          <div className={`col-span-10 col-start-2 flex flex-col transition-all duration-300 ${isExpanded && "ml-28"}`}>
            {/* Navbar */}
            {/* <div className={`fixed-top-navbar top-0 left-20 w-full col-span-10  transition-all duration-300 ${isExpanded && "ml-32"}`}>
              <Navbar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
            </div> */}

            {/* Main Content Area */}
            <div className={`p-6 mt-16 bg-white ${isExpanded && "ml-28"}`}>
                {/* Dashboard Route */}
                <SliderUpload/>
                
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashBoard;
