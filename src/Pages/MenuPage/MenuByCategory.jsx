import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import CusineCard from "./CuisineCard";
import { useParams } from "react-router-dom";
import { MdOutlineOutdoorGrill } from "react-icons/md";
import SetMenu from "./SetMenu";

const MenuByCategory = () => {
  const { category } = useParams(); // Extract category from URL parameters
  const [menu, setMenu] = useState([]);
  const [activeCategory, setActiveCategory] = useState(category || "All"); // Set the active category from URL or default to "All"
  const [Category, setCategory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Fetch menu items by category when activeCategory changes
  useEffect(() => {
    const params =
      activeCategory === "All" || activeCategory === "Set Menu"
        ? {}
        : { category: activeCategory };

    axiosInstance
      .get(`/menu`, { params })
      .then((response) => {
        setMenu(response.data);
        setCurrentPage(1); // Reset to the first page whenever category changes
      })
      .catch((error) => {
        console.error("Error fetching menu:", error);
      });
  }, [activeCategory]);

  // Fetch unique categories
  useEffect(() => {
    axiosInstance
      .get("/menu/category")
      .then((response) => {
        const Items = [...new Set(response.data.map((item) => item.category))];
        setCategory(Items);
      })
      .catch((error) => {
        console.error("Error fetching menu:", error);
      });
  }, []);

  const handleCategoryClick = (item) => {
    setActiveCategory(item);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    const maxPage = Math.ceil(length / itemsPerPage);
    setCurrentPage((prevPage) => Math.min(prevPage + 1, maxPage));
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMenuItems = menu.slice(indexOfFirstItem, indexOfLastItem);
 
  // Calculate total pages
  const totalPages = Math.ceil(menu.length / itemsPerPage);

  return (
    <div className="md:mx-28 ">
      <h1 className="text-center font-bold text-28 py-5 font-merriweather">
        Find your desired dish
      </h1>
      <hr className="md:mx-96 mx-10 border-2 border-limeGreen" />
      <div className="flex justify-around text-center overflow-x-auto">
        <div className="py-5 flex gap-3 px-5" id="NavBar">
          <div
            className={`text-[14px] cursor-pointer md:text-18 md:font-semibold font-bold text-Charcoal shadow-xl px-3 md:px-5 rounded  ${
              activeCategory === "Set Menu"
                ? "shadow-yellow-200 border-lime border-2"
                : ""
            }`}
            onClick={() => handleCategoryClick("Set Menu")}
          >
            <h1>Set Menu</h1>
          </div>
          <div
            className={`text-[14px] cursor-pointer md:text-18 md:font-semibold font-bold text-Charcoal shadow-xl px-3 md:px-5 rounded ${
              activeCategory === "All"
                ? "shadow-yellow-200 border-lime border-2"
                : ""
            }`}
            onClick={() => handleCategoryClick("All")}
          >
            <h1>All</h1>
          </div>
          {Category.map((item, index) => (
            <div
              key={index}
              className={`text-[14px] cursor-pointer md:text-18 md:font-semibold font-bold text-Charcoal shadow-xl px-3 md:px-5 rounded ${
                activeCategory === item
                  ? "shadow-yellow-200 border-lime border-2"
                  : ""
              }`}
              onClick={() => handleCategoryClick(item)}
            >
              <h1>{item}</h1>
            </div>
          ))}
        </div>
      </div>

      {activeCategory === "Set Menu" ? (
        <div className=" px-3">
          <div className="flex flex-col items-center py-3">
            <MdOutlineOutdoorGrill size={30} className=" text-green-400"/>
            <h1 className="text-20 font-merriweather font-semibold text-Charcoal">
              Breakfast
            </h1>
          </div>
          <hr className="border-2 mb-4 mx-20"/>
                   <SetMenu menu={menu} time={'breakfast'}/>
          <div className="flex flex-col items-center py-3">
            <MdOutlineOutdoorGrill size={30} className=" text-green-400"/>
            <h1 className="text-20 font-merriweather font-semibold text-Charcoal">
              Lunch
            </h1>
          </div>
          <hr className="border-2 mb-4 mx-20"/>
                   <SetMenu menu={menu} time={'lunch'}/>
          <div className="flex flex-col items-center py-3">
            <MdOutlineOutdoorGrill size={30} className=" text-green-400"/>
            <h1 className="text-20 font-merriweather font-semibold text-Charcoal">
              Dinner
            </h1>
          </div>
          <hr className="border-2 mb-4 mx-20"/>
                   <SetMenu menu={menu} time={'dinner'}/>

        </div>
      ) : (
        <div className=" py-5 px-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {currentMenuItems.map((menuItem, index) => (
              <CusineCard key={menuItem._id} menu={menuItem} />
            ))}
          </div>

          <div className=" flex justify-around">
            <div className="flex gap-5 items-center mt-5">
              <button
                className="px-4 py-2 text-white bg-lime rounded hover:bg-yellow-300 hover:text-Charcoal"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              <div className="flex gap-2">
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    className={`px-4 py-2 rounded-full ${
                      pageNumber === currentPage
                        ? "bg-yellow-300"
                        : "bg-gray-200"
                    }`}
                    onClick={() => handlePageClick(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                ))}
              </div>

              <button
                className="px-4 py-2 text-white bg-lime rounded hover:bg-yellow-300 hover:text-Charcoal"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuByCategory;
