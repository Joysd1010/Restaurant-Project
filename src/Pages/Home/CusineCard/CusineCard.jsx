import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const CusineCard = () => {
  const navigate = useNavigate();

  const items = [
    {
      id: 1,
      name: "Summer Special",
      promoLine: "Cool down with our refreshing drinks",
      link: "summer-special",
      img: "https://m.media-amazon.com/images/I/51Et1+Z47VL._AC_UF1000,1000_QL80_.jpg",
      category: "Drinks",
    },
    {
      id: 2,
      name: "Burger Fiesta",
      promoLine: "Taste the best burgers in town",
      link: "burger-fiesta",
      img: "https://image.made-in-china.com/2f0j00YGeqsjKEfLbJ/New-Arrival-5-off-Brand-Restaurant-Platos-Black-Matte-Dinner-Plates-Catering-Black-Plate-Event-Buffet-Dishes.jpg",
      category: "Food",
    },
    {
      id: 3,
      name: "Dessert Delight",
      promoLine: "Indulge in our sweet treats",
      link: "dessert-delight",
      img: "https://static.wixstatic.com/media/5c2e5c_2c73e90eaec94217a56955eed21bdf71~mv2.jpg/v1/fill/w_720,h_720,al_c,lg_1,q_85/5c2e5c_2c73e90eaec94217a56955eed21bdf71~mv2.jpg",
      category: "Desserts",
    },
    {
      id: 4,
      name: "Pasta Perfection",
      promoLine: "Experience the authentic Italian pasta",
      link: "pasta-perfection",
      img: "https://img.freepik.com/free-photo/pasta-plate_144627-33670.jpg",
      category: "Food",
    },
    {
      id: 5,
      name: "Pizza Party",
      promoLine: "Enjoy the best pizzas in town",
      link: "pizza-party",
      img: "https://img.freepik.com/free-photo/mixed-pizza-with-various-ingridients_140725-3792.jpg",
      category: "Food",
    },
    {
      id: 6,
      name: "Salad Sensation",
      promoLine: "Fresh and healthy salads for every taste",
      link: "salad-sensation",
      img: "https://img.freepik.com/free-photo/caesar-salad-with-chicken-breast-wooden-table_123827-22057.jpg",
      category: "Food",
    },
  ];
  const handleSeeMenuClick = (category) => {
     console.log(category)
    navigate(`/menu/${category}`);
  };


  return (
    <>
      {items.map((curElem, index) => {
        return (
          <div
            className="group px-5 relative h-72 bg-cover bg-center shadow-inner shadow-yellow-400"
            key={index}
            style={{ backgroundImage: `url(${curElem.img})` }}
          >
            <div className="absolute inset-0 bg-black opacity-30 group-hover:bg-limeGreen group-hover:opacity-70 group-hover:transition-opacity group-hover:duration-1000"></div>
            <h1 className="relative text-[20px] font-bold text-warm z-10 pt-10 group-hover:text-Charcoal pb-5">
              {curElem.name}
            </h1>
            <p className="opacity-0 group-hover:opacity-100 transition-opacity font-merriweather duration-500 text-warm text-[16px] relative z-10">
              {curElem.promoLine}
            </p>
            <div
              // to={curElem.link}
              className="absolute z-10 top-52 group-hover:shadow-2xl shadow-black bg-warm p-3 rounded-md font-bold right-36"
              onClick={()=>{
                handleSeeMenuClick(curElem.category)
              }}
            >
              See Menu
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CusineCard;
