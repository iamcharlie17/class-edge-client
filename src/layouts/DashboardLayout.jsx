import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import Sidebar from "../Pages/Dashboard/SideBar/Sidebar";

const DashboardLayout = () => {
  return (
    <div>
      <Helmet>
        <title>ClassEdge | Dashboard</title>
      </Helmet>
      <div className="grid lg:grid-cols-4">
        <Sidebar />
        <div className="col-span-3 bg-green-50 p-4 md:p-12 lg:pt-2 min-h-screen">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
