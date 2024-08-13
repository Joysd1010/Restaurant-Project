import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Homepage from "../../Pages/Home/Homepage";
import Offer from "../../Pages/OfferPage/Offer";
import AboutUs from "../../Pages/AboutUs/AboutUs";
import Contact from "../../Pages/ContactUs/Contact";
import MenuByCategory from "../../Pages/MenuPage/MenuByCategory";
// import MenuByCategory from "../../Pages/MenuPage/MenuByCategory";

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
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/offer",
        element: <Offer />,
      },
      {
        path: "/menu/:category",
        element: <MenuByCategory />,
      },
    ],
  },
]);

export default Router;
