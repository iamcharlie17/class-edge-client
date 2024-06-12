import { Helmet } from "react-helmet-async";
import useAuth from "../../../../Hooks/useAuth";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import { axiosCommon } from "../../../../Hooks/useAxiosCommon";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Loading from "../../../../components/Loading/Loading";

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

  if (loading || isLoading) return <Loading/>

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
              className="h-64 md:h-80 lg:h-72 bg-cover"
              style={{
                backgroundImage: `url(${c.image})`,
              }}
            ></div>
            <div className=" p-4 bg-slate-100">
              <div>
                <h1 className="text-xl font-bold">{c.title}</h1>
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
                  <h2 className="text-yellow-500 font-semibold">
                    <span className="text-black">Status: </span>
                    {c.status}
                  </h2>
                </div>
              </div>
              <div className="flex flex-wrap justify-between items-center my-2">
                <div className="flex gap-4">
                  <button className="px-4 py-2 bg-[#49c3af] text-white rounded-sm">
                   Update
                  </button>
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="py-2 px-4 bg-red-500 text-white rounded-sm"
                  >
                    Delete
                  </button>
                </div>
                <button disabled={c.status !== 'approved'} className="py-2 px-4 bg-white border border-[#49c3af] rounded-sm">
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
