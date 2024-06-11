import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../layouts/MainLayouts";
import Home from "../Pages/HomePage/Home/Home";
import Login from "../Pages/LoginRegister/Login";
import Register from "../Pages/LoginRegister/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import StudentProfile from "../Pages/Dashboard/Student/StudentProfile/StudentProfile";
import AllClasses from "../Pages/AllClasses/AllClasses";
import MyEnrollClass from "../Pages/Dashboard/Student/MyEnrollClass/MyEnrollClass";
import AdminProfile from "../Pages/Dashboard/Admin/AdminProfile/AdminProfile";
import TeacherRequest from "../Pages/Dashboard/Admin/TeacherRequest/TeacherRequest";
import AllUsers from "../Pages/Dashboard/Admin/AllUsers/AllUsers";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/all-classes",
        element: <AllClasses />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      //student--
      {
        path: "/dashboard/student",
        element: <StudentProfile />,
      },
      {
        path: "/dashboard/my-enroll-class",
        element: <MyEnrollClass />,
      },
      //admin
      {
        path: "/dashboard/admin",
        element: <AdminProfile />,
      },
      {
        path: "/dashboard/teacher-requests",
        element: <TeacherRequest />,
      },
      {
        path: "/dashboard/all-users",
        element: <AllUsers />,
      },
      {
        path: '/dashboard/all-classes',
        element: <AllClasses/>
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
