import { FaCalendarAlt } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const StudentSideBar = () => {
  return (
    <div className="mb-12">
      <li>
        <NavLink to={"/dashboard/student"} end>
          <FaRegCircleUser size={25} /> PROFILE
        </NavLink>
      </li>
      <li>
        <NavLink to={"/dashboard/my-enroll-class"}>
          <FaCalendarAlt size={25} /> MY ENROLL CLASS
        </NavLink>
      </li>
    </div>
  );
};

export default StudentSideBar;
