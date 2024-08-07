import CusineCard from "./CusineCard/CusineCard";

const Cusine = () => {
  const menu = [
    {
      id: 1,
      name: "Summer Special",
      promoLine: "Cool down with our refreshing drinks",
      link: "https://example.com/summer-special",
      items: [
        {
          id: 101,
          name: "Mango Smoothie",
          description: "A delicious and refreshing mango smoothie",
          price: 4.99,
        },
        {
          id: 102,
          name: "Iced Lemon Tea",
          description: "A chilled and tangy lemon tea",
          price: 2.99,
        },
      ],
      img: "https://m.media-amazon.com/images/I/51Et1+Z47VL._AC_UF1000,1000_QL80_.jpg",
      category: "Drinks",
    },
    {
      id: 2,
      name: "Burger Fiesta",
      promoLine: "Taste the best burgers in town",
      link: "https://example.com/burger-fiesta",
      items: [
        {
          id: 201,
          name: "Classic Cheeseburger",
          description: "A juicy beef patty with melted cheese",
          price: 5.99,
        },
        {
          id: 202,
          name: "Vegan Burger",
          description: "A tasty and healthy vegan option",
          price: 6.49,
        },
      ],
      img: "https://image.made-in-china.com/2f0j00YGeqsjKEfLbJ/New-Arrival-5-off-Brand-Restaurant-Platos-Black-Matte-Dinner-Plates-Catering-Black-Plate-Event-Buffet-Dishes.jpg",
      category: "Food",
    },
    {
      id: 3,
      name: "Dessert Delight",
      promoLine: "Indulge in our sweet treats",
      link: "https://example.com/dessert-delight",
      items: [
        {
          id: 301,
          name: "Chocolate Cake",
          description: "Rich and moist chocolate cake",
          price: 3.99,
        },
        {
          id: 302,
          name: "Strawberry Cheesecake",
          description: "Creamy cheesecake with strawberry topping",
          price: 4.49,
        },
      ],
      img: "https://static.wixstatic.com/media/5c2e5c_2c73e90eaec94217a56955eed21bdf71~mv2.jpg/v1/fill/w_720,h_720,al_c,lg_1,q_85/5c2e5c_2c73e90eaec94217a56955eed21bdf71~mv2.jpg",
      category: "Desserts",
    }, {
      id: 3,
      name: "Dessert Delight",
      promoLine: "Indulge in our sweet treats",
      link: "https://example.com/dessert-delight",
      items: [
        {
          id: 301,
          name: "Chocolate Cake",
          description: "Rich and moist chocolate cake",
          price: 3.99,
        },
        {
          id: 302,
          name: "Strawberry Cheesecake",
          description: "Creamy cheesecake with strawberry topping",
          price: 4.49,
        },
      ],
      img: "https://static.wixstatic.com/media/5c2e5c_2c73e90eaec94217a56955eed21bdf71~mv2.jpg/v1/fill/w_720,h_720,al_c,lg_1,q_85/5c2e5c_2c73e90eaec94217a56955eed21bdf71~mv2.jpg",
      category: "Desserts",
    },
    {
      id: 2,
      name: "Burger Fiesta",
      promoLine: "Taste the best burgers in town",
      link: "https://example.com/burger-fiesta",
      items: [
        {
          id: 201,
          name: "Classic Cheeseburger",
          description: "A juicy beef patty with melted cheese",
          price: 5.99,
        },
        {
          id: 202,
          name: "Vegan Burger",
          description: "A tasty and healthy vegan option",
          price: 6.49,
        },
      ],
      img: "https://image.made-in-china.com/2f0j00YGeqsjKEfLbJ/New-Arrival-5-off-Brand-Restaurant-Platos-Black-Matte-Dinner-Plates-Catering-Black-Plate-Event-Buffet-Dishes.jpg",
      category: "Food",
    }, {
      id: 1,
      name: "Summer Special",
      promoLine: "Cool down with our refreshing drinks",
      link: "https://example.com/summer-special",
      items: [
        {
          id: 101,
          name: "Mango Smoothie",
          description: "A delicious and refreshing mango smoothie",
          price: 4.99,
        },
        {
          id: 102,
          name: "Iced Lemon Tea",
          description: "A chilled and tangy lemon tea",
          price: 2.99,
        },
      ],
      img: "https://m.media-amazon.com/images/I/51Et1+Z47VL._AC_UF1000,1000_QL80_.jpg",
      category: "Drinks",
    },
  ];
  
  return (
    <div className="text-center pt-7 pb-5">
      <div className="group">
        <p className="font-merriweather font-extrabold text-[20px]">
          Our Services
        </p>
        <h1 className="text-[30px] font-bold text-Charcoal">
          Adventure on every plate, magic in every glass
        </h1>
        <hr className="border-2 w-3/4 mx-auto border-Charcoal group-hover:border-limeGreen group-hover:shadow-2xl shadow-yellow-400" />
      </div>
      <div className=" mx-5 grid grid-cols-1 md:grid-cols-3 gap-5 pt-5">
        {menu.map((item, index) => (
          <CusineCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Cusine;
