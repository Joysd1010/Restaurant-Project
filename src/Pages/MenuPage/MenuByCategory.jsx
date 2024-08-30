import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import CusineCard from "./CuisineCard";
import { useParams } from "react-router-dom";
import { MdOutlineOutdoorGrill } from "react-icons/md";

import { TfiGift } from "react-icons/tfi";
import { Helmet } from "react-helmet-async";

const MenuByCategory = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' 
    });
  }, []);
  const { category } = useParams(); 
  const [menu, setMenu] = useState([]);
  const [activeCategory, setActiveCategory] = useState(category || "All"); 
  const [Category, setCategory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;


  useEffect(() => {
    const params =
      activeCategory === "All" || activeCategory === "Set Menu"
        ? {}
        : { category: activeCategory };
  
    axiosInstance
      .get(`/menu`, { params })
      .then((response) => {
        const availableItems = response.data.filter(item => item.available === true);
        setMenu(availableItems);
        setCurrentPage(1); // Reset to the first page whenever category changes
      })
      .catch((error) => {
        console.error("Error fetching menu:", error);
      });
  }, [activeCategory]);

  useEffect(() => {
    axiosInstance
      .get("/menu/category")
      .then((response) => {
        console.log(response)
        const Items = [...new Set(response.data.map((item) => item.category))];
        console.log(Items)
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
    const maxPage = Math.ceil(menu.length / itemsPerPage);
    setCurrentPage((prevPage) => Math.min(prevPage + 1, maxPage));
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMenuItems = menu.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(menu.length / itemsPerPage);

  const [selectedMenuItem, setSelectedMenuItem] = useState({});

  const handleWarningClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
    document.getElementById("my_modal_3").showModal();
  };

  const {
    name,
    image,
    details,
    ingredients,
    price,
    offer,
    offerPrice,
    available,
    allergy,
    callories
  } = selectedMenuItem;

  const lunchMenu=menu.filter(
    (item) => item.type && item.type.toLowerCase() === 'lunch'
  )
  const dinnerMenu=menu.filter(
    (item) => item.type && item.type.toLowerCase() === 'dinner'
  )
  const breakFastMenu=menu.filter(
    (item) => item.type && item.type.toLowerCase() === 'breakfast'
  )
  return (
    <div className="md:mx-28">
       <Helmet>
        <title>Menu - Olive&lime</title>
        <meta name="description" content="Indulge in our latest offers at Olive&Lime. Enjoy delicious Mediterranean cuisine and handcrafted cocktails at unbeatable prices. Book your table now!" />

        <link rel="canonical" href="https://oliveandlime.co.uk/menu" />

      </Helmet>
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
        <div className="px-3">
          <div className="flex flex-col items-center py-3">
            <MdOutlineOutdoorGrill size={30} className="text-green-400" />
            <h1 className="text-20 font-merriweather font-semibold text-Charcoal">
              Breakfast
            </h1>
          </div>
          <hr className="border-2 mb-4 mx-20" />
          {
            breakFastMenu.length < 1 ? (
              <div className="font-merriweather text-18 text-center font-bold py-5">
                Our Dinner menu is on the way, please stay tuned
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-3">
                {breakFastMenu.map((foods) => (
                  <CusineCard
                  key={foods._id}
                  menu={foods} // Pass the menu item data
                  onWarningClick={() => handleWarningClick(foods)}
                  />
                
                ))}
              </div>)
          }
          <div className="flex flex-col items-center py-3">
            <MdOutlineOutdoorGrill size={30} className="text-green-400" />
            <h1 className="text-20 font-merriweather font-semibold text-Charcoal">
              Lunch
            </h1>
          </div>
          <hr className="border-2 mb-4 mx-20" />
          {
            lunchMenu.length < 1 ? (
              <div className="font-merriweather text-18 text-center font-bold py-5">
                Our Dinner menu is on the way, please stay tuned
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-3">
                {lunchMenu.map((foods) => (
                  <CusineCard
                  key={foods._id}
                  menu={foods} // Pass the menu item data
                  onWarningClick={() => handleWarningClick(foods)}
                  />
                
                ))}
              </div>)
          }
          <div className="flex flex-col items-center py-3">
            <MdOutlineOutdoorGrill size={30} className="text-green-400" />
            <h1 className="text-20 font-merriweather font-semibold text-Charcoal">
              Dinner
            </h1>
          </div>
          <hr className="border-2 mb-4 mx-20" />
          {/* <SetMenu menu={menu} time="dinner" onWarningClick={handleWarningClick} /> */}
          {
            dinnerMenu.length < 1 ? (
              <div className="font-merriweather text-18 text-center font-bold py-5">
                Our Dinner menu is on the way, please stay tuned
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-3">
                {dinnerMenu.map((foods) => (
                  <CusineCard
                  key={foods._id}
                  menu={foods} // Pass the menu item data
                  onWarningClick={() => handleWarningClick(foods)}
                  />
                
                ))}
              </div>)
          }
        </div>
      ) : (
        <div className="py-5 px-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {currentMenuItems.map((menuItem) => (
              <CusineCard
                key={menuItem._id}
                menu={menuItem}
                onWarningClick={() => handleWarningClick(menuItem)}
              />
            ))}
          </div>

          <div className="flex justify-around">
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

{selectedMenuItem && (
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box bg-warm">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <div>
              <img src={image} alt={name} className="w-60 mx-auto" />
              <h1 className="font-bold text-22 text-Charcoal py-2">{name}</h1>

              {offer ? (
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <p className="text-Charcoal line-through font-bold text-[16px]">
                      {price} $
                    </p>
                    <p className="text-lime font-bold text-[16px]">
                      {offerPrice} $
                    </p>
                  </div>

                  <div className="flex gap-2 items-center font-bold text-18 px-2 py-1 rounded bg-olive text-warm">
                    <TfiGift size={20} /> Offer
                  </div>
                </div>
              ) : (
                <p className="text-Charcoal font-bold text-[16px]">{price} $</p>
              )}
              <p className="text-18 font-merriweather">{details}</p>
              {ingredients && (
                <div>
                  <p className="text-lime font-bold text-[17px]">
                    Ingredients :{" "}
                    <span className="text-Charcoal text-[17px] font-normal">
                      {ingredients.join(", ")}
                    </span>
                  </p>
                </div>
              )}
              
               <p className="text-lime font-bold text-[17px]">
                    Allergetic : {" "}
                    <span className="text-Charcoal text-[17px] font-normal">
                      {allergy}
                    </span>
                  </p>
               <p className="text-lime font-bold text-[17px]">
                    Callories :{" "}
                    <span className="text-Charcoal text-[17px] font-normal">
                      {callories}cal
                    </span>
                  </p>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MenuByCategory;
