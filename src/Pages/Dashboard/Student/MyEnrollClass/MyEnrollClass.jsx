import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import Loading from "../../../../components/Loading/Loading";
import EnrollClassCard from "./EnrollClassCard";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import PaginationComponent from "../../../../components/PaginationComponent/PaginationComponent";
import { useState } from "react";

const MyEnrollClass = () => {
  const { user, loading } = useAuth();

  const axiosSecure = useAxiosSecure();

  //pagination-----
  const [page, setPage] = useState(1);
  const itemPerPage = 10;

  const { data } = useQuery({
    queryKey: ["count"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/payments/${user?.email}`);
      return data;
    },
  });

  const count = data?.length;
  const numberOfPages = Math.ceil(count / itemPerPage);

  const handleChange = (event, value) => {
    setPage(value);
  };
  //pagination------

  const { data: classes = [], isLoading } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/payments/${user?.email}?page=${page}&size=${itemPerPage}`);
      return data;
    },
  });

  //   console.log(classes);
  // console.log(count)

  if (loading || isLoading) return <Loading />;

  return (
    <div className="my-8 mx-2  w-full">
      <div className="grid md:grid-cols-2 gap-4 my-8">
        {classes.map((clas) => (
          <EnrollClassCard key={clas._id} clas={clas} />
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

export default MyEnrollClass;
