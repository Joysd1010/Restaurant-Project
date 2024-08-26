import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Homepage from "../../Pages/Home/Homepage";
import Offer from "../../Pages/OfferPage/Offer";
import AboutUs from "../../Pages/AboutUs/AboutUs";
import MenuByCategory from "../../Pages/MenuPage/MenuByCategory";
import Error from "../../Pages/ErrorPage/Error";
import Reservation from "../../Pages/Reservation/Reservation";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/offer",
        element: <Offer />,
      },
      {
        path: "/menu",
        element: <MenuByCategory />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },

      {
        path: "/offer",
        element: <Offer />,
      },
      {
        path: "/menu/:category",
        element: <MenuByCategory />,
      },
      {
        path: "reserve",
        element: <Reservation />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);

export default Router;
