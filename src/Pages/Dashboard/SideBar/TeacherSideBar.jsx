
import { FaRegCircleUser } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { MdPlaylistAddCircle } from "react-icons/md";
import { ImBooks } from "react-icons/im";

const TeacherSideBar = () => {
    return (
        <div className="mb-12">
      <li>
        <NavLink to={"/dashboard/student"} end>
          <FaRegCircleUser size={25} /> PROFILE
        </NavLink>
      </li>
      <li>
        <NavLink to={"/dashboard/add-class"} end>
          <MdPlaylistAddCircle size={25} /> ADD CLASS
        </NavLink>
      </li>
      <li>
        <NavLink to={"/dashboard/my-classes"}>
          <ImBooks size={25} /> MY CLASS
        </NavLink>
      </li>
    </div>
    );
};

export default TeacherSideBar;