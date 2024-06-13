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
import AllClasses from "../Pages/Dashboard/Admin/AllClasses/AllClasses";
import Classes from "../Pages/Classes/Classes";
import ClassDetails from "../components/ClassDetails/ClassDetails";
import TeachOnClassEdge from "../Pages/TeachOnClassEdge/TeachOnClassEdge";
import PrivateRoute from "./PrivateRoute";
import AllTeachers from "../Pages/AllTeachers/AllTeachers";
import MyClassDetails from "../Pages/Dashboard/Teacher/MyClassDetails/MyClassDetails";
import UpdateMyClass from "../Pages/Dashboard/Teacher/UpdateMyClass/UpdateMyClass";
import AssigmentPage from "../Pages/Dashboard/Student/MyEnrollClass/AssigmentPage";
import FeedBacksOfClass from "../Pages/Dashboard/Admin/AllClasses/FeedBacksOfClass";
import AdminRoute from "./AdminRoute";

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
        element: <Classes />,
      },
      {
        path: "/class/:id",
        element: (
          <PrivateRoute>
            <ClassDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/teach-on-classedge",
        element: (
          <PrivateRoute>
            <TeachOnClassEdge />
          </PrivateRoute>
        ),
      },
      {
        path: "/all-teachers",
        element: (
          <PrivateRoute>
            <AllTeachers />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <AdminRoute>
        <DashboardLayout />
      </AdminRoute>
    ),
    children: [
      //student--
      {
        path: "/dashboard/student",
        element: (
          <AdminRoute>
            <StudentProfile />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/my-enroll-class",
        element: (
          <AdminRoute>
            <MyEnrollClass />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/my-enroll-class/:id",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AssigmentPage />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      //admin
      {
        path: "/dashboard/admin",
        element: (
          <AdminRoute>
            <AdminProfile />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/teacher-requests",
        element: (
          <AdminRoute>
            <TeacherRequest />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/all-users",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/all-classes",
        element: (
          <AdminRoute>
            <AllClasses />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/class/:id",
        element: (
          <AdminRoute>
            <FeedBacksOfClass />
          </AdminRoute>
        ),
      },
      //teacher
      {
        path: "/dashboard/teacher",
        element: (
          <AdminRoute>
            <TeacherProfile />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/add-class",
        element: (
          <AdminRoute>
            <AddClass />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/update-class/:id",
        element: (
          <AdminRoute>
            <UpdateMyClass />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/my-classes",
        element: (
          <AdminRoute>
            <MyClass />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/my-class-details/:id",
        element: (
          <AdminRoute>
            <MyClassDetails />
          </AdminRoute>
        ),
      },
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
