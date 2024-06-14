import { Helmet } from "react-helmet-async";
import useAuth from "../../../../Hooks/useAuth";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Loading from "../../../../components/Loading/Loading";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import PaginationComponent from "../../../../components/PaginationComponent/PaginationComponent";
import { useState } from "react";

const MyClass = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  //pagination---
  const [page, setPage] = useState(1);
  const itemPerPage = 10;

  const { data } = useQuery({
    queryKey: ["count"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`classes/${user?.email}`);
      return data;
    },
  });

  const count = data?.length;
  console.log(count)
  const numberOfPages = Math.ceil(count / itemPerPage);

  const handleChange = (event, value) => {
    setPage(value);
  };
  //pagination----

  const {
    data: classes = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-class", page],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/classes/${user?.email}?page=${page}&size=${itemPerPage}`);
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
          const { data } = await axiosSecure.delete(`/delete-class/${id}`);
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

  if (loading || isLoading) return <Loading />;

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
                  <Link to={`/dashboard/update-class/${c._id}`}>
                    <button className="px-4 py-2 bg-[#49c3af] text-white rounded-sm">
                      Update
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="py-2 px-4 bg-red-500 text-white rounded-sm"
                  >
                    Delete
                  </button>
                </div>
                <Link to={`/dashboard/my-class-details/${c._id}`}>
                  <button
                    disabled={c.status !== "approved"}
                    className={`py-2 px-4 bg-white border ${
                      c.status !== "approved" && "bg-gray-400"
                    } border-[#49c3af] rounded-sm`}
                  >
                    <small>See Details</small>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <PaginationComponent
        page={page}
        numberOfPages={numberOfPages}
        handleChange={handleChange}
      />
    </div>
  );
};

export default MyClass;
