import { createBrowserRouter } from "react-router";
import Root from "../layout/Root";
import Home from "../pages/Home/Home";
import AllProducts from "../pages/AllProducts/AllProducts";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import MyProducts from "../pages/MyProducts/MyProducts";
import MyBids from "../pages/MyBids/MyBids";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "/allProducts", Component: AllProducts },
      {
        path: 'myProducts', element: <PrivateRoute>
        <MyProducts></MyProducts>
      </PrivateRoute>},
      {
        path: 'myBids', element: <PrivateRoute>
        <MyBids></MyBids>
      </PrivateRoute>},
      { path: "/login", Component: Login },
      { path: "/register", Component: Register },
    ],
  },
]);
