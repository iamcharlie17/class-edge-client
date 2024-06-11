import { GiHamburgerMenu } from "react-icons/gi";
import useRole from "../../../Hooks/useRole";
import StudentSideBar from "./StudentSideBar";
import AdminSideBar from "./AdminSideBar";
import TeacherSideBar from "./TeacherSideBar";
import CommonSideBar from "./CommonSideBar";

const Sidebar = () => {
  const [role, isLoading] = useRole();
  // console.log(role)

  const sideLink = (
    <div className="space-y-1">
      {role === "student" && <StudentSideBar />}
      {role === "admin" && <AdminSideBar />}
      {role === "teacher" && <TeacherSideBar />}
      <hr />
      <CommonSideBar />
    </div>
  );

  if (isLoading) return <h1>Please wait a moment</h1>;
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center fixed  justify-center">
        {/* Page content here */}
        <label htmlFor="my-drawer-2" className="drawer-button  lg:hidden">
          <GiHamburgerMenu size={30} />
        </label>
      </div>
      <div className="drawer-side min-h-screen lg:bg-[#49c3af] z-10 lg:pt-12">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="">
          <h1 className="text-4xl text-center border-b py-8 font-bold">
            ClassEdge
          </h1>
        </div>

        <ul className="menu p-4 w-80 bg-[#49c3af] min-h-full ">
          {/* Sidebar content here */}
          {sideLink}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
