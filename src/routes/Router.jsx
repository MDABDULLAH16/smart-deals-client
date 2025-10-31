import { createBrowserRouter } from "react-router";
import Root from "../layout/Root";
import Home from "../pages/Home/Home";
import AllProducts from "../pages/AllProducts/AllProducts";
import Login from "../pages/Login/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "/allProducts", Component: AllProducts },
      { path: "/login", Component: Login },
    ],
  },
]);
