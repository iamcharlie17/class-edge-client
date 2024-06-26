import { ImBooks } from "react-icons/im";
import { NavLink } from "react-router-dom";
import { FaChalkboardTeacher, FaUsers } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";

const AdminSideBar = () => {
  return (
    <div>
      <div className="mb-12">
        <li>
          <NavLink to={"/dashboard/admin"}>
            <FaRegCircleUser size={25} /> PROFILE
          </NavLink>
        </li>
        <li>
          <NavLink to={"/dashboard/teacher-requests"} end>
            <FaChalkboardTeacher size={25} /> TEACHER REQUEST
          </NavLink>
        </li>
        <li>
          <NavLink to={"/dashboard/all-users"}>
            <FaUsers size={25} />ALL USERS
          </NavLink>
        </li>
        <li>
          <NavLink to={"/dashboard/all-classes"}>
            <ImBooks size={25} /> ALL CLASSES
          </NavLink>
        </li>
      </div>
    </div>
  );
};

export default AdminSideBar;
