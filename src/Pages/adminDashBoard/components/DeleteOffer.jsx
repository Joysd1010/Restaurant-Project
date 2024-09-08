import { useState, useEffect } from "react";
import CountdownTimer from "../../OfferPage/CountdownTime"; 
import CusineCard from "../../MenuPage/CuisineCard";

import { ToastContainer, toast } from "react-toastify";
import axiosInstance from "../../../api/axiosInstance";

const DeleteOffer = () => {
  const [offerData, setOfferData] = useState([]);
  const [runningOfferData, setRunning] = useState([]);
  const [upcomingOfferData, setUpcoming] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [selectedOfferId, setSelectedOfferId] = useState(null);
  const getOffer = async () => {
    try {
      const response = await axiosInstance.get("/offer");
  
      const now = new Date();
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
    } catch (error) {
      console.error("Error fetching offer data:", error);
    }
  };
  
  useEffect(() => {
    
    getOffer()
  }, []);

  const handleDelete = async () => {
    try {
      if (selectedOfferId) {
        await axiosInstance.delete(`/offer`, {
          params: { id: selectedOfferId },
        });
        toast.success("Offer deleted successfully!");
        setOfferData((prevOffers) =>
          prevOffers.filter((offer) => offer._id !== selectedOfferId)
        );
       
        getOffer()
        document.getElementById("delete_modal").close();
      }
    } catch (error) {
      toast.error("Failed to delete offer");
      console.error("Error deleting offer:", error);
    }
    document.getElementById("delete_modal").close();
  };

  const handleDeleteClick = (offerId) => {
    setSelectedOfferId(offerId);
    document.getElementById("delete_modal").showModal();
  };

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
          {runningOfferData.map((item) => {
            const paginatedMenuItems = paginate(item.menuItems);
            const totalPages = Math.ceil(item.menuItems.length / itemsPerPage);

            return (
              <div className="mx-10" key={item._id}>
                <div className="grid grid-cols-4 gap-6 items-center">
                  <h1 className="rounded col-span-3 py-2 text-center hover border-2 hover:text-lime hover:bg-warm border-lime duration-300 my-2 text-white font-bold font-merriweather text-28 bg-lime">
                    {item.name}
                  </h1>
                  <button
                    className="btn btn-error"
                    onClick={() => handleDeleteClick(item._id)}
                  >
                    Delete
                  </button>
                </div>
                <div className="mx-auto my-5 w-2/3">
                  <CountdownTimer
                    startTime={item.startTime}
                    endTime={item.endTime}
                  />
                </div>
                <img src={item.image} className="py-5" alt={item.name} />
                <div className="grid md:grid-cols-3 py-5 gap-3">
                  {paginatedMenuItems.map((menuItem) => (
                    <div key={menuItem._id} className=" ">
                      <CusineCard
                        menu={menuItem}
                        onWarningClick={() => handleWarningClick(menuItem)}
                      />
                    </div>
                  ))}
                </div>
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
                            ? "bg-lime text-white"
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

          {upcomingOfferData.length > 0 && (
            <div className="py-5 mx-10">
              <h1 className="py-2 text-center font-bold font-merriweather text-28">
                Upcoming offers
              </h1>
              <hr className="border-2 mx-32 border-lime" />
              {upcomingOfferData.map((item) => (
                <div key={item._id} className="py-5">
                  <div className="py-5 grid grid-cols-4 gap-6 md:mx-32 mx-10">
                   <div className=" col-span-3">
                      <CountdownTimer
                        startTime={item.startTime}
                        endTime={item.endTime}
                      />
                   </div>
                     <button
                    className="btn btn-error"
                    onClick={() => handleDeleteClick(item._id)}
                  >
                    Delete
                  </button>
                  </div>
                  <img src={item.image} alt={item.name} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modal for deleting offer */}
      <dialog id="delete_modal" className="modal">
        <form method="dialog" className="modal-box bg-white">
          <h3 className="text-lg font-bold">Confirm Delete</h3>
          <p className="py-4">Are you sure you want to delete this offer?</p>
          <div className="modal-action">
            <button
              type="button"
              className="btn btn-error"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              type="button"
              className="btn bg-green-700 text-white border-none"
              onClick={() => document.getElementById("delete_modal").close()}
            >
              Cancel
            </button>
          </div>
        </form>
      </dialog>

      <ToastContainer />
    </div>
  );
};

export default DeleteOffer;
