import PropTypes from "prop-types";

const CusineCard = ({ menu }) => {
  const { image, name, details, offer, price, offerPrice } = menu;

  return (
    <>
      <div className="bg-white shadow-lg w-72 mx-auto  rounded-lg overflow-hidden hover:shadow-limeGreen">
        <img src={image} alt={name} className="w-full p-2" />
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2">{name}</h3>
          <p className="text-gray-700">{details}</p>
          <p className="text-gray-900 font-semibold mt-2">
            ${offer ? offerPrice : price}
          </p>
          {offer && <p className="text-red-500 line-through">${price}</p>}
        </div>
      </div>
    </>
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
  }).isRequired,
};
export default CusineCard;
