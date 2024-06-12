import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import { FaCheck } from "react-icons/fa6";
import Loading from "../../../../components/Loading/Loading";
import toast from "react-hot-toast";

const TeacherRequest = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: teachers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["requested-teachers"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/teachers");
      return data;
    },
  });

  //   const { mutateAsync } = useMutation({
  //     mutationFn: async (data, email) => {
  //       const res = axiosSecure.put(`/update-teacher/${email}`, data);
  //       return res.data;
  //     },
  //     onSuccess: () => {
  //       toast.success("Update Success!");
  //       refetch();
  //     },
  //   });

  const handleAccepted = async (email) => {
    // console.log(email);
    try {
      const res = await axiosSecure.put(`/accept-teacher/${email}`, {
        status: "accepted",
      });
      if (res.data.modifiedCount > 0) {
        toast.success("Update Success");
        refetch();
      }
    } catch (error) {
      toast.error(`${error.message}`);
      refetch();
    }
  };

  const handleRejected = async (email) => {
    // console.log(email);
    try {
      //   await mutateAsync({ status: "rejected" }, email);
      const res = await axiosSecure.put(`/reject-teacher/${email}`, {
        status: "rejected",
      });
      if (res.data.modifiedCount > 0) {
        toast.success("Update Success");
        refetch();
      }
    } catch (error) {
      toast.error(`${error.message}`);
      refetch();
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <Helmet>
        <title>ClassEdge | Teachers Request</title>
      </Helmet>
      <SectionTitle
        heading={"All Teacher Request"}
        subHeading={"------------------------------------------"}
      />
      <div className="overflow-x-auto bg-white p-8 shadow-lg">
        <table className="table">
          {/* head */}
          <thead className="bg-[#4AC2AE] text-white uppercase shadow-lg">
            <tr>
              <th>name</th>
              <th>image</th>
              <th>experience</th>
              <th>title</th>
              <th>category</th>
              <th>status</th>
              <th>approve</th>
              <th>reject</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {teachers.map((user) => (
              <tr key={user?._id}>
                <td>
                  <h1>{user?.name}</h1>
                </td>
                <td>
                  <img
                    src={user?.image}
                    className=" h-16 w-16 object-cover object-center"
                    alt=""
                  />
                </td>
                <td>
                  <h1 className="uppercase">{user?.experience}</h1>
                </td>
                <td>{user?.title}</td>
                <td>
                  <h1 className="uppercase">{user?.category}</h1>
                </td>
                <td>
                  <h1
                    className={`${
                      user?.status === "pending" && "bg-yellow-500"
                    } ${user?.status === "rejected" && "bg-red-500"} ${
                      user?.status === "accepted" && "bg-green-500"
                    } text-white uppercase py-1 px-2`}
                  >
                    {user?.status}
                  </h1>
                </td>
                <td className="text-center">
                  <button
                    onClick={() => handleAccepted(user.email)}
                    disabled={user?.status !== "pending"}
                    className="bg-green-500 py-3 text-white px-2"
                  >
                    <FaCheck size={20} />
                  </button>
                </td>
                <td className="text-center text-xl text-white ">
                  <button
                    onClick={() => handleRejected(user.email)}
                    disabled={user?.status !== "pending"}
                    className="bg-red-500 py-2 px-3"
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherRequest;
