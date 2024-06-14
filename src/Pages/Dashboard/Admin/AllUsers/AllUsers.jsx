import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../components/Loading/Loading";
import useAuth from "../../../../Hooks/useAuth";
import { useState } from "react";
import UpdateRoleModal from "../../../../components/Modal/UpdateRoleModal";

import { Pagination, PaginationItem, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { axiosCommon } from "../../../../Hooks/useAxiosCommon";

const AllUsers = () => {
  const { user } = useAuth();

  let [isOpen, setIsOpen] = useState(false);
  const [updateUser, setUpdateUser] = useState(null);

  // pagination---------------------------
  const [page, setPage] = useState(1);
  const itemPerPage = 10;

  const { data: counts = [] } = useQuery({
    queryKey: ["count"],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/all-users-count`);
      return data;
    },
  });

  const count = counts?.count;
  // console.log(count)
  const numberOfPages = Math.ceil(count / itemPerPage);

  const handleChange = (event, value) => {
    setPage(value);
  };
  // pagination--------------------------

  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-users", page],
    queryFn: async () => {
      const { data } = await axiosCommon.get(
        `/all-users?page=${page}&size=${itemPerPage}`
      );
      return data;
    },
  });

  const usersWithoutAdmin = data.filter((d) => d.email !== user?.email);

  const handleModal = (user) => {
    setIsOpen(true);
    setUpdateUser(user);
  };

  refetch()

  if (isLoading) return <Loading />;
  return (
    <div>
      <Helmet>
        <title>ClassEdge | All Users</title>
      </Helmet>
      <SectionTitle heading={"All Users"} subHeading={"------------------"} />

      {/* modal here */}
      <UpdateRoleModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        user={updateUser}
        refetch={refetch}
      />

      <div className="overflow-x-auto bg-white p-8 shadow-lg">
        <table className="table">
          {/* head */}
          <thead className="bg-[#4AC2AE] text-white uppercase shadow-lg">
            <tr>
              <th>#</th>
              <th>name</th>
              <th>email</th>
              <th>role</th>
              <th>Update Role</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {usersWithoutAdmin.map((user, idx) => (
              <tr key={user._id}>
                <th>{idx + 1}</th>
                <td>
                  <h1>{user.name}</h1>
                </td>
                <td>
                  <h1>{user.email}</h1>
                </td>
                <td>{user.role}</td>
                <th>
                  <button
                    onClick={() => handleModal(user)}
                    className="px-4 py-2 bg-[#4BC1AD] text-white rounded-sm"
                  >
                    Update Role
                  </button>
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

export default AllUsers;
