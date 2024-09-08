import { useEffect, useState } from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import axiosInstance from "../../../api/axiosInstance";
import 'react-toastify/dist/ReactToastify.css';

const UpdateAbout = () => {
  const [aboutData, setAboutData] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  
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

  
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!editingItem) return;

    try {
      await axiosInstance.put(`/about/${editingItem._id}`, editingItem);
      setAboutData(aboutData.map(item => (item._id === editingItem._id ? editingItem : item)));
      toast.success("Entry updated successfully");
      setEditingItem(null);
    } catch (error) {
      toast.error("Failed to update entry");
      console.error("Error updating entry:", error);
    }
  };

 
  const handleInputChange = (e, chefIndex) => {
    const { name, value } = e.target;

    if (chefIndex !== undefined) {
      const updatedChefs = [...editingItem.chefProfiles];
      updatedChefs[chefIndex][name] = value;
      setEditingItem({ ...editingItem, chefProfiles: updatedChefs });
    } else {
      setEditingItem({ ...editingItem, [name]: value });
    }
  };

  
  const handleEditClick = (item) => {
    setEditingItem({ ...item });
  };

  return (
    <div className="py-10 px-5 md:px-20 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Update About Section</h1>
      <div className="border-b-4 border-limeGreen w-24 mx-auto mb-10"></div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {Array.isArray(aboutData) && aboutData.length > 0 ? (
          aboutData.map((item) => (
            <div key={item._id} className="border border-gray-300 shadow-lg p-6 rounded-lg bg-white">
              <form onSubmit={handleUpdate}>
                <div className="flex justify-center items-center mb-4">
                  <FaQuoteLeft className="text-limeGreen text-3xl mr-2" />
                  <textarea
                    name="story"
                    value={editingItem?._id === item._id ? editingItem.story : item.story}
                    onChange={(e) => handleInputChange(e)}
                    rows="3"
                    className="w-full p-2 border border-gray-300 rounded-lg bg-white"
                    placeholder="Update story..."
                    disabled={editingItem?._id !== item._id}
                  />
                  <FaQuoteRight className="text-limeGreen text-3xl ml-2" />
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-6">
                  {item.chefProfiles.map((chef, index) => (
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
                        <input
                          type="text"
                          name="name"
                          value={editingItem?._id === item._id ? editingItem.chefProfiles[index].name : chef.name}
                          onChange={(e) => handleInputChange(e, index)}
                          className="w-full p-2 border border-gray-300 rounded-lg bg-white"
                          placeholder="Chef's name"
                          disabled={editingItem?._id !== item._id}
                        />
                        <textarea
                          name="specialty"
                          value={editingItem?._id === item._id ? editingItem.chefProfiles[index].specialty : chef.specialty}
                          onChange={(e) => handleInputChange(e, index)}
                          rows="2"
                          className="w-full p-2 border border-gray-300 rounded-lg mt-2 bg-white"
                          placeholder="Chef's specialty"
                          disabled={editingItem?._id !== item._id}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {editingItem?._id === item._id ? (
                  <button
                    type="submit"
                    className="mt-6 py-2 px-4 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors duration-300 w-full"
                  >
                    Save
                  </button>
                ) : (
                  <div
                    onClick={() => handleEditClick(item)}
                    className="mt-6 py-2 px-4 bg-oliveGreen flex justify-center items-center text-white font-bold rounded-lg hover:bg-lime transition-colors duration-300 w-full"
                  >
                    Edit
                  </div>
                )}
              </form>
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

export default UpdateAbout;
