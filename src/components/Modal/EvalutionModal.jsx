import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { TbLoaderQuarter } from "react-icons/tb";

const EvalutionModal = ({ isOpen, setIsOpen, id, isLoading }) => {
  const [value, setValue] = React.useState(2);
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { data: singleClass = {}, isPending } = useQuery({
    queryKey: ["singleClass"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/class/${id}`);
      return data;
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const feedback = {
      classId: id,
      title: singleClass?.title,
      name: user?.displayName,
      image: user?.photoURL,
      feedback: e.target.description.value,
      ratings: value,
    };
    try {
      const { data } = await axiosSecure.post("/feedback", feedback);
      if (data.insertedId) {
        toast.success("Thanks for you feedback");
        e.target.reset();
        navigate("/dashboard/my-enroll-class");
      }
    } catch (error) {
      toast.error(`${error.message}`);
    }
  };

  // if (isLoading) return <Loading />;
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50 "
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg space-y-4 border bg-[#49C3AF] rounded-sm text-white p-12">
          <DialogTitle className="font-semibold text-xl text-center">
            <span className="text-3xl">Evalution for -</span> <br />
            <span className={`${isPending ? "animate-spin" : ""}`}>
              {isLoading || isPending ? (
                <div className="flex justify-center">
                  <TbLoaderQuarter />
                </div>
              ) : (
                `${singleClass?.name}`
              )}
            </span>
          </DialogTitle>

          <form onSubmit={handleSubmit} className="space-y-2">
            <label htmlFor="description">Description</label>
            <br />
            <textarea
              required
              name="description"
              placeholder="Write your feedback "
              className="w-full px-4 py-2 text-gray-400"
              id=""
              cols="30"
              rows="5"
            ></textarea>
            <Box
              sx={{
                "& > legend": { mt: 2 },
              }}
            >
              <Typography component="legend">Ratings</Typography>
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </Box>
            <div>
              <button className="w-full text-center bg-black text-white font-semibold py-2 rounded-sm">
                Submit
              </button>
            </div>
          </form>

          <div className="flex gap-4">
            <button onClick={() => setIsOpen(false)}>Cancel</button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default EvalutionModal;
