import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import UpdateProfileModal from "../Modal/UpdateProfileModal";
import useRole from "../../Hooks/useRole";

const Profile = ({ user, role, logOut }) => {
  const [,,,phoneNumber] = useRole()
  // console.log(phoneNumber)
  let [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate();


  const handleLogout = async () => {
    await logOut().then(() => {
      toast.success("Logout Success");
      navigate("/");
    });
  };

  return (
    <div>
      <div className="md:w-1/2 p-6 mx-auto rounded-md shadow-md bg-gray-600 mt-16 text-gray-50">
        <img
          src={user?.photoURL}
          alt=""
          className="object-cover object-center w-full rounded-md h-72 bg-gray-500"
        />
        <div className="mt-6 mb-2">
          <span className="block text-xs font-medium tracking-widest uppercase text-[#49c3af]">
            {role}
          </span>
          <h2 className="text-xl font-semibold tracking-wide">
            Name: {user?.displayName}
          </h2>
        </div>
        <p className="text-gray-100">Email: {user?.email}</p>
        <p className="text-gray-100">Phone Number: {phoneNumber}</p>
        <div className="flex gap-4 py-4">
          <button
            onClick={() => setIsOpen(true)}
            className="uppercase py-2 rounded-sm w-1/2 bg-[#49c3af]"
          >
            Update Profile
          </button>
          <button
            onClick={handleLogout}
            className="uppercase py-2 rounded-sm w-1/2 bg-[#FE6F58]"
          >
            Logout
          </button>
        </div>
        <UpdateProfileModal isOpen={isOpen} setIsOpen={setIsOpen} phoneNumber={phoneNumber} user={user}/>
      </div>
    </div>
  );
};

export default Profile;
