import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { uploadImage } from "../../utils/uploadImage";
import toast from "react-hot-toast";
import useRole from "../../Hooks/useRole";
import { useNavigate } from "react-router-dom";

const UpdateProfileModal = ({ isOpen, setIsOpen, user }) => {
  const { updateUser, loading, setLoading } = useAuth();
  const [role] = useRole();
  const navigate = useNavigate();

  //   console.log(user)

  const { register, handleSubmit, setValue } = useForm();

  const imgbb = async (image) => {
    setLoading(true);
    const result = await uploadImage(image);
    return result;
  };

  useEffect(() => {
    setValue("name", user?.displayName);
    setValue("phoneNumber", user?.phoneNumber);
  }, [setValue, user?.displayName, user?.phoneNumber]);

  const onSubmit = async (data) => {
    // console.log(data);
    if (data.photo.length > 0) {
      const image = await imgbb(data.photo[0]);

      updateUser(data.name, image, data.phoneNumber)
        .then(() => {
          toast.success("Profile updated successfully");
          setLoading(false);
        })
        .catch((err) => {
          toast.error(`${err.message}`);
          setLoading(false);
        });
    } else {
      updateUser(data.name, user?.photoURL, data.phoneNumber)
        .then(() => {
          toast.success("Profile updated successfully");
          setLoading(false);
          navigate(`/dashboard/${role}`);
        })
        .catch((err) => {
          toast.error(`${err.message}`);
          setLoading(false);
        });
    }
  };
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50 "
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg bg-gray-200 space-y-4 border  p-12">
          <DialogTitle className="font-bold text-center text-xl border-b border-black py-2">
            Update Profile
          </DialogTitle>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 mx-2 md:mx-8"
          >
            <div>
              <label htmlFor="name">Name</label>
              <br />
              <input
                className="w-full px-4 py-2 rounded-l"
                type="text"
                name="name"
                placeholder="Enter your name"
                {...register("name")}
              />
            </div>
            <div>
              <label htmlFor="name">Photo</label>
              <br />
              <input
                className="w-full px-4 py-2 rounded-l"
                type="file"
                name="photo"
                id="photo"
                {...register("photo")}
              />
            </div>
            <div>
              <label htmlFor="phoneNumber">Phone Number</label>
              <br />
              <input
                className="w-full px-4 py-2 rounded-l"
                type="text"
                name="phoneNumber"
                placeholder="Enter your phone number"
                {...register("phoneNumber")}
              />
            </div>
            <div className="flex justify-center">
              <button className="bg-[#4AC2AE] text-white w-1/2 text-center py-2 uppercase">
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
          <div className="flex justify-end ">
            <button
              className="bg-[#FE6F58] text-white py-2 px-4"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default UpdateProfileModal;
