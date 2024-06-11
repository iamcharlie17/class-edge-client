import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../../components/Loading/Loading";
import UpdateStatusModal from "../../../../components/Modal/UpdateStatusModal";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const AllClasses = () => {
  const axiosSecure = useAxiosSecure();
  let [isOpen, setIsOpen] = useState(false);
  const [updateClas, setUpdateClas] = useState("");

  const {
    data: classes = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-classes"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/all-classes");
      return data;
    },
  });

  const handleModal = (clas) => {
    setUpdateClas(clas);
    setIsOpen(true);
  };

  //   console.log(data);
  if (isLoading) return <Loading />;
  return (
    <div>
        <Helmet><title>ClassEdge | All Classes</title></Helmet>
      <SectionTitle
        heading={"All classes"}
        subHeading={"----------------------"}
      />
      <div>
        <h1 className="lg:text-3xl md:text-xl p-8 font-semibold uppercase">
          total users: {classes?.length}
        </h1>
      </div>

      {/* modal is here */}
      <UpdateStatusModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        clas={updateClas}
        refetch={refetch}
      />

      <div className="overflow-x-auto bg-white p-8 shadow-lg">
        <table className="table">
          {/* head */}
          <thead className="bg-[#4AC2AE] text-white uppercase shadow-lg">
            <tr>
              <th>#</th>
              <th>image</th>
              <th>Title</th>
              <th>email</th>
              <th>Action</th>
              <th>See Progress</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {classes.map((c, idx) => (
              <tr key={c._id}>
                <th>{idx + 1}</th>
                <td>
                  <img
                    src={c.image}
                    className="w-16 h-16 object-cover"
                    alt=""
                  />
                </td>
                <td>
                  <h1>{c.title}</h1>
                </td>
                <td>{c.email}</td>
                <th>
                  <button
                    disabled={c.status !== "pending"}
                    onClick={() => handleModal(c)}
                    className={`px-2 py-1 ${
                      c.status === "pending" && "bg-yellow-500"
                    } ${c.status === "approved" && "bg-green-500"} ${
                      c.status === "rejected" && "bg-red-500"
                    } text-white rounded-sm`}
                  >
                    {c.status}
                  </button>
                </th>
                <th>
                  <button className="px-2 py-1 bg-[#4BC1AD] text-white rounded-sm">
                    <small>See Progress</small>
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllClasses;
