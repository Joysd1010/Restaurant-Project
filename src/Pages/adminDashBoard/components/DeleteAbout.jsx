import { useEffect, useState } from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import axiosInstance from "../../../api/axiosInstance";
import 'react-toastify/dist/ReactToastify.css';

const DeleteAbout = () => {
  const [aboutData, setAboutData] = useState([]);

  // Fetch data from the /about endpoint
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/about");
        setAboutData(response.data);
      } catch (error) {
        toast.error("Failed to fetch about data");
        console.error("Error fetching about data:", error);
      }
    };
    fetchData();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/about/${id}`);
      setAboutData(aboutData.filter(item => item._id !== id));
      toast.success("Entry deleted successfully");
    } catch (error) {
      toast.error("Failed to delete entry");
      console.error("Error deleting entry:", error);
    }
  };

  return (
    <div className="py-10 px-5 md:px-20 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Manage About Section</h1>
      <div className="border-b-4 border-limeGreen w-24 mx-auto mb-10"></div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {Array.isArray(aboutData) && aboutData.length > 0 ? (
          aboutData.map((item) => (
            <div key={item._id} className="border border-gray-300 shadow-lg p-6 rounded-lg bg-white">
                <FaQuoteLeft size={15} className="text-limeGreen text-3xl mr-2" />
              <div className=" mb-4 overflow-y-auto py-5 h-36">
                <p className="font-serif text-lg text-gray-700">{item.story}</p>
              </div>
                <FaQuoteRight size={15} className="text-limeGreen text-3xl ml-2" />

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-6">
                {item.chefProfiles.map((chef) => (
                  <div
                    key={chef._id}
                    className="relative group overflow-hidden rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="overflow-hidden">
                      <img
                        src={chef.image}
                        className="h-56 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        alt={chef.name}
                      />
                    </div>
                    <div className="p-4">
                      <h2 className="text-xl text-limeGreen font-semibold">{chef.name}</h2>
                      <p className="text-gray-600">{chef.specialty}</p>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-limeGreen scale-x-0 group-hover:scale-x-100 transform transition-transform duration-500"></div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleDelete(item._id)}
                className="mt-6 py-2 px-4 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors duration-300 w-full"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No data available</p>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default DeleteAbout;
