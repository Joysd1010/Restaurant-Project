import PropTypes from "prop-types";

const CusineCard = ({ menu, onWarningClick }) => {
  const { image, name, promotionalLine, offer, price, offerPrice } = menu;
 
  return (
    <div className="bg-white shadow-lg w-72 mx-auto rounded-lg overflow-hidden hover:shadow-limeGreen duration-300">
      <img src={image} alt={name} className="w-full p-2" />
     {offer&& <div className="bg-red-700 border2 rotate-45 bottom-52 left-20 relative text-center text-white  font-merriweather text-18">
        offer
      </div>}
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="text-gray-700">{promotionalLine}</p>
        <div className=" flex justify-between items-center py-3">
          <div>
            <p className="text-gray-900 font-semibold mt-2">
              ${offer ? offerPrice : price}
            </p>
            {offer && <p className="text-red-500 line-through">${price}</p>}
          </div>
          <button
            className="btn btn-outline btn-warning "
            onClick={onWarningClick}
          >
            See Details
          </button>
        </div>
      </div>
    </div>
  );
};

CusineCard.propTypes = {
  menu: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    details: PropTypes.string,
    offer: PropTypes.bool,
    price: PropTypes.number.isRequired,
    offerPrice: PropTypes.number,
    promotionalLine:PropTypes.string
  }).isRequired,
  onWarningClick: PropTypes.func.isRequired,
};

export default CusineCard;
