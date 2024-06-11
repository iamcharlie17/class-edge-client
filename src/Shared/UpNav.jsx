import { NavLink } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { IoLockOpenOutline } from "react-icons/io5";
import { CiShare2 } from "react-icons/ci";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaPinterestP } from "react-icons/fa";
import { CiInstagram } from "react-icons/ci";

const UpNav = () => {
  return (
    <div className=" min-h-12 px-2 py-2 md:px-16 lg:px-24 flex flex-col gap-4 md:gap-0 md:flex-row items-center justify-between bg-[#49c3af]">
      <div className=" text-white uppercase flex items-center text-sm gap-2 ">
        <CiShare2 size={20} />
        <p>Our social</p>
        <FaFacebookF />
        <FaTwitter />
        <FaLinkedinIn />
        <FaPinterestP />
        <CiInstagram />
      </div>
      <div className="">
        <ul className="flex gap-2 md:gap-6 px-1">
          <li className="flex items-center gap-2 text-white">
            <CiUser size={20} />
            <NavLink className={"uppercase text-sm text-white"} to={"/login"}>
              Login
            </NavLink>
          </li>
          <li>
            <p className="text-yellow-800">|</p>
          </li>
          <li className="flex items-center gap-2 text-white">
            <IoLockOpenOutline size={20} />
            <NavLink
              className={"uppercase text-sm text-white"}
              to={"/register"}
            >
              Register
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UpNav;
