import PropTypes from "prop-types";

const CusineCard = ({ menu }) => {
  const { image, name, details, offer, price, offerPrice } = menu;

  return (
    <>
      <div className="bg-white shadow-lg w-72 mx-auto  rounded-lg overflow-hidden hover:shadow-limeGreen duration-300">
        <img src={image} alt={name} className="w-full p-2" />
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2">{name}</h3>
          <p className="text-gray-700">{details}</p>
         <div className=" flex justify-between items-center
         ">
            <div>
              <p className="text-gray-900 font-semibold mt-2">
                ${offer ? offerPrice : price}
              </p>
              {offer && <p className="text-red-500 line-through">${price}</p>}
            </div>
            <button
              className="btn btn-outline btn-warning "
              onClick={() => console.log(name)}
            >
              Warning
            </button>
         </div>
        </div>
      </div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">{name}</h3>
          <p className="py-4">Press ESC key or click on ✕ button to close</p>
        </div>
      </dialog>
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
