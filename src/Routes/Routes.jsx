import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayouts from "../layouts/MainLayouts";
import Home from "../Pages/HomePage/Home/Home";
import Login from "../Pages/LoginRegister/Login";
import Register from "../Pages/LoginRegister/Register";

 export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayouts/>,
      children: [
        {
            path: '/',
            element: <Home/>
        }
      ]
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: "/register",
        element: <Register/>
    }
  ]);