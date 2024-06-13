import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import Loading from "../../../../components/Loading/Loading";
import { Helmet } from "react-helmet-async";

const MyClassDetails = () => {
  const axiosSecure = useAxiosSecure();
  const id = useParams();
  const classId = id.id;
  //   console.log(classId);

  const {
    data: singleClass = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["class"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/class/${classId}`);
      return res.data;
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.post("/create-assignment", data);
      return res.data;
    },
    onSuccess: () => {
      refetch();
      Swal.fire({
        icon: "success",
        text: "Assignment created successfully",
      });
    },
  });

  const handleCreateAssignment = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const deadline = form.deadline.value;
    const description = form.description.value;

    const assignmentInfo = {
      title,
      classId,
      submissions: 0,
      deadline,
      description,
    };
    try {
      await mutateAsync(assignmentInfo);
      form.reset();
    } catch (error) {
      toast.error(`${error.message}`);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <Helmet>
        <title>ClassEdge | Dashboard | Class Details</title>
      </Helmet>
      <div className="md:flex gap-8 justify-between">
        <div className="flex-1">
          <div className="stats stats-vertical  w-full text-center h-[90vh] shadow">
            <div className="stat text-center items-center">
              <div className="stat-value">{singleClass.enroll}</div>
              <div className="stat-desc">Total Enrollments</div>
            </div>

            <div className="stat items-center">
              <div className="stat-value">{singleClass.assignments}</div>
              <div className="stat-desc">Total Assignments</div>
            </div>

            <div className="stat items-center">
              <div className="stat-value">{singleClass.submissions}</div>
              <div className="stat-desc">Total Submissions</div>
            </div>
          </div>
        </div>
        <div className="flex-1 border-l border-gray-400">
          <div className="flex-1 w-full ">
            <h1 className="text-4xl text-center font-semibold my-8">
              Create Assignment
            </h1>
            <form
              onSubmit={handleCreateAssignment}
              className="space-y-4 mx-2 md:mx-8"
            >
              <div>
                <label htmlFor="title">Title</label>
                <br />
                <input
                  className="w-full px-4 py-2 rounded-l"
                  type="text"
                  name="title"
                  placeholder="Enter assignment title"
                />
              </div>
              <div className="relative">
                <label htmlFor="deadline">Deadline</label>
                <br />
                <input
                  className="w-full px-4 py-2 rounded-l"
                  type="date"
                  placeholder="Enter deadline"
                  name="deadline"
                />
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  id=""
                  placeholder="Enter Description"
                  className="w-full py-2 px-4"
                  cols="30"
                  rows="10"
                ></textarea>
              </div>

              <div>
                <button className="w-full bg-[#dbb984] py-2 text-white my-4 font-semibold rounded-l">
                  Create Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyClassDetails;
