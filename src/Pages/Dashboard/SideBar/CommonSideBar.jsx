import { ImBooks } from "react-icons/im";
import { IoMdHome } from "react-icons/io";
import { NavLink } from "react-router-dom";

const CommonSideBar = () => {
  return (
    <div className="pt-12 ">
      <li>
        <NavLink to={"/"}>
          <IoMdHome size={25} /> HOME
        </NavLink>
      </li>
      <li>
        <NavLink to={"/classes"}>
          <ImBooks size={25} /> ClASSES
        </NavLink>
      </li>
      <li>
        <NavLink to={"/"} className={'text-4xl font-bold block lg:hidden border-t-2 mt-12'}>ClassEdge</NavLink>
      </li>
    </div>
  );
};

export default CommonSideBar;
