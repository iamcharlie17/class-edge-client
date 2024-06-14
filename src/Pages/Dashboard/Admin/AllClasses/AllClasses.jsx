import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import Loading from "../../../../components/Loading/Loading";
import UpdateStatusModal from "../../../../components/Modal/UpdateStatusModal";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import { Pagination, PaginationItem, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const AllClasses = () => {
  let [isOpen, setIsOpen] = useState(false);
  const [updateClas, setUpdateClas] = useState("");
  const axiosSecure = useAxiosSecure()

   // pagination---------------------------
   const [page, setPage] = useState(1);
   const itemPerPage = 10;
 
   const { data: counts = [] } = useQuery({
     queryKey: ["count"],
     queryFn: async () => {
       const { data } = await axiosSecure.get(`/all-classes-count`);
       return data;
     },
   });
 
   const count = counts?.count;
   const numberOfPages = Math.ceil(count / itemPerPage);
 
   const handleChange = (event, value) => {
     setPage(value);
   };
   // pagination--------------------------

  const {
    data: classes = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-classes", page],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/all-classes?page=${page}&size=${itemPerPage}`);
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
      <Helmet>
        <title>ClassEdge | All Classes</title>
      </Helmet>
      <SectionTitle
        heading={"All classes"}
        subHeading={"----------------------"}
      />

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
                  <Link to={`/dashboard/class/${c._id}`}>
                    <button
                      disabled={c.status !== "approved"}
                      className={`px-2 py-1 ${
                        c.status !== "approved"
                          ? "bg-[#374d49]"
                          : "bg-[#4BC1AD]"
                      } text-white rounded-sm`}
                    >
                      <small>See Progress</small>
                    </button>
                  </Link>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
         {/* paginaation here */}
         <Stack spacing={2}>
          <Typography>Page: {page}</Typography>
          <Pagination
            count={numberOfPages}
            page={page}
            onChange={handleChange}
            renderItem={(item) => (
              <PaginationItem
                slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                {...item}
              />
            )}
          />
        </Stack>

        {/* pagination */}
      </div>
    </div>
  );
};

export default AllClasses;
