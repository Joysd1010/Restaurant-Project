import { Link } from "react-router-dom";

const CusineCard = ({ item }) => {
  const { name, promoLine, link, img } = item; // Destructure properties from item
console.log(img)
  return (
    <div className={`group px-5 relative bg-[url('${img}')] h-72 bg-cover bg-center shadow-inner shadow-yellow-400`}>
      <div className="absolute inset-0 bg-black opacity-30 group-hover:bg-limeGreen group-hover:opacity-90 transition-opacity duration-500"></div>
      <h1 className="relative text-[20px] font-bold text-warm z-10 pt-10 group-hover:text-Charcoal pb-5">
        {name}
      </h1>
      <p className="opacity-0 group-hover:opacity-100 transition-opacity font-merriweather duration-500 text-warm text-[16px] relative z-10">
        {promoLine}
      </p>
      <Link to={link} className="absolute z-10 top-52 group-hover:shadow-2xl shadow-black bg-warm p-3 rounded-md font-bold right-36">
        See Menu
      </Link>
    </div>
  );
};

export default CusineCard;
