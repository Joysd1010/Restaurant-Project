import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Homepage from "../../Pages/Home/Homepage";
import Offer from "../../Pages/OfferPage/Offer";
import MenuByCategory from "../../Pages/Home/MenuByCategory"; 

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
        path: "/menu/:category",  
        element: <MenuByCategory />,
      },
    ],
  },
]);

export default Router;
