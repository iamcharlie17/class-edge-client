import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo/logo.png";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";
import useRole from "../Hooks/useRole";

const DownNav = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [role] = useRole();
  const navItems = (
    <>
      <li>
        <NavLink className={"uppercase"} to={"/"}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink className={"uppercase"} to={"/classes"}>
          All Classes
        </NavLink>
      </li>
      {role === "teacher"  ? (
        <li>
          <button
            className={"uppercase"}
            onClick={() => toast.success("You are already a Teacher")}
          >
            Teach On ClassEdge
          </button>
        </li>
      ) : (
        <li>
          <NavLink className={"uppercase"} to={"/teach-on-classedge"}>
            Teach On ClassEdge
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-white px-2 md:px-16 lg:px-24">
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
            className="menu menu-sm dropdown-content bg-[#49c3af] mt-3 z-[1] shadow-lg text-white  p-4 rounded-box w-72 "
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
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal items-center px-1">{navItems}</ul>
      </div>
      <div className="navbar-end">
        {user && (
          <>
            <div className="dropdown dropdown-bottom dropdown-end">
              <div tabIndex={0} role="button">
                <img src={user?.photoURL} className="h-10 w-10 md:h-12 md:w-12 border-2 border-[#4AC2AE] rounded-full object-cover object-center" alt="" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu shadow-xl space-y-4 p-8 text-white font-semibold rounded-box bg-[#49c3af] w-72"
              >
                <li>
                  <p className="uppercase shadow-lg">
                    {user?.displayName} - {role}
                  </p>
                </li>
                <li>
                  {role === "student" && (
                    <NavLink
                      className={"uppercase shadow-lg"}
                      to={`/dashboard/student`}
                    >
                      Dashboard
                    </NavLink>
                  )}
                  {role === "teacher" && (
                    <NavLink
                      className={"uppercase shadow-lg"}
                      to={`/dashboard/teacher`}
                    >
                      Dashboard
                    </NavLink>
                  )}
                  {role === "admin" && (
                    <NavLink
                      className={"uppercase shadow-lg"}
                      to={`/dashboard/admin`}
                    >
                      Dashboard
                    </NavLink>
                  )}
                </li>
                <li>
                  <button
                    className=" shadow-lg"
                    onClick={() => {
                      logOut().then(() => {
                        toast.success("Logout success");
                        navigate("/");
                      });
                    }}
                  >
                    LOGOUT
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DownNav;
