import { Link, NavLink, useNavigate } from "react-router-dom";
// import { FaRegCircleUser } from "react-icons/fa6";
import logo from "../assets/logo/logo.png";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";

const DownNav = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const navItems = (
    <>
      <li>
        <NavLink className={"uppercase"} to={"/"}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink className={"uppercase"} to={"/all-classes"}>
          All Classes
        </NavLink>
      </li>
      <li>
        <NavLink className={"uppercase"} to={"/teach-on-classedge"}>
          Teach On ClassEdge
        </NavLink>
      </li>
      {user && (
        <li>
          <button
            onClick={() => {
              logOut()
                .then(() => {
                  toast.success("Logout success");
                  navigate("/");
                })
            }}
          >
            LogOut
          </button>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-white px-2 md:px-24">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content items-center mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navItems}
          </ul>
        </div>
        <div className="flex items-center relative">
          <img src={logo} className="w-16" alt="" />
          <Link to={"/"} className="btn btn-ghost text-xl absolute left-8">
            ClassEdge
          </Link>
        </div>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal items-center px-1">{navItems}</ul>
      </div>
    </div>
  );
};

export default DownNav;
