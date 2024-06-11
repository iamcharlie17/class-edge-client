import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../layouts/MainLayouts";
import Home from "../Pages/HomePage/Home/Home";
import Login from "../Pages/LoginRegister/Login";
import Register from "../Pages/LoginRegister/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import StudentProfile from "../Pages/Dashboard/Student/StudentProfile/StudentProfile";
import MyEnrollClass from "../Pages/Dashboard/Student/MyEnrollClass/MyEnrollClass";
import AdminProfile from "../Pages/Dashboard/Admin/AdminProfile/AdminProfile";
import TeacherRequest from "../Pages/Dashboard/Admin/TeacherRequest/TeacherRequest";
import AllUsers from "../Pages/Dashboard/Admin/AllUsers/AllUsers";
import TeacherProfile from "../Pages/Dashboard/Teacher/TeacherProfile/TeacherProfile";
import AddClass from "../Pages/Dashboard/Teacher/TeacherProfile/AddClass/AddClass";
import MyClass from "../Pages/Dashboard/Teacher/MyClass/MyClass";
import Classes from "../Pages/AllClasses/Classes";
import AllClasses from "../Pages/Dashboard/Admin/AllClasses/AllClasses";

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
        path: "/classes",
        element: <Classes/>
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
      },
      //teacher
      {
        path: '/dashboard/teacher',
        element: <TeacherProfile/>
      },
      {
        path: '/dashboard/add-class',
        element: <AddClass/>
      },
      {
        path: '/dashboard/my-classes',
        element: <MyClass/>
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
