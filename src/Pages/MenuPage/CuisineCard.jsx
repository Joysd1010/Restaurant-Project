import PropTypes from "prop-types";
import { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa"; // Rating stars
import { MdReviews } from "react-icons/md"; // Review icon
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../api/axiosInstance";

// CusineCard Component
const CusineCard = ({ menu, onWarningClick }) => {
  const { _id, image, name, promotionalLine, offer, price, offerPrice, reviews } = menu;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewerName, setReviewerName] = useState("");
  const [reviewImage, setReviewImage] = useState(null); // State for review image

  const totalReviews = reviews ? reviews.length : 0;
  const averageRating = totalReviews > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
    : 0;

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Handle form submission
  const handleReviewSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", reviewerName);
      formData.append("rating", rating);
      formData.append("comment", reviewText);
      if (reviewImage) formData.append("file", reviewImage); // Append image if exists
      console.log(formData,"form")

      await axiosInstance.post(`/reviews/${_id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Review submitted successfully!");
      toggleModal(); // Close modal after submission
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review.");
    }
  };

  return (
    <div className="bg-white shadow-lg max-w-72 mx-auto overflow-hidden hover:shadow-limeGreen duration-300">
      <img src={image} alt={name} className=" max-h-60 object-cover p-2" />
      {offer && (
        <div className="bg-red-700 border2 rotate-45 bottom-44 left-24 relative text-center text-white font-merriweather text-18">
          Offer
        </div>
      )}
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="text-gray-700">{promotionalLine}</p>
        <div className="flex justify-between items-center py-3">
          <div className="flex flex-col gap-y-4">
            <p className="text-gray-900 font-semibold mt-2">
              ${offer ? offerPrice : price}
            </p>
            {offer && <p className="text-red-500 line-through">${price}</p>}
            <div className="flex flex-col gap-y-4 items-center">
              <div className="flex">
                {Array.from({ length: 5 }, (_, index) => (
                  <span key={index}>
                    {index < averageRating ? (
                      <FaStar className="text-yellow-500" />
                    ) : (
                      <FaRegStar className="text-yellow-500" />
                    )}
                  </span>
                ))}
              </div>
              <span className="ml-2 text-gray-600">({totalReviews} reviews)</span>
            </div>
          </div>
          <button className="btn btn-outline hover:bg-olive hover:text-white" onClick={onWarningClick}>
            See Details
          </button>
        </div>
        <div className="flex justify-end">
          <button onClick={toggleModal}>
            <MdReviews className="text-blue-500" size={24} />
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <div className="w-96 h-auto bg-white rounded-md shadow-md p-4">
            <h2 className="text-xl font-bold mb-4">Submit Your Review</h2>
            <input
              type="text"
              className="w-full bg-white p-2 border rounded mb-4"
              value={reviewerName}
              onChange={(e) => setReviewerName(e.target.value)}
              placeholder="Your name"
            />
            <textarea
              className="w-full bg-white p-2 border rounded mb-4"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review here..."
            ></textarea>
            <div className="flex items-center mb-4">
              <span className="mr-2">Rating:</span>
              {Array.from({ length: 5 }, (_, index) => (
                <span key={index} onClick={() => setRating(index + 1)}>
                  {index < rating ? (
                    <FaStar className="text-yellow-500 cursor-pointer" />
                  ) : (
                    <FaRegStar className="text-gray-300 cursor-pointer" />
                  )}
                </span>
              ))}
            </div>
            <input
              type="file"
              className="w-full p-2 border rounded mb-4"
              onChange={(e) => setReviewImage(e.target.files[0])}
              accept="image/*"
            />
            <div className="flex justify-end">
              <button className="btn bg-olive text-white hover:bg-limeGreen" onClick={handleReviewSubmit}>
                Submit Review
              </button>
              <button className="btn btn-secondary ml-2" onClick={toggleModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

CusineCard.propTypes = {
  menu: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    promotionalLine: PropTypes.string,
    offer: PropTypes.bool,
    price: PropTypes.number.isRequired,
    offerPrice: PropTypes.number,
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        rating: PropTypes.number.isRequired,
        comment: PropTypes.string,
        name: PropTypes.string,
        image: PropTypes.string,

      })
    ).isRequired,
  }).isRequired,
  onWarningClick: PropTypes.func.isRequired,
};

export default CusineCard;
