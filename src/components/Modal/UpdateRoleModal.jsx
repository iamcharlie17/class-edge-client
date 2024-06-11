import {
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const UpdateRoleModal = ({ isOpen, setIsOpen, user, refetch }) => {

    const axiosSecure = useAxiosSecure()

    const {mutateAsync} = useMutation({
        mutationFn: async(data) => {
            const {res} = await axiosSecure.put(`/update-user-role/${user?._id}`, data)
            return res;
        },
        onSuccess: () =>{
            toast.success('Role Update Success')
            refetch()
        }
    })

    const handleUpdateRole = async(e)=>{
        e.preventDefault()
        const role = e.target.role.value;
        await mutateAsync({role})
        setIsOpen(false)
    }

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="w-80 space-y-4  bg-slate-100 pt-12 rounded-sm">
          <DialogTitle className="font-bold text-2xl text-center">
            Update Role
          </DialogTitle>
          <form onSubmit={handleUpdateRole} className="p-12">
            <select name="role" className="w-full rounded-lg p-2">
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
            <div className="text-center my-8">
              <button className="bg-[#4AC2AE] text-white w-1/2 text-center py-2 uppercase">Update</button>
            </div>
          </form>
          <div className="flex justify-end">
            <button className="px-4 mt-8 py-2 m-2 bg-red-500 text-white rounded-full" onClick={() => setIsOpen(false)}>x</button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default UpdateRoleModal;
