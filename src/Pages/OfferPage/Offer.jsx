import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import CountdownTimer from "./CountdownTime";
import CusineCard from "../MenuPage/CuisineCard";
import { TfiGift } from "react-icons/tfi";

const Offer = () => {
  const [offerData, setOfferData] = useState([]);
  const [RunningOfferData, setRunning] = useState([]);
  const [UpComingOfferData, setUpcoming] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3); // Max number of items per page
  const now = new Date();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' 
    });
  }, []);

  useEffect(() => {
    axiosInstance
      .get("/offer")
      .then((response) => {
        const now = new Date();
        console.log(response.data,"off")

        const filteredOffers = response.data.filter((offer) => {
          const endTime = new Date(offer.endTime);
          return endTime >= now;
        });

        const runningOffers = filteredOffers.filter((offer) => {
          const startTime = new Date(offer.startTime);
          return startTime <= now;
        });

        const upcomingOffers = filteredOffers.filter((offer) => {
          const startTime = new Date(offer.startTime);
          return startTime > now;
        });

        setOfferData(filteredOffers);
        setRunning(runningOffers);
        setUpcoming(upcomingOffers);
      })
      .catch((error) => {
        console.error("Error fetching offer data:", error);
      });
  }, []);

  const [selectedMenuItem, setSelectedMenuItem] = useState({});

  const handleWarningClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
    document.getElementById("my_modal_3").showModal();
  };

  const { name, image, details, ingredients, price, offer, offerPrice } =
    selectedMenuItem;

  // Pagination logic based on menuItems
  const paginate = (items) => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return items.slice(indexOfFirstItem, indexOfLastItem);
  };

  const handleNextPage = (totalPages) => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : prevPage
    );
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  return (
    <div className="md:mx-28">
      <h1 className="text-center py-3 font-merriweather font-bold text-28">
        Happy Hours Deals
      </h1>
      <hr className="border-2 border-Charcoal md:mx-36 mx-8 mb-5" />

      {!offerData.length > 0 ? (
        <div>
          <img
            src="https://i.ibb.co/m0gnvk0/Untitled-design.gif"
            className="mx-auto md:w-1/3"
            alt="no offer gif"
          />
          <h2 className="text-center py-3 font-merriweather font-bold text-20">
            Sorry, we will be back with exciting offers <br /> Stay connected
          </h2>
        </div>
      ) : (
       <div>
          <>
            {RunningOfferData.map((item) => {
              const paginatedMenuItems = paginate(item.menuItems);
              const totalPages = Math.ceil(item.menuItems.length / itemsPerPage);
  
              return (
                <div className="mx-10" key={item._id}>
                  <h1 className="rounded py-2 text-center hover border-2 hover:text-lime hover:bg-warm border-lime duration-300 my-2 text-warm font-bold font-merriweather text-28 bg-lime">
                    {item.name}
                  </h1>
                  <div className="mx-auto my-5 w-2/3">
                    <CountdownTimer
                      startTime={item.startTime}
                      endTime={item.endTime}
                    />
                  </div>
                  <img src={item.image} className="py-5" alt={item.name} />
                  <div className="grid md:grid-cols-3 py-5 gap-3">
                    {paginatedMenuItems.map((menuItem) => (
                      <CusineCard
                        key={menuItem._id}
                        menu={menuItem}
                        onWarningClick={() => handleWarningClick(menuItem)}
                      />
                    ))}
                  </div>
                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center my-5">
                      <button
                        onClick={handlePrevPage}
                        className={`px-4 py-2 mx-1 border rounded ${
                          currentPage === 1
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-warm text-lime"
                        }`}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
  
                      {Array.from({ length: totalPages }, (_, index) => (
                        <button
                          key={index + 1}
                          onClick={() => setCurrentPage(index + 1)}
                          className={`px-4 py-2 mx-1 border rounded ${
                            currentPage === index + 1
                              ? "bg-lime text-warm"
                              : "bg-warm text-lime"
                          }`}
                        >
                          {index + 1}
                        </button>
                      ))}
  
                      <button
                        onClick={() => handleNextPage(totalPages)}
                        className={`px-4 py-2 mx-1 border rounded ${
                          currentPage === totalPages
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-warm text-lime"
                        }`}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </>
           {UpComingOfferData && (
            <div className=" py-5 mx-10">
              <h1 className=" py-2 text-center font-bold font-merriweather text-28 ">Upcoming offers for you</h1>
              <hr className="border-2 mx-32 border-lime "/>
              {UpComingOfferData.map((item) => (
                <div key={item._id} className=" py-5">
                  <div className="py-5 md:mx-32 mx-10">
                     <CountdownTimer
                          startTime={item.startTime}
                          endTime={item.endTime}
                        />
                  </div>
                  <img src={item.image} alt={item.name} />
                </div>
              ))}
            </div>
          )}
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
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Offer;
