import { Helmet } from "react-helmet-async";
import useAuth from "../../../../Hooks/useAuth";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import { axiosCommon } from "../../../../Hooks/useAxiosCommon";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const MyClass = () => {
  const { user, loading } = useAuth();

  const {
    data: classes = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-class"],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/classes/${user?.email}`);
      return data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axiosCommon.delete(`/delete-class/${id}`);
          if (data.deletedCount > 0) {
            toast.success("Class deleted successfully");
            refetch();
          }
        } catch (error) {
          toast.error(`${error.message}`);
        }
      }
    });
  };

  refetch();

  if (loading || isLoading) return <h1 className="text-black">Loading</h1>;

  return (
    <div>
      <Helmet>
        <title>ClassEdge | My Class</title>
      </Helmet>
      <SectionTitle
        heading={"My Classes"}
        subHeading={"-----------------------"}
      />
      <div className="grid lg:grid-cols-2 gap-4">
        {classes.map((c) => (
          <div key={c._id}>
            <div
              className="h-64 bg-cover"
              style={{
                backgroundImage: `url(${c.image})`,
              }}
            ></div>
            <div className="flex justify-between p-2 bg-slate-100">
              <div>
                <h1 className="text-xl">{c.title}</h1>
                <div>
                  <h2>
                    <span className="font-semibold">Name:</span> {c.name}
                  </h2>
                  <h2>
                    <span className="font-semibold">Email:</span> {c.email}
                  </h2>
                  <h1 className="font-bold">
                    <span className="font-semibold">Price:</span> ${c.price}
                  </h1>
                  <hr />
                  <p className="pr-12">
                    <small>{c.description.slice(0, 60)}......</small>
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 items-center w-1/3">
                <h2 className="text-yellow-500 font-semibold">{c.status}</h2>
                <button className="p-2 bg-[#49c3af] text-white rounded-sm">
                  <FaEdit size={25} />
                </button>
                <button
                  onClick={() => handleDelete(c._id)}
                  className="p-2 bg-red-500 text-white rounded-sm"
                >
                  <MdDelete size={25} />
                </button>
                <button className="py-2 px-4 bg-white border border-[#49c3af] rounded-sm">
                  <small>See Details</small>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyClass;
